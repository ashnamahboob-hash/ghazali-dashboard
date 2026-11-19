// Remove the Arabic UI/content branch, retaining Arabic botanical names.
const fs=require('fs'),acorn=require('acorn'),walk=require('acorn-walk');
function rewrite(source){
 const ast=acorn.parse(source,{ecmaVersion:'latest',sourceType:'module'}),edits=[];
 walk.ancestor(ast,{Property(n,anc){
  if((n.key.name||n.key.value)!=='ar')return;
  const path=anc.filter(x=>x.type==='VariableDeclarator'||x.type==='Property').map(x=>x.type==='VariableDeclarator'?x.id.name:(x.key.name||x.key.value));
  const parent=path.at(-2),root=path[0];
  if(['name','names','nm'].includes(parent)||['LST','LST45'].includes(root))return;
  if(['reviewedNameLabels','NMLBL'].includes(root)&&path.length===3&&path[1]!=='ar')return;
  if(root==='LN')return; // language labels are also used for botanical name inputs
  const object=anc.at(-2),props=object.properties,index=props.indexOf(n);
  let start=n.start,end=n.end;
  if(index<props.length-1)end=props[index+1].start;
  else if(index>0)start=props[index-1].end;
  edits.push([start,end]);
 }});
 // Nested Arabic maps are covered by the enclosing removal.
 const spans=edits.sort((a,b)=>a[0]-b[0]||b[1]-a[1]).filter((x,i,a)=>!a.slice(0,i).some(y=>y[0]<=x[0]&&y[1]>=x[1]));
 for(const [start,end]of spans.reverse())source=source.slice(0,start)+source.slice(end);
 acorn.parse(source,{ecmaVersion:'latest',sourceType:'module'});return source;
}
for(const path of ['index.html','app/app.html']){
 let html=fs.readFileSync(path,'utf8');html=html.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi,(m,a,b,c)=>a+(b.trim()?rewrite(b):b)+c);fs.writeFileSync(path,html);
}
fs.writeFileSync('app/accounts.js',rewrite(fs.readFileSync('app/accounts.js','utf8')));

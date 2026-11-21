// Tests afImportFile (dashboard): runs the real function from index.html with mocked Firebase/DOM.
const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const m=html.match(/async function afImportFile\(file\)\{[\s\S]*?\n catch\(e\)\{alert\('واردول ونه سول: '\+\(e\.code\|\|e\.message\)\)\}\}/);
assert(m,'afImportFile not found');
const normSrc=html.match(/const norm=.*\n/)[0];
const AFFsrc=html.match(/const AFF=\[[\s\S]*?\];\n/)[0];
const plants=JSON.parse(fs.readFileSync(__dirname+'/app/ghazali_all_100_plants_final.json','utf8'));
function run(fileText,existing,confirmAns=true){
  const log={alerts:[],confirms:[],written:[],toast:null};
  const factory=new Function('file','AFP','log','confirmAns',
   normSrc+AFFsrc+`const AFC='afghan_plants';let db={};
    const alert=m=>log.alerts.push(m),confirm=m=>{log.confirms.push(m);return confirmAns};
    const writeBatch=()=>({set:(r,d)=>log.written.push([r,d]),commit:async()=>{}}),doc=(db,c,id)=>id,serverTimestamp=()=>'TS';
    const afLoad=async()=>{},afRenumber=async()=>{},toast=t=>log.toast=t,afList=()=>{};
    ${m[0]}
    return afImportFile(file);`);
  const file={size:fileText.length,text:async()=>fileText};
  return factory(file,existing,log,confirmAns).then(()=>log);
}
(async()=>{
  const have=plants.slice(0,80).map(p=>({id:'p'+String(p.id).padStart(3,'0'),scientific_name:p.scientific_name}));
  // 1) full 100-plant file: the first 80 already exist, so only 20 are written
  let l=await run(JSON.stringify(plants),have);
  assert.strictEqual(l.written.length,20,'writes only new plants');
  assert.deepStrictEqual(l.written.map(w=>w[0])[0],'p081');
  const d=l.written[0][1];
  assert.strictEqual(d.photoCount,0);assert.strictEqual(d.legacyId,81);assert(Array.isArray(d.source_links)&&d.source_links.length>0);
  assert(!('id' in d),'id not stored in doc');
  // 2) nothing new
  l=await run(JSON.stringify(plants.slice(0,5)),have);
  assert.strictEqual(l.written.length,0);assert(/نوی بوټی نشته/.test(l.alerts[0]));
  // 3) bad json / empty
  l=await run('{not json',have);assert(/JSON/.test(l.alerts[0]));assert.strictEqual(l.written.length,0);
  l=await run('[]',have);assert.strictEqual(l.written.length,0);
  // 4) no id -> auto id; same scientific name as existing -> skipped; missing name -> bad; unknown fields dropped; bad links dropped
  const x=[{name_ps:'ازمېښت',scientific_name:'Test planta',source_links:['https://a.b','javascript:alert(1)'],hack:'x',photoCount:99},
           {name_ps:'تکرار',scientific_name:plants[0].scientific_name},{name_en:'no ps name'},{name_ps:'دوهم',scientific_name:'test PLANTA'}];
  l=await run(JSON.stringify(x),have);
  assert.strictEqual(l.written.length,1,'one add');
  const w=l.written[0][1];assert(/^p/.test(l.written[0][0]));assert.deepStrictEqual(w.source_links,['https://a.b']);
  assert(!('hack' in w));assert.strictEqual(w.photoCount,0);
  assert(/پرېښودل سوي \(2\)/.test(l.confirms[0]),'2 skipped (existing sci + same sci in file)');assert(/ناسم/.test(l.confirms[0]));
  // 5) user cancels -> nothing written
  l=await run(JSON.stringify(plants),have,false);assert.strictEqual(l.written.length,0);
  // 6) object with plants key (five plants after the first 80 existing records)
  l=await run(JSON.stringify({plants:plants.slice(78,85)}),have);assert.strictEqual(l.written.length,5);
  console.log('test-import-file: all passed');
})().catch(e=>{console.error('FAIL',e.message);process.exit(1)});

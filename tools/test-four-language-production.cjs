const fs=require('fs'),assert=require('node:assert/strict'),cp=require('child_process');
const {JSDOM,VirtualConsole}=require('jsdom');
const acorn=require('acorn'),walk=require('acorn-walk');
function names(html){const out=[];for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)){if(!m[1].trim())continue;walk.ancestor(acorn.parse(m[1],{ecmaVersion:'latest',sourceType:'module'}),{Property(n,anc){if((n.key.name||n.key.value)!=='ar')return;const path=anc.filter(x=>x.type==='Property'||x.type==='VariableDeclarator').map(x=>x.type==='VariableDeclarator'?x.id.name:(x.key.name||x.key.value));if(['name','names','nm'].includes(path.at(-2))||['LST','LST45'].includes(path[0]))out.push([path.join('.'),m[1].slice(n.value.start,n.value.end)]);}})}return out;}
for(const f of ['index.html','app/index.html'])assert.deepEqual(names(fs.readFileSync(f,'utf8')),names(cp.execFileSync('git',['show','HEAD:'+f],{encoding:'utf8',maxBuffer:20e6})),f+' Arabic names preserved');
const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const html=fs.readFileSync('app/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://unit-test.invalid/',virtualConsole:vc,beforeParse(w){w.localStorage.setItem('gk_lang','ar');w.scrollTo=()=>{};w.alert=()=>{};w.fetch=()=>Promise.reject(new Error('offline test'));}});
const w=dom.window;
assert.equal(w.eval('lang'),'ps');
assert.deepEqual(Array.from(w.eval('Object.keys(L)')),['ps','fa','ur','en']);
for(const l of ['ps','fa','ur','en']){
 w.eval(`setLang('${l}');go('set')`);
 assert.deepEqual([...w.document.querySelectorAll('[onclick^="setLang"]')].map(x=>x.textContent),['پښتو','فارسی','اردو','English']);
 w.eval('H.filter(isReal).forEach(stagePlantDetails)');
 assert.equal(w.document.documentElement.dir,l==='en'?'ltr':'rtl');
}
w.eval("setLang('ar')");assert.equal(w.eval('lang'),'ps');
assert(!w.eval("Object.values(wordDetailLayout.records).some(x=>Object.hasOwn(x.fields,'ar'))"));
const fatal=errors.filter(x=>!x.includes('HTMLCanvasElement')&&!x.includes('navigation'));
assert.deepEqual(fatal,[]);
w.close();console.log('Passed four-language order, all bundled detail rendering, LTR/RTL, legacy Arabic preference fallback, Arabic body removal, and exact Arabic-name preservation.');

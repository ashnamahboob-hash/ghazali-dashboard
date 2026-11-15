const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
(async()=>{
 const U=await import('./app/account-utils.mjs');
 const H=[{taj:['T001']},{taj:['T002']}];
 assert.deepEqual(U.decodeHerbs(['T002','T002','missing'],H),[1]);
 assert.deepEqual(U.encodeHerbs([1,0,1,99],H),['T002','T001']);
 assert.notEqual(U.accountKey('gk_fav','alice'),U.accountKey('gk_fav','bob'));
 assert.equal(U.authError('auth/invalid-credential'),'credentials');
 let listener,pending=[],writes=[];
 const auth={currentUser:null},data=new Map([['gk_fav','[0]'],['gk_fav:user:alice','[1]']]);
 const context={...U,console,Set,Promise,H,fav:[0],recentHerbs:[],lang:'en',render(){},toast(){},
 localStorage:{getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)},
 A:{getAuth:()=>auth,onAuthStateChanged:(a,cb)=>listener=cb},
 doc:(db,...p)=>p.join('/'),getDoc:path=>new Promise(resolve=>pending.push({path,resolve})),
 setDoc:async(path,value)=>writes.push({path,value}),serverTimestamp:()=>123};
 context.window={gkFirebase:{app:{},db:{}},receiveAccountState(){},addEventListener(){}};
 vm.createContext(context);
 const source=fs.readFileSync('app/accounts.js','utf8').replace(/^import .*;\n/gm,'');
 vm.runInContext(source,context);
 auth.currentUser={uid:'alice'};const alice=listener(auth.currentUser);
 assert.deepEqual(Array.from(context.fav),[1],'load only Alice local data');
 auth.currentUser={uid:'bob'};const bob=listener(auth.currentUser);
 assert.deepEqual(Array.from(context.fav),[],'do not leak Alice or guest favorites');
 pending[0].resolve({exists:()=>true,data:()=>({favorites:['T001'],recent:[]})});await alice;
 assert.deepEqual(Array.from(context.fav),[],'ignore stale Alice cloud response');
 context.fav=[1];context.window.gkSavePreferences();
 pending[1].resolve({exists:()=>true,data:()=>({favorites:['T001'],recent:[]})});await bob;
 await new Promise(r=>setImmediate(r));
 assert.deepEqual(Array.from(context.fav),[1],'keep edits made during initial cloud read');
 assert.equal(writes.length,1);assert.equal(writes[0].path,'users/bob/private/preferences');
 assert.deepEqual(Array.from(writes[0].value.favorites),['T002']);
 auth.currentUser=null;await listener(null);
 assert.deepEqual(Array.from(context.fav),[0],'restore guest data after sign-out');
 assert.equal(context.window.gkWebUser,null);
 const native={...context,window:{NativeAccount:{},gkFirebase:{app:{},db:{}},addEventListener(){}}};
 vm.createContext(native);vm.runInContext(source,native);
 assert.ok(native.window.WebAccount,'Android uses the same authenticated Firestore session');
 for(const file of ['index.html','app/index.html']){
  const html=fs.readFileSync(file,'utf8');
  for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
   if(/type="module"/.test(m[1]))continue;new vm.Script(m[2]);
  }
 }
 const html=fs.readFileSync('app/index.html','utf8');
 const upload=html.slice(html.indexOf('window.gkUpload=async'),html.indexOf('window.gkSendFb='));
 const uploads=[];
 const uc={window:{NativeAccount:{}},console:{warn(){}},lang:'en',toast(){},authText:()=>({sign_in_required:'login'}),db:{},serverTimestamp:()=>123,collection:(db,name)=>name,addDoc:async(c,d)=>uploads.push({c,d}),photoUrl:async()=>''};
 vm.createContext(uc);vm.runInContext(upload,uc);
 assert.equal(await uc.window.gkUpload({text:'test'},null),false,'native bridge alone never authorizes a write');
 uc.window.gkWebUser={uid:'alice',displayName:'Alice'};
 assert.equal(await uc.window.gkUpload({text:'test',name:'forged'},null),true);
 assert.equal(uploads[0].c,'suggestions');assert.equal(uploads[0].d.uid,'alice');assert.equal(uploads[0].d.name,'Alice');
 uc.photoUrl=async()=>{uc.window.gkWebUser={uid:'bob'};return ''};
 assert.equal(await uc.window.gkUpload({text:'test'},{}),false,'switching accounts during image processing cancels the write');
 assert.equal(uploads.length,1);
 console.log('Passed account isolation, stable herb IDs, sign-out, stale requests, edits during loading, shared Android/web session and HTML syntax.');
})().catch(e=>{console.error(e);process.exitCode=1});

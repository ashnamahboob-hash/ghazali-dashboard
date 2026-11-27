// One-shot migration. Dry run by default. Requires ADC for ghazali-herbs.
// Run only with all app/admin writers stopped and a verified full Firestore export.
// No partial writes: refuse if the entire change cannot fit in one atomic batch.
import {initializeApp,applicationDefault} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {writeFileSync} from 'node:fs';
const db=getFirestore(initializeApp({credential:applicationDefault(),projectId:'ghazali-herbs'}));
const mapping=new Map([['T142','A063'],['T143','M068']]);
for(let i=144;i<=588;i++)mapping.set('T'+String(i).padStart(3,'0'),'T'+String(i-2).padStart(3,'0'));
const target=c=>mapping.get(c)||c;
const all=await db.collection('herbs').get();
const byId=new Map(all.docs.map(d=>[d.id,d]));
const sources=[...mapping.keys()], destinations=[...new Set([...mapping.values(),'T587','T588'])];
if(byId.has('A063')||byId.has('M068'))throw Error('Destination exists; refusing repeat or collision');
for(const c of sources){const h=byId.get(c)?.data();if(!h||h.code!==c||h.status!=='index'||h.reserved)throw Error('Unexpected source '+c);}
const saved=[], ops=new Map();
const put=(ref,data)=>ops.set(ref.path,{ref,data});
const del=ref=>ops.set(ref.path,{ref,delete:true});
for(const c of [...new Set([...sources,...destinations])]){
 const ref=db.collection('herbs').doc(c);
 const children=await ref.listCollections();
 if(children.some(x=>!['images','history'].includes(x.id)))throw Error('Unknown subcollection '+c);
 const item={code:c,entry:byId.get(c)?.data()||null,children:[]};
 for(const col of children){for(const d of (await col.get()).docs){if((await d.ref.listCollections()).length)throw Error('Nested subcollections '+d.ref.path);item.children.push({collection:col.id,id:d.id,data:d.data()});del(d.ref);}}
 saved.push(item);
}
for(const x of saved){if(!mapping.has(x.code)){if(x.children.length)throw Error('Orphan target data '+x.code);continue;}
 const c=target(x.code),ref=db.collection('herbs').doc(c);
 put(ref,{...x.entry,code:c,type:c[0]});
 for(const ch of x.children){const data={...ch.data};if(data.code===x.code)data.code=c;if(data.data?.code===x.code)data.data={...data.data,code:c,type:c[0]};put(ref.collection(ch.collection).doc(ch.id),data);}
}
for(const c of ['T587','T588'])put(db.collection('herbs').doc(c),{code:c,type:'T',sourceBook:'taj',status:'index',reserved:true,order:9000+Number(c.slice(1)),names:{},fields:{ps:{},fa:{},ur:{},en:{}},pages:'',scientific:'',family:'',version:0});
const related=[];
for(const name of ['feedback','suggestions'])for(const d of (await db.collection(name).get()).docs){const x=d.data();if(mapping.has(x.herbId)){related.push({path:d.ref.path,data:x});put(d.ref,{...x,herbId:target(x.herbId)});}}
for(const d of (await db.collectionGroup('private').get()).docs){if(d.id!=='preferences')continue;const x=d.data();if([...(x.favorites||[]),...(x.recent||[])].some(c=>mapping.has(c))){related.push({path:d.ref.path,data:x});put(d.ref,{...x,favorites:(x.favorites||[]).map(target),recent:(x.recent||[]).map(target)});}}
const filename='taj-migration-private-backup-'+Date.now()+'.json';
writeFileSync(filename,JSON.stringify({saved,related,mapping:[...mapping]},null,1),{flag:'wx',mode:0o600});
console.log(JSON.stringify({sources:sources.length,destinations:destinations.length,related:related.length,operations:ops.size,backup:filename}));
if(!process.argv.includes('--apply')){console.log('DRY RUN: no writes');process.exit(0);}
if(process.env.TAJ_MAINTENANCE_CONFIRMED!=='yes')throw Error('Maintenance not confirmed');
if(ops.size>500)throw Error('Atomic batch limit exceeded; no writes. Requires separate maintenance migration plan.');
const batch=db.batch();for(const o of ops.values()){if(o.delete)batch.delete(o.ref);else batch.set(o.ref,o.data);}
await batch.commit();console.log('Atomic write committed. Verify every document before reopening clients.');

/* ===== Firebase: د ډیشبورډ ډاټا لوستل + نظرونه لېږل ===== */
const CFG={apiKey:"AIzaSyAhBekjZhte7rhP2Tbu7h4cEcIsCk5nigY",authDomain:"ghazali-herbs.firebaseapp.com",projectId:"ghazali-herbs"};
const LG=['ps','fa','ur','en'],CK='gk_herbs_cache_v1';
const norm=x=>String(x==null?'':x).replace(/\s+/g,'');
const flat=bl=>(bl||[]).map(b=>(b.subtitle?b.subtitle+': ':'')+(b.text||'')).join('\n');
const blocks=t=>String(t||'').split(/\n+/).map(x=>x.trim()).filter(Boolean).map(x=>({text:x,subtitle:'',source_ref:'dashboard'}));
const parseOther=(t,l)=>gkEntryNameRows(t,l);
const otherFlat=a=>(a||[]).map(x=>x[0]+': '+x[1]).join('\n');
function applyHerbs(list){
  const before=H.filter(isPublished).map(p=>p.taj&&p.taj[0]).join('|');
  H.forEach(p=>{p.publicationApproved=false;});
  let changed=false;
  const legacyKeys=wordDetailLayout.order;
  for(const h of list){
    const code=h&&h.code;if(!code||!publicEntryComplete(h))continue;
    const KEYS=/^MD\d{4,}$/.test(code)?[...new Set([...legacyKeys,...["mhy","origin","part","macro","micro","chem","pharmacology","clinical","use","dose","mzr","contraindications","interactions","safety","quality","storage","refs"]])]:legacyKeys;
    const nm=h.names;if(h.fields)delete h.fields.ar;
    let p=H.find(x=>x.taj&&x.taj[0]===code),rec=wordDetailLayout.records[code];
    if(!p){
      const row=[code,nm.ur||nm.ps||code,nm.en||'',String(h.pages||''),''];tajRecords.push(row);
      p={nm:{ps:nm.ps||'',fa:nm.fa||nm.ps||'',ur:nm.ur||nm.ps||'',en:nm.en||'',ar:nm.ar||''},s:h.scientific||'',c:'#2d5c4a',img:undefined,taj:row,imported:true};
      H.push(p);changed=true;
    }
    p.publicationApproved=true;
    if(p.taj)p.taj[3]=String(h.pages||"");
    if(rec)rec.pages=String(h.pages||"");
    if(nm.ar){p.nm.ar=nm.ar;if(rec)rec.name.ar=nm.ar;}
    if(typeof h.link==='string'&&p.link!==h.link){p.link=h.link;changed=true;}
    if(h.status==='index'||!h.fields)continue;
    if(!rec){
      rec={code,scientific:h.scientific||'',family:h.family||'',name:{},names:{},name_notes:{},fields:{},tables:{},identity_note:{},pages:String(h.pages||'')};
      for(const l of LG){
        rec.name[l]=nm[l]||nm.ps||'';
        rec.names[l]=parseOther(h.otherNames&&h.otherNames[l],l);
        rec.fields[l]={};for(const k of KEYS)rec.fields[l][k]=blocks(h.fields[l]&&h.fields[l][k]);
      }
      wordDetailLayout.records[code]=rec;
      for(const l of LG)if(rec.name[l])p.nm[l]=rec.name[l];
      p.s=rec.scientific||p.s;changed=true;continue;
    }
    /* موجود ریکارډ: یوازې هغه څه بدلوو چې ډیشبورډ کې بدل سوي */
    for(const l of LG){
      if(nm[l]&&nm[l]!==rec.name[l]){rec.name[l]=nm[l];p.nm[l]=nm[l];changed=true}
      const on=h.otherNames&&h.otherNames[l];
      if(typeof on==='string'&&norm(on)!==norm(otherFlat(rec.names[l]))){rec.names[l]=parseOther(on,l);changed=true}
      for(const k of KEYS){
        const nv=h.fields[l]&&h.fields[l][k];if(nv===undefined)continue;
        if(norm(nv)!==norm(flat(rec.fields[l][k]))){rec.fields[l][k]=blocks(nv);changed=true}
      }
    }
    if(typeof h.scientific==='string'&&h.scientific&&h.scientific!==rec.scientific){rec.scientific=h.scientific;p.s=h.scientific;changed=true}
    if(typeof h.family==='string'&&h.family!==rec.family&&h.family){rec.family=h.family;changed=true}
  }
  if(before!==H.filter(isPublished).map(p=>p.taj&&p.taj[0]).join('|'))changed=true;
  if(changed){try{pickFt();build();render()}catch(e){console.warn(e)}}
}
/* moved to data/lst45.js */
const is45=c=>c[0]==='T'&&+c.slice(1)<=45;
const okS=(c,o,s)=>{if(!s)return false;if(!is45(c))return true;o=(o||'').trim();if(c==='T016'||c==='T023')return false;if(s.split(/\s+/).length<2)return false;if(/\bspp\b/i.test(o))return false;if(o&&o.startsWith(s))return false;return true};
const okF=(c,f)=>!!f&&!(is45(c)&&/^Plant Family/i.test(f));
(function(){let ch=0;for(const [c,x] of Object.entries(LST45)){const p=H.find(y=>y.taj&&y.taj[0]===c),rec=wordDetailLayout.records[c],is45=c[0]==='T'&&+c.slice(1)<=45;
 for(const l of ['ps','fa','ur','en','ar']){if(!x[l])continue;if(p&&p.nm[l]!==x[l]){p.nm[l]=x[l];ch=1}if(rec&&rec.name&&rec.name[l]!==x[l]){rec.name[l]=x[l];ch=1}}
 const t=tajRecords.find(r=>r[0]===c);if(t){t[1]=x.ur;t[2]=x.en}
 const sOk=okS(c,p&&p.s,x.s),fOk=okF(c,x.f);if(p){if(sOk&&p.s!==x.s){p.s=x.s;ch=1}if(fOk)p.fam=x.f;if(x.l)p.link=x.l}if(rec){if(sOk)rec.scientific=x.s;if(fOk)rec.family=x.f}}
 if(ch){try{render()}catch(e){}}})();
(async()=>{
  try{const c=JSON.parse(localStorage.getItem(CK)||'null');if(c&&c.length)applyHerbs(c)}catch(e){}
  try{
    const [{initializeApp},{getFirestore,collection,query,where,getDocs,onSnapshot,addDoc,serverTimestamp}]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js')]);
    const firebaseApp=initializeApp(CFG);
    const db=getFirestore(firebaseApp);
    window.gkFirebase={app:firebaseApp,db};window.dispatchEvent(new Event("gk-firebase-ready"));
    const photoUrl=file=>new Promise(res=>{const u=URL.createObjectURL(file),i=new Image();i.onload=()=>{let m=1000,q=.7,out='';for(let k=0;k<5;k++){const r=Math.min(1,m/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*r);c.height=Math.round(i.height*r);c.getContext('2d').drawImage(i,0,0,c.width,c.height);out=c.toDataURL('image/jpeg',q);if(out.length<700000)break;m*=.8;q-=.08}URL.revokeObjectURL(u);res(out.length<900000?out:'')};i.onerror=()=>{URL.revokeObjectURL(u);res('')};i.src=u});
    window.gkUpload=async(x,file)=>{
      try{
        if(!window.gkWebUser&&!window.NativeAccount)throw new Error('sign_in_required');
        const d={herbId:String(x.id||'').slice(0,20),type:String(x.type||'').slice(0,40),text:String(x.text||'').slice(0,2000),name:String(x.name||'').slice(0,60),lang:String(lang||'').slice(0,5),ts:Number(x.ts)||Date.now(),status:'new',createdAt:serverTimestamp()};
        if(file){const ph=await photoUrl(file);if(ph)d.photo=ph}
        if(window.gkWebUser)d.uid=window.gkWebUser.uid;
        await addDoc(collection(db,window.gkWebUser?'suggestions':'feedback'),d);return true;
      }catch(e){console.warn('feedback',e);return false}
    };
    window.gkSendFb=x=>{if(x&&!x.sent)window.gkUpload(x,null)};
    const publishedQuery=query(collection(db,'herbs'),where('status','==','approved'));
    const snap=await getDocs(publishedQuery);
    const list=snap.docs.map(d=>({...d.data(),code:d.id}));
    applyHerbs(list);
    try{localStorage.setItem(CK,JSON.stringify(list));localStorage.setItem("gk_last_sync",new Date().toISOString())}catch(e){}
    onSnapshot(publishedQuery,snapshot=>{
      const current=snapshot.docs.map(d=>({...d.data(),code:d.id}));
      applyHerbs(current);
      try{localStorage.setItem(CK,JSON.stringify(current));localStorage.setItem("gk_last_sync",new Date().toISOString())}catch(e){}
    },error=>console.warn('published entries sync',error));
    try{
      let any=false;
      await Promise.all(list.filter(publicEntryComplete).map(async h=>{
        try{
          const s=await getDocs(collection(db,'herbs',h.code,'images'));
          const im=s.docs.map(d=>d.data()).filter(x=>x&&!x.hide&&typeof x.data==='string'&&/^data:image\//.test(x.data)).sort((x,y)=>(x.order||0)-(y.order||0));
          const SL={'بشپړ بوټی':'plant','پاڼه':'leaf','ګل':'flower','مېوه':'fruit','تخم':'used','ریښه':'used','وچ بوټي':'used','کارېدونکې برخه':'used'};
          const old=window.HERB_PHOTOS[h.code];
          const e=window.HERB_PHOTOS[h.code]={},seen={};
          if(old&&old.credit&&im.length)e.credit=old.credit;
          if(old||im.length)any=true;
          const p=H.find(x=>x.taj&&x.taj[0]===h.code);if(p&&!im.length)p.img='';
          const left=[];e.lic={};const ln=x=>x&&x.lic&&x.lic.name?(x.lic.author?x.lic.author+' — ':'')+x.lic.name:'';
          im.forEach(x=>{const k=SL[x.label];if(k&&!seen[k]){seen[k]=1;e[k]=x.data;e.lic[k]=ln(x)}else left.push(x)});
          ['plant','leaf','flower','fruit','used'].forEach(k=>{if(!e[k]&&left.length){const y=left.shift();e[k]=y.data;e.lic[k]=ln(y)}});
          e.licCredit=[...new Set(Object.values(e.lic).filter(Boolean))].join(' · ');
        }catch(e){}
      }));
      if(any){try{applyPhotos()}catch(e){}try{render()}catch(e){}}
    }catch(e){console.warn('images',e)}
  }catch(e){console.warn('Firebase',e)}
})();

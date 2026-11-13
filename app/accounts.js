// Web account adapter. Native Android keeps ownership of its existing auth bridge.
import * as A from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import {doc,getDoc,setDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import {accountKey,encodeHerbs,decodeHerbs,authError} from './account-utils.mjs';

let auth,db,user=null,generation=0,dirty=0,ready=false,queue=Promise.resolve();
const personal=new Set(['gk_fav','gk_recent','gk_feedback']);
const syncCopy={ps:'د حساب آنلاین ساتنه ونه سوه؛ معلومات په دې وسیله کي خوندي دي. بیا ننوتل یا د Firebase تنظیم وګورئ.',fa:'همگام‌سازی حساب انجام نشد؛ اطلاعات در این دستگاه محفوظ است.',ur:'اکاؤنٹ کی ہم آہنگی نہیں ہوئی؛ معلومات اس آلے پر محفوظ ہیں۔',en:'Account sync failed; your data is saved on this device. Check Firebase setup or sign in again.',ar:'تعذرت مزامنة الحساب؛ بياناتك محفوظة على هذا الجهاز.'};
window.gkStorageKey=k=>personal.has(k)?accountKey(k,user?.uid):k;
function localRead(k){try{return JSON.parse(localStorage.getItem(window.gkStorageKey(k))||'[]')}catch{return []}}
function localWrite(k,v){try{localStorage.setItem(window.gkStorageKey(k),JSON.stringify(v))}catch{}}
function state(message='',failed=false){const u=auth.currentUser;window.receiveAccountState(true,true,!!u,u?.email||'',failed,u?.displayName||'',!!u?.emailVerified,message)}
function syncError(){if(typeof toast==='function')toast(syncCopy[lang]||syncCopy.en)}
function snapshot(){return {favorites:encodeHerbs(fav,H),recent:encodeHerbs(recentHerbs,H).slice(0,3),updatedAt:serverTimestamp()}}
function save(){
 if(!user)return;
 dirty++;
 if(!ready)return;
 const uid=user.uid,epoch=generation,data=snapshot();
 queue=queue.catch(()=>{}).then(async()=>{
  if(epoch!==generation||auth.currentUser?.uid!==uid)return;
  try{await setDoc(doc(db,'users',uid,'private','preferences'),data)}catch{if(epoch===generation)syncError()}
 });
}
window.gkSavePreferences=save;
async function changed(u){
 const epoch=++generation;user=u;window.gkWebUser=u;ready=false;dirty=0;
 const valid=x=>Array.isArray(x)?x.filter((i,j)=>Number.isInteger(i)&&H[i]&&x.indexOf(i)===j):[];
 fav=valid(localRead('gk_fav'));recentHerbs=valid(localRead('gk_recent')).slice(0,3);
 state();render();
 if(!u)return;
 try{
  const result=await getDoc(doc(db,'users',u.uid,'private','preferences'));
  if(epoch!==generation)return;
  if(result.exists()&&!dirty){const data=result.data();fav=decodeHerbs(data.favorites,H);recentHerbs=decodeHerbs(data.recent,H).slice(0,3);localWrite('gk_fav',fav);localWrite('gk_recent',recentHerbs);render()}
  ready=true;if(dirty||!result.exists())save();
 }catch{if(epoch===generation){ready=true;syncError()}}
}
async function action(fn,success){try{await fn();state(success)}catch(e){state(authError(e.code),true)}}
function requireUser(){if(!auth.currentUser)throw {code:'auth/requires-recent-login'};return auth.currentUser}
function start(){
 if(auth||window.NativeAccount||!window.gkFirebase)return;
 db=window.gkFirebase.db;auth=A.getAuth(window.gkFirebase.app);
 window.WebAccount={
  emailPassword(signup,email,password,name){return action(async()=>{
   if(!signup){await A.signInWithEmailAndPassword(auth,email,password);return}
   const result=await A.createUserWithEmailAndPassword(auth,email,password);
   try{await A.updateProfile(result.user,{displayName:name})}catch{throw {code:'app/profile_incomplete'}}
   try{await A.sendEmailVerification(result.user)}catch{throw {code:'app/verification_failed'}}
  },signup?'verification_sent':'signed_in')},
  google(){return action(()=>A.signInWithPopup(auth,new A.GoogleAuthProvider()),'signed_in')},
  resetPassword(email){return action(async()=>{try{await A.sendPasswordResetEmail(auth,email)}catch(e){if(e.code!=='auth/user-not-found')throw e}},'reset_sent')},
  updateName(name){return action(()=>A.updateProfile(requireUser(),{displayName:name}),'profile_saved')},
  verifyEmail(){return action(()=>A.sendEmailVerification(requireUser()),'verification_sent')},
  refresh(){return action(()=>A.reload(requireUser()),'refreshed')},
  signOut(){return action(()=>A.signOut(auth),'signed_out')}
 };
 A.onAuthStateChanged(auth,changed,()=>state('failed',true));
}
window.addEventListener('gk-firebase-ready',start);start();

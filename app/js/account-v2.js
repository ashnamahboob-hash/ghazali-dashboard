/* ===== account page v2: design, eye icon, profile, Google messages ===== */
Object.assign(authCopy.ps,{profile:'زما پروفایل',profileIntro:'خپل معلومات بشپړ کړئ. دا یوازې ستاسو په حساب کې ساتل کېږي.',complete:'بشپړ سوی',occupation:'دنده',organization:'کارځای یا ښوونځی (اختیاري)',province:'ولایت یا هیواد',phone:'د تلیفون شمېره (اختیاري)',choose:'وټاکئ',otherCountry:'بل هیواد',saveProfile:'پروفایل خوندي کړئ',welcomeTitle:'ښه راغلاست!',welcomeText:'خپل پروفایل بشپړ کړئ: دنده او ولایت وټاکئ.',invalid_phone:'سمه شمېره ولیکئ (شمېرې، + او -).',invalid_org:'له ۸۰ تورو زیات نه سي لیکل کېدای.',invalid_job:'خپله دنده وټاکئ.',profile_ok:'پروفایل خوندي سو.',provider_disabled:'دا ډول ننوتل په Firebase کې لا نه دی فعال سوی.',domain_unauthorized:'د دې پاڼې پته په Firebase کې د اجازه سوو ډومینونو لیست کې نشته.',google_webview:'Google په دننني اپ براوزر کې ننوتل نه مني. دا پاڼه د Chrome له لارې پرانیزئ، یا د ایمیل او پاسورډ وکاروئ.',popup_blocked:'براوزر پاپ-اپ بند کړ. بیا هڅه وکړئ.',redirecting:'Google ته درومو…'});
Object.assign(authCopy.fa,{profile:'پروفایل من',profileIntro:'اطلاعات خود را کامل کنید. این اطلاعات فقط در حساب شما نگهداری می‌شود.',complete:'تکمیل',occupation:'شغل',organization:'محل کار یا مکتب (اختیاری)',province:'ولایت یا کشور',phone:'شمارهٔ تلفن (اختیاری)',choose:'انتخاب کنید',otherCountry:'کشور دیگر',saveProfile:'ذخیرهٔ پروفایل',welcomeTitle:'خوش آمدید!',welcomeText:'پروفایل خود را کامل کنید: شغل و ولایت را انتخاب کنید.',invalid_phone:'شمارهٔ درست بنویسید (ارقام، + و -).',invalid_org:'بیش از ۸۰ حرف نوشته نمی‌شود.',invalid_job:'شغل خود را انتخاب کنید.',profile_ok:'پروفایل ذخیره شد.',provider_disabled:'این روش ورود هنوز در Firebase فعال نشده است.',domain_unauthorized:'نشانی این صفحه در فهرست دامنه‌های مجاز Firebase نیست.',google_webview:'گوگل ورود را در مرورگر داخلی اپ نمی‌پذیرد. این صفحه را با Chrome باز کنید یا از ایمیل و رمز عبور استفاده کنید.',popup_blocked:'مرورگر پنجرهٔ بازشو را بست. دوباره تلاش کنید.',redirecting:'در حال رفتن به Google…'});
Object.assign(authCopy.ur,{profile:'میری پروفائل',profileIntro:'اپنی معلومات مکمل کریں۔ یہ صرف آپ کے اکاؤنٹ میں رکھی جاتی ہیں۔',complete:'مکمل',occupation:'پیشہ',organization:'کام کی جگہ یا اسکول (اختیاری)',province:'صوبہ یا ملک',phone:'فون نمبر (اختیاری)',choose:'منتخب کریں',otherCountry:'دوسرا ملک',saveProfile:'پروفائل محفوظ کریں',welcomeTitle:'خوش آمدید!',welcomeText:'اپنی پروفائل مکمل کریں: پیشہ اور صوبہ منتخب کریں۔',invalid_phone:'درست نمبر لکھیں (ہندسے، + اور -)۔',invalid_org:'۸۰ حروف سے زیادہ نہیں لکھ سکتے۔',invalid_job:'اپنا پیشہ منتخب کریں۔',profile_ok:'پروفائل محفوظ ہو گئی۔',provider_disabled:'یہ لاگ اِن طریقہ ابھی Firebase میں فعال نہیں۔',domain_unauthorized:'اس صفحے کا پتہ Firebase کے منظور شدہ ڈومینز میں نہیں۔',google_webview:'Google اندرونی ایپ براؤزر میں لاگ اِن کی اجازت نہیں دیتا۔ یہ صفحہ Chrome میں کھولیں یا ای میل اور پاس ورڈ استعمال کریں۔',popup_blocked:'براؤزر نے پاپ اپ بند کر دیا۔ دوبارہ کوشش کریں۔',redirecting:'Google کی طرف جا رہے ہیں…'});
Object.assign(authCopy.en,{profile:'My profile',profileIntro:'Complete your details. They are kept only in your account.',complete:'complete',occupation:'Occupation',organization:'Workplace or school (optional)',province:'Province or country',phone:'Phone number (optional)',choose:'Choose',otherCountry:'Other country',saveProfile:'Save profile',welcomeTitle:'Welcome!',welcomeText:'Complete your profile: choose your occupation and province.',invalid_phone:'Enter a valid number (digits, + and -).',invalid_org:'Use at most 80 characters.',invalid_job:'Choose your occupation.',profile_ok:'Profile saved.',provider_disabled:'This sign-in method is not enabled in Firebase yet.',domain_unauthorized:'This page address is not in Firebase authorized domains.',google_webview:'Google does not allow sign-in inside an in-app browser. Open this page in Chrome, or use email and password.',popup_blocked:'The browser blocked the pop-up. Please try again.',redirecting:'Going to Google…'});
var a2Jobs={
 ps:[['student','زده کوونکی'],['doctor','ډاکټر'],['pharmacist','درملساز'],['herbalist','عطار یا د دودیز طب پوه'],['researcher','څېړونکی'],['teacher','ښوونکی یا استاد'],['farmer','بزګر یا کروندګر'],['other','بل']],
 fa:[['student','دانشجو یا شاگرد'],['doctor','داکتر'],['pharmacist','دواساز'],['herbalist','عطار یا طبیب سنتی'],['researcher','پژوهشگر'],['teacher','معلم یا استاد'],['farmer','دهقان یا کشاورز'],['other','دیگر']],
 ur:[['student','طالب علم'],['doctor','ڈاکٹر'],['pharmacist','دوا ساز'],['herbalist','عطار یا روایتی طبیب'],['researcher','محقق'],['teacher','استاد یا معلم'],['farmer','کسان یا کاشتکار'],['other','دیگر']],
 en:[['student','Student'],['doctor','Doctor'],['pharmacist','Pharmacist'],['herbalist','Herbalist or traditional practitioner'],['researcher','Researcher'],['teacher','Teacher or lecturer'],['farmer','Farmer'],['other','Other']]
};
window.gkProfile={};window.gkProfileLoaded=false;
window.receiveProfile=function(p){window.gkProfile=p&&typeof p==='object'?p:{};window.gkProfileLoaded=true;if(view==='usr'||view==='set')render();};
var pendingView=null,accountNotice='';
function gkGate(v){
 if(v==='id'&&accountReady&&!accountSignedIn){pendingView='id';accountNotice='id';accountMode='signup';return 'usr';}
 if(v!=='usr'){pendingView=null;accountNotice='';}
 return v;
}
(function(){
 var orig=window.receiveAccountState;
 window.receiveAccountState=function(){
  orig.apply(this,arguments);
  if(accountSignedIn&&pendingView){var v=pendingView;pendingView=null;accountNotice='';go(v);}
  if(arguments[7]==='profile_ok'&&!arguments[4])gkProfileDone();
 };
})();
function gkProfileDone(){
 var old=document.getElementById('gk-done');if(old)old.remove();
 var c=authText(),o=document.createElement('div');o.id='gk-done';o.setAttribute('role','status');
 o.innerHTML='<div class="gk-card"><svg viewBox="0 0 52 52" aria-hidden="true"><circle class="gk-c" cx="26" cy="26" r="23"/><path class="gk-t" d="M15 27l8 8 15-17"/></svg><b>'+esc(c.profile_ok||'')+'</b></div>';
 document.body.appendChild(o);
 setTimeout(function(){o.classList.add('out');setTimeout(function(){o.remove();try{if(view==='usr'&&!goBack())go('home')}catch(e){go('home')}},260)},1500);
}
(function(){var st=document.createElement('style');st.textContent='#gk-done{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(20,40,30,.45);animation:gkIn .25s ease}#gk-done.out{opacity:0;transition:opacity .25s}.gk-card{background:#fff;color:#173b2d;border-radius:26px;padding:28px 34px;display:grid;justify-items:center;gap:14px;box-shadow:0 18px 50px rgba(0,0,0,.25);animation:gkPop .4s cubic-bezier(.2,1.3,.4,1)}.gk-card svg{width:84px;height:84px}.gk-card b{font-size:18px}.gk-c{fill:#e3f1e8;stroke:#2e8b57;stroke-width:3}.gk-t{fill:none;stroke:#2e8b57;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40;stroke-dashoffset:40;animation:gkDraw .5s .25s ease forwards}@keyframes gkDraw{to{stroke-dashoffset:0}}@keyframes gkIn{from{opacity:0}}@keyframes gkPop{from{transform:scale(.7);opacity:0}}@media(prefers-reduced-motion:reduce){.gk-card,.gk-t,#gk-done{animation:none}.gk-t{stroke-dashoffset:0}}';document.head.appendChild(st)})();
Object.assign(authCopy.ps,{needAccountId:'د بوټو پېژندنې لپاره لومړی حساب جوړ کړئ، یا که لرئ ننوځئ.'});
Object.assign(authCopy.fa,{needAccountId:'برای شناخت گیاه ابتدا حساب بسازید، یا اگر دارید وارد شوید.'});
Object.assign(authCopy.ur,{needAccountId:'پودے کی پہچان کے لیے پہلے اکاؤنٹ بنائیں، یا اگر ہے تو لاگ اِن کریں۔'});
Object.assign(authCopy.en,{needAccountId:'To identify a plant, first create an account, or sign in if you have one.'});
function a2svg(p){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';}
var A2={
 mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 job:'<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5h6v2M3 13h18"/>',
 pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
 phone:'<path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
 org:'<path d="M4 21V5l8-2v18M12 9l8 2v10M8 9h.01M8 13h.01M8 17h.01"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 eyeOff:'<path d="M3 3l18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.1 7.6A16.6 16.6 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'
};
function authStatus(){const c=authText();if(accountBusy)return c.busy;const m=typeof c[accountMessage]==='string'?c[accountMessage]:accountFailed?c.failed:'';return m;}
function a2status(){const t=authStatus(),code=accountFailed&&window.gkAuthCode?'<code>'+esc(window.gkAuthCode)+(window.gkAuthCode==='auth/unauthorized-domain'?' · '+esc(location.hostname||location.protocol):'')+'</code>':'';return '<p id="auth-status" role="status" aria-live="polite" class="a2-status'+(accountFailed?' auth-error':'')+'">'+(t?esc(t)+code:'')+'</p>';}
function authFormError(code){accountFailed=true;accountMessage=code;window.gkAuthCode='';const s=document.getElementById('auth-status');if(s){s.textContent=authStatus();s.classList.add('auth-error');}}
function toggleAuthPassword(id,button){
 const input=document.getElementById(id);if(!input)return;
 const show=input.type==='password';input.type=show?'text':'password';
 button.innerHTML=a2svg(show?A2.eyeOff:A2.eye);button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',authText()[show?'hide':'show']);
}
function isEmbeddedWebView(){const u=navigator.userAgent||'';return /; wv\)/.test(u)||(/Android/.test(u)&&/Version\/[\d.]+/.test(u)&&/Chrome\//.test(u))||(/iPhone|iPad|iPod/.test(u)&&!/Safari\//.test(u));}
function continueWithGoogle(){
 if(!googleReady||accountBusy)return;
 if(!window.NativeAccount&&isEmbeddedWebView()){accountFailed=true;accountMessage='google_webview';window.gkAuthCode='';render();return;}
 beginAccountAction('google');
}
function a2field(id,name,label,icon,attrs){return '<div class="a2-f"><label for="'+id+'">'+label+'</label><div class="a2-in">'+a2svg(A2[icon])+'<input id="'+id+'" name="'+name+'" '+attrs+'></div></div>';}
function a2pass(id,name,label,signup,disabled){const c=authText();return '<div class="a2-f"><label for="'+id+'">'+label+'</label><div class="a2-in pw">'+a2svg(A2.lock)+'<input id="'+id+'" name="'+name+'" type="password" dir="ltr" autocomplete="'+(signup?'new-password':'current-password')+'" required maxlength="4096"'+(signup?' minlength="8"':'')+disabled+'><button class="a2-eye" type="button" aria-controls="'+id+'" aria-pressed="false" aria-label="'+c.show+'" onclick="toggleAuthPassword(\''+id+'\',this)"'+disabled+'>'+a2svg(A2.eye)+'</button></div></div>';}
function a2select(id,name,label,icon,options,value,disabled){const c=authText();return '<div class="a2-f"><label for="'+id+'">'+label+'</label><div class="a2-in">'+a2svg(A2[icon])+'<select id="'+id+'" name="'+name+'"'+disabled+'><option value="">'+c.choose+'</option>'+options.map(function(o){return '<option value="'+esc(o[0])+'"'+(o[0]===value?' selected':'')+'>'+esc(o[1])+'</option>'}).join('')+'</select></div></div>';}
function a2profileCard(disabled){
 const c=authText(),p=window.gkProfile||{},jobs=a2Jobs[lang]||a2Jobs.en;
 const provs=provinces.map(function(x){return [x,x]}).concat([['other',c.otherCountry]]);
 const name=accountDisplayName||'';
 const filled=[name,p.occupation,p.organization,p.province,p.phone].filter(function(v){return v&&String(v).trim()}).length,pct=Math.round(filled*100/5);
 return '<section class="a2-card"><h4>'+c.profile+'</h4><p class="a2-intro">'+c.profileIntro+'</p>'+
  '<div class="a2-prog"><div class="a2-bar"><i style="width:'+pct+'%"></i></div><span>'+pct+'% '+c.complete+'</span></div>'+
  '<form class="a2-form" onsubmit="saveProfileForm(event)">'+
  a2field('prof-name','displayName',c.name,'user','dir="auto" autocomplete="name" maxlength="60" required value="'+esc(name)+'"'+disabled)+
  a2select('prof-job','occupation',c.occupation,'job',jobs,p.occupation||'',disabled)+
  a2field('prof-org','organization',c.organization,'org','dir="auto" autocomplete="organization" maxlength="80" value="'+esc(p.organization||'')+'"'+disabled)+
  a2select('prof-prov','province',c.province,'pin',provs,p.province||'',disabled)+
  a2field('prof-phone','phone',c.phone,'phone','type="tel" inputmode="tel" dir="ltr" autocomplete="tel" maxlength="20" value="'+esc(p.phone||'')+'"'+disabled)+
  '<button type="submit" class="a2-cta"'+disabled+'>'+c.saveProfile+'</button>'+a2status()+'</form></section>';
}
function saveProfileForm(event){
 event.preventDefault();if(accountBusy)return;
 const f=event.currentTarget.elements,c=authText();
 const name=f.displayName.value.trim(),org=f.organization.value.trim(),phone=f.phone.value.trim();
 if(!name||name.length>60){authFormError('invalid_name');return;}
 if(!f.occupation.value){authFormError('invalid_job');return;}
 if(org.length>80){authFormError('invalid_org');return;}
 if(phone&&!/^[+0-9 ()-]{5,20}$/.test(phone)){authFormError('invalid_phone');return;}
 beginAccountAction('saveProfile',[{displayName:name,occupation:f.occupation.value,organization:org,province:f.province.value,phone:phone}]);
}
function accountPage(){
 const c=authText(),x=accountExtra[lang]||accountExtra.en,disabled=accountBusy?' disabled':'',offline=!accountReady?' disabled':disabled;
 const hero='style="--a2-img:url('+(typeof homeHeroImage==='function'?homeHeroImage():'')+')"';
 if(accountSignedIn){
  const nm=accountDisplayName||accountEmail,initial=esc((nm.trim()[0]||'?').toUpperCase()),p=window.gkProfile||{};
  const needProfile=!window.NativeAccount&&window.gkProfileLoaded&&!p.occupation;
  return bar(accountLabels[lang][0])+'<div class="a2">'+
   '<section class="a2-card a2-me"><span class="a2-avatar" aria-hidden="true">'+initial+'</span><h3>'+esc(nm)+'</h3><p class="auth-email" dir="ltr">'+esc(accountEmail)+'</p>'+
   '<p class="a2-badge'+(accountVerified?' is-verified':'')+'">'+(accountVerified?'✓ ':'')+c[accountVerified?'verified':'unverified']+'</p>'+
   (!accountVerified?'<div class="a2-row"><button type="button" class="a2-ghost" onclick="beginAccountAction(\'verifyEmail\')"'+offline+'>'+c.verify+'</button><button type="button" class="a2-ghost" onclick="beginAccountAction(\'refresh\')"'+offline+'>'+c.refresh+'</button></div>':'')+
   (window.NativeAccount?'':'')+'</section>'+
   (needProfile?'<div class="a2-welcome"><span class="acct-bic">'+ic('heart')+'</span><span><b>'+c.welcomeTitle+'</b><span>'+c.welcomeText+'</span></span></div>':'')+
   (window.NativeAccount
     ?'<section class="a2-card"><form class="a2-form" onsubmit="saveOnlineProfile(event)">'+a2field('account-name','displayName',c.name,'user','dir="auto" autocomplete="name" maxlength="60" required value="'+esc(accountDisplayName)+'"'+disabled)+'<button type="submit" class="a2-cta"'+offline+'>'+c.save+'</button>'+a2status()+'</form></section>'
     :a2profileCard(offline))+
   accountBenefits()+
   '<button type="button" class="a2-ghost a2-out" onclick="beginAccountAction(\'signOut\')"'+offline+'>'+c.logout+'</button></div>';
 }
 const signup=accountMode==='signup',reset=accountMode==='reset',title=c[reset?'reset':signup?'signup':'login'];
 return bar(accountLabels[lang][0])+'<div class="a2">'+
  '<section class="a2-hero" '+hero+'>'+appEmblem()+'<h3>'+title+'</h3><p>'+x.tag+'</p>'+(!accountReady?'<p class="auth-error">'+c.unavailable+'</p>':'')+'</section>'+
  (accountNotice==='id'?'<div class="a2-welcome"><span class="acct-bic">'+ic('cam')+'</span><span><b>'+c.needAccountId+'</b></span></div>':'')+
  '<section class="a2-card">'+
  (reset?'<p class="acct-help">'+c.resetHelp+'</p>':'<div class="acct-tabs" role="group"><button type="button" class="'+(!signup?'on':'')+'" aria-pressed="'+(!signup)+'" onclick="changeAccountMode(\'login\')"'+disabled+'>'+c.login+'</button><button type="button" class="'+(signup?'on':'')+'" aria-pressed="'+signup+'" onclick="changeAccountMode(\'signup\')"'+disabled+'>'+c.signup+'</button></div>')+
  '<form id="auth-form" class="a2-form" onsubmit="checkAuthForm(event)">'+
  (signup?a2field('auth-name','displayName',c.name,'user','autocomplete="name" maxlength="60" required dir="auto" value="'+esc(authDraftName)+'"'+disabled):'')+
  a2field('auth-email','email',c.email,'mail','type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" dir="ltr" required value="'+esc(authDraftEmail)+'"'+disabled)+
  (!reset?a2pass('auth-password','password',c.password,signup,disabled)+(signup?'<span class="a2-hint">'+c.hint+'</span>'+a2pass('auth-confirm','confirmPassword',c.confirm,signup,disabled):''):'')+
  '<button type="submit" class="a2-cta"'+offline+'>'+c[reset?'sendReset':signup?'signup':'login']+'</button>'+a2status()+'</form>'+
  (!reset?'<div class="a2-or"><span>'+x.or+'</span></div><button type="button" class="a2-google" onclick="continueWithGoogle()"'+(!googleReady||accountBusy?' disabled':'')+'><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.7-4.9H1.3v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/></svg><span>'+c.google+'</span></button>':'')+
  '<button type="button" class="a2-link" onclick="changeAccountMode(\''+(reset?'login':'reset')+'\')"'+disabled+'>'+c[reset?'backLogin':'forgot']+'</button></section>'+
  accountBenefits()+'</div>';
}

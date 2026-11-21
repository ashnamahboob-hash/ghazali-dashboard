(function(){
I.info='<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>';
I.refresh='<path d="M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12 0l2 5M4 12l2 5a7 7 0 0 0 12 0"/>';
const rows={
ps:['زما حساب','ننوتل','نوی حساب','د اپ تنظیمات','ژبه','بڼه او د لیک اندازه','زما سیمه','ولایت','ولسوالي — نوم ولیکئ','خوندي کول','خوندي سو','زما اوسنی ځای','ځای معلومېږي…','ځای نه سي معلومېدلای؛ اجازه او GPS وګورئ، یا سیمه په لاس وټاکئ.','GPS په دې اپ کي نه دئ موجود؛ سیمه په لاس وټاکئ.','ځای پاکول','ستاسي سیمه یوازې په دې وسیله کي ساتل کېږي. GPS اختیاري دئ؛ په شالید کي تعقیب نه کېږي او د پېژندنې خدمت ته نه لېږل کېږي.','معلومات او مرسته','د اپ په اړه او نظر رالېږل','د ښه عکس لارښود','روښانه عکس واخلئ؛ یو بوټی په چوکاټ کي وساتئ. پاڼه، ګل یا مېوه له نږدې وښیاست. تت عکس او د لمر مستقیم انعکاس مه کاروئ.','سرچینې','د کتاب او اضافي سرچینو لینکونه د هر مدخل په پای کي دي. د سیمې له مخې تایید شوي بوټي لا نه دي بشپړ شوي.','د معلوماتو تازه کول','وروستی بریالی تازه کېدل','لا نه دئ ثبت شوی','د ځای محرمیت','د ویب بڼې نسخه','پروفایل','انټرنټ نشته؛ ساتل شوي معلومات کارول کېږي.','د سیمې ټاکل اختیاري دي.','د GPS موقعیت','د ځای ساتل ناکام سول.'],
fa:['حساب من','ورود','ثبت‌نام','تنظیمات برنامه','زبان','ظاهر و اندازه متن','منطقه من','ولایت','ولسوالی — نام را بنویسید','ذخیره','ذخیره شد','موقعیت فعلی من','در حال یافتن موقعیت…','موقعیت یافت نشد؛ اجازه و GPS را بررسی کنید یا دستی وارد کنید.','GPS در این برنامه در دسترس نیست؛ منطقه را دستی وارد کنید.','پاک کردن موقعیت','منطقه فقط در این دستگاه ذخیره می‌شود. GPS اختیاری است؛ ردیابی پس‌زمینه ندارد و به سرویس شناسایی ارسال نمی‌شود.','معلومات و راهنما','درباره برنامه و ارسال نظر','راهنمای عکس مناسب','عکس روشن بگیرید و فقط یک گیاه را در کادر قرار دهید. برگ، گل یا میوه را از نزدیک نشان دهید. از عکس تار و بازتاب مستقیم آفتاب پرهیز کنید.','منابع','لینک کتاب و منابع اضافی در پایان هر مدخل است. اطلاعات تاییدشده گیاهان هر منطقه هنوز کامل نیست.','تازه‌سازی معلومات','آخرین تازه‌سازی موفق','هنوز ثبت نشده','حریم خصوصی موقعیت','نسخه وب','پروفایل','اینترنت در دسترس نیست؛ اطلاعات ذخیره‌شده استفاده می‌شود.','انتخاب منطقه اختیاری است.','مختصات GPS','ذخیره موقعیت ناموفق بود.'],
ur:['میرا اکاؤنٹ','لاگ ان','رجسٹر','ایپ کی ترتیبات','زبان','تھیم اور متن کا سائز','میرا علاقہ','صوبہ','ضلع — نام لکھیں','محفوظ کریں','محفوظ ہوگیا','میرا موجودہ مقام','مقام تلاش ہو رہا ہے…','مقام نہیں ملا؛ اجازت اور GPS دیکھیں یا علاقہ خود لکھیں۔','اس ایپ میں GPS دستیاب نہیں؛ علاقہ خود لکھیں۔','مقام حذف کریں','علاقہ صرف اس آلے میں محفوظ ہوتا ہے۔ GPS اختیاری ہے؛ پس منظر میں نگرانی نہیں ہوتی اور مقام شناخت کی سروس کو نہیں بھیجا جاتا۔','معلومات اور مدد','ایپ کے بارے میں اور رائے','اچھی تصویر کی رہنمائی','روشن تصویر لیں اور ایک پودا فریم میں رکھیں۔ پتے، پھول یا پھل قریب سے دکھائیں۔ دھندلی تصویر اور سورج کی چمک سے بچیں۔','ذرائع','کتاب اور اضافی ذرائع کے لنک ہر اندراج کے آخر میں ہیں۔ علاقائی پودوں کی تصدیق شدہ معلومات ابھی مکمل نہیں۔','معلومات تازہ کریں','آخری کامیاب تازہ کاری','ابھی درج نہیں','مقام کی رازداری','ویب ورژن','پروفائل','انٹرنیٹ دستیاب نہیں؛ محفوظ معلومات استعمال ہو رہی ہیں۔','علاقہ منتخب کرنا اختیاری ہے۔','GPS مقام','مقام محفوظ نہیں ہوا۔'],
en:['My account','Log in','Register','App settings','Language','Appearance & text size','My area','Province','District — enter name','Save','Saved','Use my current location','Finding location…','Location unavailable. Check permission and GPS, or enter your area manually.','GPS is unavailable in this app. Enter your area manually.','Clear location','Your area stays on this device. GPS is optional, never tracks in the background and is not sent to the identification service.','Information & help','About & feedback','Photo guide','Take a well-lit photo with one plant in the frame. Show a leaf, flower or fruit close up. Avoid blur and direct glare.','Sources','Book and additional source links appear below each entry. Verified regional plant records are not complete yet.','Refresh information','Last successful refresh','Not recorded yet','Location privacy','Web version','Profile','You are offline. Saved information remains available.','Choosing an area is optional.','GPS coordinates','Could not save location.']
};
const text=()=>rows[lang]||rows.en;
let region={},gpsRun=0;
try{const r=JSON.parse(localStorage.getItem('gk_area')||'{}');if(r&&typeof r==='object')region=r}catch(e){}
const safe=x=>esc(String(x||''));
function note(s){const el=document.getElementById('area-status');if(el)el.textContent=s}
function persist(){try{localStorage.setItem('gk_area',JSON.stringify(region));return true}catch(e){return false}}
window.saveArea=function(){const p=document.getElementById('area-province'),d=document.getElementById('area-district');region.province=p.value;region.district=d.value.trim().slice(0,80);note(text()[persist()?10:32])};
window.clearArea=function(){gpsRun++;region={};persist();render()};
window.locateArea=function(){
const run=++gpsRun;note(text()[12]);
if(!navigator.geolocation){note(text()[14]);return}
navigator.geolocation.getCurrentPosition(function(p){
 if(run!==gpsRun)return;
 region.coords={latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy};
 const saved=persist();if(view==='set')render();note(text()[saved?10:32]);
},function(){if(run===gpsRun)note(text()[13])},{enableHighAccuracy:false,timeout:12000,maximumAge:60000});
};
window.settingsAccount=function(mode){accountMode=mode;go('usr')};
window.refreshSettingsData=function(){if(!navigator.onLine){note(text()[29]);return}location.reload()};
function fold(title,body,open=false){return '<details class="setting-fold"'+(open?' open':'')+'><summary>'+safe(title)+'<span aria-hidden="true">⌄</span></summary><div class="setting-body">'+body+'</div></details>'}
function button(label,action,icon){return '<button class="setting-link" onclick="'+action+'"><span class="setting-icon" aria-hidden="true">'+ic(icon)+'</span><span>'+safe(label)+'</span><span class="setting-arrow" aria-hidden="true">‹</span></button>'}
function card(title,body){return '<section class="setting-card"><h3>'+safe(title)+'</h3>'+body+'</section>'}
const oldSettings=settingsPage;
settingsPage=function(T){
const a=text();let stamp='';try{stamp=localStorage.getItem('gk_last_sync')||''}catch(e){}
const languages=['ps','fa','ur','en'].map(k=>'<button class="chip'+(k===lang?' on':'')+'" aria-pressed="'+(k===lang)+'" onclick="setLang(\''+k+'\')">'+safe(L[k].n)+'</button>').join('');
const choices=(labels,action,index)=>labels.map((s,i)=>'<button class="chip'+(i===index?' on':'')+'" aria-pressed="'+(i===index)+'" onclick="'+action+'('+i+')">'+safe(s)+'</button>').join('');
const area='<p>'+a[30]+'</p><label for="area-province">'+a[7]+'</label><select id="area-province" onchange="document.getElementById(\'area-district\').value=\'\'"><option value="">—</option>'+provinces.map(p=>'<option value="'+safe(p)+'"'+(p===region.province?' selected':'')+'>'+safe(p)+'</option>').join('')+'</select><label for="area-district">'+a[8]+'</label><input id="area-district" maxlength="80" dir="auto" value="'+safe(region.district)+'"><div class="row"><button class="chip on" onclick="saveArea()">'+a[9]+'</button><button class="chip" onclick="locateArea()">'+a[11]+'</button><button class="chip" onclick="clearArea()">'+a[15]+'</button></div>'+(region.coords?'<p>'+a[31]+': <b dir="ltr">'+Number(region.coords.latitude).toFixed(3)+', '+Number(region.coords.longitude).toFixed(3)+'</b></p>':'')+'<small>'+a[16]+'</small>';
return bar(T.set)+'<div class="settings-modern">'+card(a[0],accountSignedIn?button(accountDisplayName||a[28],"go('usr')",'users'):button(a[1],"settingsAccount('login')",'users')+button(a[2],"settingsAccount('signup')",'users'))+
card(a[3],fold(a[4],'<div class="row">'+languages+'</div>')+fold(a[5],'<h4>'+safe(T.thm)+'</h4><div class="row">'+choices(T.th,'setTh',TH.indexOf(th))+'</div><h4>'+safe(T.fs)+'</h4><div class="row">'+choices(T.fz,'setFz',FZ.indexOf(fz))+'</div><label class="settings-toggle">'+safe(settingsLabels[lang][2])+'<input type="checkbox" onchange="setRecent(this.checked)"'+(showRecent?' checked':'')+'></label>')+fold(a[6]+(region.province?' · '+region.province:''),area))+
'<p id="area-status" role="status" aria-live="polite"></p>'+
card(a[17],button(a[18],"go('about')",'info')+fold(a[19],'<p>'+a[20]+'</p>')+fold(a[21],'<p>'+a[22]+'</p>')+fold(a[26],'<p>'+a[16]+'</p>')+button(a[23],'refreshSettingsData()','refresh'))+
'<footer class="settings-version">'+a[27]+' <b dir="ltr">2.3 · 2026.11.16</b><br>'+a[24]+': '+(stamp?safe(new Date(stamp).toLocaleString(lang==='ps'?'en-GB':lang)):a[25])+'</footer></div>';
};
if(view==='set')render();
})();

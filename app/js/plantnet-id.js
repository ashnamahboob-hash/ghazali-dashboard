/* ===== photo identification (Pl@ntNet) ===== */
(function(){
var KEY='2b10rJ77CjQx8afvTeVFBUvIsO';
var TX={
 ps:{more:'نور معلومات (د Pl@ntNet له خوا، د کتاب برخه نه ده)',cn:'عام نومونه:',fam:'کورنۍ:',ph:'د Pl@ntNet نمونه عکسونه:',run:'پیژندنه روانه ده…',ai:'احتمالي پایله (Pl@ntNet)',inbook:'په کتاب کې:',genus:'د همدې جنس مدخلونه په کتاب کې:',none:'په کتاب کې نه دی لیکل شوی',open:'مدخل کتل',err:'پیژندنه ونه شوه. انټرنټ وګورئ او بیا هڅه وکړئ.',noplant:'په عکس کې بوټی ونه موندل شو.',note:'پایله یوازې احتمالي ده. بوټی د کتاب له مدخل سره یوازې د علمي نوم له مخې پرتله کېږي.',idt:'د بوټي عکس واخله یا وټاکه. ایپ به یې احتمالي نوم ولټوي او د کتاب مدخل ورسره پرتله کړي.'},
 fa:{more:'اطلاعات بیشتر (از Pl@ntNet، بخشی از کتاب نیست)',cn:'نام‌های رایج:',fam:'خانواده:',ph:'عکس‌های نمونه Pl@ntNet:',run:'در حال شناسایی…',ai:'نتیجه احتمالی (Pl@ntNet)',inbook:'در کتاب:',genus:'مدخل‌های هم‌جنس در کتاب:',none:'در کتاب نوشته نشده است',open:'دیدن مدخل',err:'شناسایی انجام نشد. اینترنت را بررسی کنید و دوباره تلاش کنید.',noplant:'گیاهی در عکس پیدا نشد.',note:'نتیجه فقط احتمالی است. تطبیق با کتاب فقط بر اساس نام علمی انجام می‌شود.',idt:'عکس گیاه را بگیرید یا انتخاب کنید. برنامه نام احتمالی را جستجو و با مدخل‌های کتاب تطبیق می‌دهد.'},
 ur:{more:'مزید معلومات (Pl@ntNet کی طرف سے، کتاب کا حصہ نہیں)',cn:'عام نام:',fam:'خاندان:',ph:'Pl@ntNet کی نمونہ تصاویر:',run:'پہچان جاری ہے…',ai:'ممکنہ نتیجہ (Pl@ntNet)',inbook:'کتاب میں:',genus:'اسی جنس کے اندراجات کتاب میں:',none:'کتاب میں نہیں لکھا گیا',open:'اندراج دیکھیں',err:'پہچان نہیں ہو سکی۔ انٹرنیٹ دیکھیں اور دوبارہ کوشش کریں۔',noplant:'تصویر میں پودا نہیں ملا۔',note:'نتیجہ صرف ممکنہ ہے۔ کتاب سے ملاپ صرف سائنسی نام کی بنیاد پر ہوتا ہے۔',idt:'پودے کی تصویر لیں یا منتخب کریں۔ ایپ ممکنہ نام تلاش کر کے کتاب کے اندراجات سے ملائے گی۔'},
 en:{more:'More information (from Pl@ntNet, not part of the book)',cn:'Common names:',fam:'Family:',ph:'Pl@ntNet sample photos:',run:'Identifying…',ai:'Possible result (Pl@ntNet)',inbook:'In the book:',genus:'Entries of the same genus in the book:',none:'Not written in the book',open:'Open entry',err:'Identification failed. Check your internet and try again.',noplant:'No plant found in the photo.',note:'The result is only probable. Matching with the book uses the scientific name only.',idt:'Take or choose a photo of the plant. The app finds a probable name and compares it with the book entries.'}
};
var ADDITIONAL_TEXT={"ps": {"science": "علمي نوم", "fullName": "بشپړ علمي نوم", "authority": "د علمي نوم لیکوال", "genusName": "جنس", "confidence": "د عکس د پېژندني احتمال", "organTitle": "په عکس کې پېژندل شوې برخه", "conservation": "د ساتني حالت (IUCN)", "notProvided": "په سرچینه کې نه دئ ورکړل شوی", "localMissing": "په دې ژبه عام نوم په سرچینه کې نشته.", "psNames": "Pl@ntNet پښتو عام نومونه نه برابروي. د کتاب نوم، که د علمي نوم کره سمون ولري، پورته ښودل کېږي.", "originalNames": "د سرچینې اصلي نومونه (انګلیسي)", "namesNote": "عام نومونه د سرچینې په ثبت شوې بڼه ښودل کېږي؛ علمي نومونه او د عکسونو د لیکوالانو نومونه په اصل بڼه ساتل کېږي.", "namesLoading": "په ټاکلې ژبه نومونه کتل کېږي…", "photoAuthor": "عکاس", "photoLicense": "د استعمال جواز", "photoDate": "نېټه", "sourceLinks": "سرچینې او بشپړ معلومات", "idn": "بل عکس واخله یا له ګالرۍ یې وټاکه.", "organs": {"flower": "ګل", "leaf": "پاڼه", "fruit": "مېوه", "bark": "پوستکی", "habit": "بشپړ بوټی", "other": "بله برخه", "auto": "اوتومات"}, "statuses": {"EX": "له منځه تللی", "EW": "په طبیعت کې له منځه تللی", "CR": "له ډېر سخت خطر سره مخ", "EN": "له خطر سره مخ", "VU": "زیان منونکی", "NT": "خطر ته نږدې", "LC": "لږه اندېښنه", "DD": "معلومات ناکافي دي", "NE": "نه دئ ارزول شوی"}}, "fa": {"science": "نام علمی", "fullName": "نام کامل علمی", "authority": "مؤلف نام علمی", "genusName": "جنس", "confidence": "احتمال شناسایی از عکس", "organTitle": "بخش شناسایی‌شده در عکس", "conservation": "وضعیت حفاظت (IUCN)", "notProvided": "در منبع ارائه نشده است", "localMissing": "نام رایج در این زبان در منبع موجود نیست.", "psNames": "Pl@ntNet نام‌های رایج پشتو ارائه نمی‌کند.", "originalNames": "نام‌های اصلی منبع (انگلیسی)", "namesNote": "نام‌های رایج مطابق ثبت منبع نمایش داده می‌شوند؛ نام‌های علمی و نام عکاسان به شکل اصلی حفظ می‌شوند.", "namesLoading": "در حال دریافت نام‌ها در زبان انتخاب‌شده…", "photoAuthor": "عکاس", "photoLicense": "جواز استفاده", "photoDate": "تاریخ", "sourceLinks": "منابع و معلومات کامل", "idn": "عکس دیگری بگیرید یا از گالری انتخاب کنید.", "organs": {"flower": "گل", "leaf": "برگ", "fruit": "میوه", "bark": "پوست", "habit": "تمام گیاه", "other": "بخش دیگر", "auto": "خودکار"}, "statuses": {"EX": "منقرض‌شده", "EW": "منقرض‌شده در طبیعت", "CR": "در خطر بحرانی انقراض", "EN": "در خطر انقراض", "VU": "آسیب‌پذیر", "NT": "نزدیک به تهدید", "LC": "کمترین نگرانی", "DD": "داده ناکافی", "NE": "ارزیابی نشده"}}, "ur": {"science": "سائنسی نام", "fullName": "مکمل سائنسی نام", "authority": "سائنسی نام کے مصنف", "genusName": "جنس", "confidence": "تصویر سے شناخت کا امکان", "organTitle": "تصویر میں شناخت شدہ حصہ", "conservation": "تحفظ کی حالت (IUCN)", "notProvided": "ماخذ میں فراہم نہیں کیا گیا", "localMissing": "اس زبان میں عام نام ماخذ میں موجود نہیں۔", "psNames": "Pl@ntNet پشتو کے عام نام فراہم نہیں کرتا۔", "originalNames": "ماخذ کے اصل نام (انگریزی)", "namesNote": "عام نام ماخذ میں درج صورت میں دکھائے جاتے ہیں؛ سائنسی نام اور فوٹوگرافروں کے نام اصل صورت میں رہتے ہیں۔", "namesLoading": "منتخب زبان میں نام حاصل کیے جا رہے ہیں…", "photoAuthor": "فوٹوگرافر", "photoLicense": "استعمال کا اجازت نامہ", "photoDate": "تاریخ", "sourceLinks": "ماخذ اور مکمل معلومات", "idn": "دوسری تصویر لیں یا گیلری سے منتخب کریں۔", "organs": {"flower": "پھول", "leaf": "پتا", "fruit": "پھل", "bark": "چھال", "habit": "مکمل پودا", "other": "دوسرا حصہ", "auto": "خودکار"}, "statuses": {"EX": "معدوم", "EW": "جنگلی حالت میں معدوم", "CR": "انتہائی خطرے سے دوچار", "EN": "خطرے سے دوچار", "VU": "غیر محفوظ", "NT": "خطرے کے قریب", "LC": "کم تشویش", "DD": "ناکافی معلومات", "NE": "جائزہ نہیں لیا گیا"}}, "en": {"science": "Scientific name", "fullName": "Full scientific name", "authority": "Name authorship", "genusName": "Genus", "confidence": "Photo identification confidence", "organTitle": "Detected plant part", "conservation": "Conservation status (IUCN)", "notProvided": "Not provided by the source", "localMissing": "No common name is available in this language from the source.", "psNames": "Pl@ntNet does not provide Pashto common names.", "originalNames": "Original source names (English)", "namesNote": "Common names are shown as recorded by the source; scientific names and photographers’ names retain their original spelling.", "namesLoading": "Loading names in the selected language…", "photoAuthor": "Photographer", "photoLicense": "License", "photoDate": "Date", "sourceLinks": "Sources and full information", "idn": "Take another photo or choose one from the gallery.", "organs": {"flower": "Flower", "leaf": "Leaf", "fruit": "Fruit", "bark": "Bark", "habit": "Whole plant", "other": "Other part", "auto": "Automatic"}, "statuses": {"EX": "Extinct", "EW": "Extinct in the Wild", "CR": "Critically Endangered", "EN": "Endangered", "VU": "Vulnerable", "NT": "Near Threatened", "LC": "Least Concern", "DD": "Data Deficient", "NE": "Not Evaluated"}}};
Object.keys(ADDITIONAL_TEXT).forEach(function(l){TX[l]=Object.assign(TX[l]||{},ADDITIONAL_TEXT[l])});
function T2(){return TX[lang]||TX.en}
try{['ps','fa','ur','en'].forEach(function(l){if(L[l]&&(TX[l]||TX.en))L[l].idt=(TX[l]||TX.en).idt})}catch(e){}
try{var st=document.createElement('style');st.textContent='.photo-shortcut .soon{display:none}.idres{margin-top:14px}.idres .idc{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:12px 14px;margin:8px 0}.idres .idc>b{display:block;direction:ltr;text-align:start;font-size:16px}.idres .idc small{color:var(--soft)}.idres .idb{display:block;width:100%;text-align:start;margin-top:6px;padding:10px 12px;border-radius:12px;border:1px solid var(--bd);background:rgba(255,255,255,.05);color:var(--ink);font:inherit;cursor:pointer}.idres .idn{color:var(--soft);font-size:13px;margin-top:10px}.idhero{display:flex;align-items:center;gap:14px;padding:16px;border-radius:24px;border:1px solid var(--bd);background:linear-gradient(135deg,rgba(224,194,106,.16),rgba(255,255,255,.04));margin:4px 0 14px}.idhero p{margin:0;color:var(--ink);line-height:1.7;font-size:15px}.idic{flex:none;width:52px;height:52px;border-radius:18px;background:var(--gold);color:#173b2d;display:grid;place-items:center}.idic svg{width:26px;height:26px}.idacts{display:grid;grid-template-columns:1.4fr 1fr;gap:10px}.idact{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:92px;border-radius:22px;border:1px solid var(--bd);background:rgba(255,255,255,.06);color:var(--ink);font-weight:700;font-size:15px;cursor:pointer;overflow:hidden;transition:transform .15s}.idact:active{transform:scale(.97)}.idact svg{width:28px;height:28px;color:var(--gold)}.idact.main{background:var(--gold);color:#173b2d;border-color:transparent;box-shadow:0 8px 24px rgba(0,0,0,.28)}.idact.main svg{color:#173b2d}.idact input{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer}#pv .preview{display:block;width:100%;max-height:280px;object-fit:cover;border-radius:24px;margin-top:16px;box-shadow:0 10px 30px rgba(0,0,0,.35)}.idnote{text-align:center;font-size:12px;opacity:.8}.idres .idspin{display:flex;align-items:center;gap:10px;color:var(--soft);padding:14px 4px}.idres .idspin:before{content:"";width:18px;height:18px;border-radius:50%;border:3px solid rgba(255,255,255,.2);border-top-color:var(--gold);animation:idr .8s linear infinite}@keyframes idr{to{transform:rotate(360deg)}}.idres .idc{border-radius:22px;padding:16px;box-shadow:0 6px 18px rgba(0,0,0,.18)}.idres .idc>b{font-size:18px;font-style:italic}.idres .idbar{height:6px;border-radius:99px;background:rgba(255,255,255,.12);margin:8px 0 2px;overflow:hidden}.idres .idbar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#8bc48a,var(--gold))}.idres .idph{display:flex;overflow-x:auto;gap:8px;scroll-snap-type:x mandatory;padding-bottom:4px}.idres .idph figure{flex:0 0 46%;scroll-snap-align:start}.idres .idb{border-radius:14px;padding:12px 14px;font-weight:700}.idres .idmore{border-top:1px solid var(--bd);margin-top:10px;padding-top:4px}.lens{margin:-6px -2px 0}.lstage{position:relative;height:56vh;min-height:360px;max-height:560px;border-radius:26px;overflow:hidden;background:#06130d;box-shadow:0 10px 36px rgba(0,0,0,.45)}.lstage video,.lstage #lp{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none}.lstage.live video{display:block}.lstage.scan #lp,.lstage.done #lp{display:block}.lstage.nocam{background:radial-gradient(circle at 50% 40%,#1d5a43,#06130d)}.lframe i{position:absolute;width:34px;height:34px;border:3px solid rgba(255,255,255,.92);border-radius:8px}.lframe i:nth-child(1){top:22%;left:14%;border-right:0;border-bottom:0}.lframe i:nth-child(2){top:22%;right:14%;border-left:0;border-bottom:0}.lframe i:nth-child(3){bottom:30%;left:14%;border-right:0;border-top:0}.lframe i:nth-child(4){bottom:30%;right:14%;border-left:0;border-top:0}.lstage.done .lframe,.lstage.scan .lframe i{opacity:.55}.lscan{display:none;position:absolute;left:10%;right:10%;height:3px;border-radius:3px;background:linear-gradient(90deg,transparent,#e0c26a,transparent);box-shadow:0 0 22px 8px rgba(224,194,106,.55);animation:lsc 1.6s ease-in-out infinite alternate}.lstage.scan .lscan{display:block}@keyframes lsc{from{top:20%}to{top:68%}}.lstage.scan:after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.28)}.lhint{position:absolute;top:12px;left:12px;right:12px;text-align:center;font-size:12.5px;color:#fff;background:rgba(0,0,0,.42);backdrop-filter:blur(6px);padding:7px 12px;border-radius:99px;line-height:1.5}.lstage.scan .lhint,.lstage.done .lhint{display:none}.lctl{position:absolute;bottom:16px;left:0;right:0;display:flex;align-items:center;justify-content:space-around;z-index:2}.lbtn{position:relative;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);color:#fff;cursor:pointer;padding:0;font:inherit}.lbtn svg{width:24px;height:24px}.lbtn input{position:absolute;inset:0;opacity:0;width:100%;height:100%}.lshut{width:74px;height:74px;border-radius:50%;border:4px solid #fff;background:transparent;padding:5px;cursor:pointer}.lshut span{display:block;width:100%;height:100%;border-radius:50%;background:#fff;transition:transform .12s}.lshut:active span{transform:scale(.86)}.lstage.done{height:36vh;min-height:240px;transition:height .3s}.lstage.done .lframe{display:none}.lsheet.idres,.lsheet{position:relative;margin-top:-22px;background:var(--bg,#0f3b2c);border-radius:26px 26px 0 0;padding:10px 14px 24px;min-height:110px;border-top:1px solid var(--bd);box-shadow:0 -10px 30px rgba(0,0,0,.35)}.lgrab{display:block;width:44px;height:5px;border-radius:99px;background:rgba(255,255,255,.28);margin:2px auto 10px}.idhero{padding:10px 12px;gap:10px;border-radius:18px;margin:2px 0 10px}.idhero p{font-size:13px;line-height:1.55;flex:1}.idic{width:38px;height:38px;border-radius:13px}.idic svg{width:20px;height:20px}.idai{flex:none;font-size:11px;font-weight:800;letter-spacing:.5px;padding:3px 9px;border-radius:99px;background:linear-gradient(135deg,#8bc48a,var(--gold));color:#173b2d}.idacts{gap:8px}.idact{flex-direction:row;min-height:54px;border-radius:16px;gap:8px;font-size:14px}.idact svg{width:22px;height:22px}#pv .preview{max-height:150px;border-radius:18px;margin-top:10px}.idres .idph{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:8px}.idres .idph figure{margin:0}.idres .idph img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:12px;display:block;background:rgba(255,255,255,.06)}.idres .idph figcaption{font-size:11px;color:var(--soft);margin-top:3px;word-break:break-word}.idres .idl{display:inline-block;margin:4px 6px 0 0;padding:6px 12px;border:1px solid var(--bd);border-radius:999px;color:var(--gold);text-decoration:none}';document.head.appendChild(st)}catch(e){}
try{var localizedStyle=document.createElement('style');localizedStyle.textContent=".idmeta{display:grid;gap:0;margin:10px 0}.idmeta-row{display:grid;grid-template-columns:minmax(90px,.8fr) minmax(0,1.2fr);gap:10px;padding:9px 0;border-bottom:1px solid var(--bd);font-size:14px;line-height:1.6}.idmeta-row>span{color:var(--soft)}.idmeta-row>b{font-weight:500;overflow-wrap:anywhere;unicode-bidi:plaintext}.idcommon{padding:8px 0;line-height:1.8}.idoriginal{margin:10px 0;font-size:13px;line-height:1.8}.idoriginal summary{cursor:pointer;color:var(--soft)}.idph figcaption{display:grid;gap:2px;line-height:1.5}.idph figcaption bdi{unicode-bidi:isolate}.idc>small{display:block;margin-top:8px}.idmore .idn b{line-height:1.8}";document.head.appendChild(localizedStyle)}catch(e){}
var IDX=null;
function build(){
 IDX={sp:{},ge:{}};
 H.forEach(function(p,i){
  if(!p.s||!isPublished(p))return;
  String(p.s).split(/\s*(?:\/|;|,)\s*/).forEach(function(part){
   var w=part.replace(/[×x]\s+/,' ').trim().split(/\s+/);var g=(w[0]||'').toLowerCase();if(!/^[a-z-]+$/.test(g))return;
   (IDX.ge[g]=IDX.ge[g]||[]);if(IDX.ge[g].indexOf(i)<0)IDX.ge[g].push(i);
   var s=(w[1]||'').toLowerCase();if(/^[a-z-]+$/.test(s)&&!/^(spp?|species|var|subsp)$/.test(s)){var k=g+' '+s;(IDX.sp[k]=IDX.sp[k]||[]);if(IDX.sp[k].indexOf(i)<0)IDX.sp[k].push(i)}
  });
 });
}
function toBlob(src,w,h){var m=1280,r=Math.min(1,m/Math.max(w,h)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(w*r));c.height=Math.max(1,Math.round(h*r));c.getContext('2d').drawImage(src,0,0,c.width,c.height);return new Promise(function(res,rej){c.toBlob(function(b){b?res(b):rej(new Error('blob'))},'image/jpeg',.85)})}
function viaImg(file){return new Promise(function(res,rej){var fr=new FileReader();fr.onerror=function(){rej(new Error('read '+file.size))};fr.onload=function(){var im=new Image();im.onload=function(){toBlob(im,im.naturalWidth||im.width,im.naturalHeight||im.height).then(res,rej)};im.onerror=function(){rej(new Error('img '+(file.type||'?')+' '+file.size))};im.src=fr.result};fr.readAsDataURL(file)})}
function shrink(file){
 if(!file.size)return Promise.reject(new Error('empty file'));
 if(window.createImageBitmap){return createImageBitmap(file).then(function(bm){return toBlob(bm,bm.width,bm.height)}).catch(function(){return viaImg(file)})}
 return viaImg(file)}
function nameOf(i){try{return herbDisplay(H[i])}catch(e){return H[i].s}}
var lastPayload=null,lastPayloadLang='en',photoUrl='',identificationRun=0;
var metadataCache=Object.create(null),metadataPending=Object.create(null),metadataFailures=Object.create(null);
function appLanguage(){return ['ps','fa','ur','en'].indexOf(lang)>=0?lang:'en'}
function apiLanguage(l){return ['fa','ur','en','ar'].indexOf(l)>=0?l:'en'}
function speciesKey(value){return String(value||'').trim().replace(/\s+/g,' ').toLowerCase()}
function metaKey(sci,l){return apiLanguage(l)+'|'+speciesKey(sci)}
function cachedMeta(sci,l){return metadataCache[metaKey(sci,l)]}
function namesArray(value){return Array.isArray(value)?value.filter(function(x){return typeof x==='string'&&x.trim()}).filter(function(x,i,a){return a.indexOf(x)===i}).slice(0,8):[]}
function selectedNames(r,l){
 var sci=(r.species||{}).scientificNameWithoutAuthor||'',meta=cachedMeta(sci,l);
 if(l==='ps')return [];
 if(meta)return namesArray(meta.commonNames);
 return lastPayloadLang===l?namesArray((r.species||{}).commonNames):[];
}
function fetchMeta(sci,l){
 var k=metaKey(sci,l);if(metadataCache[k])return Promise.resolve(metadataCache[k]);
 if(metadataPending[k])return metadataPending[k];
 if(metadataFailures[k]&&Date.now()-metadataFailures[k]<60000)return Promise.resolve(null);
 var controller=typeof AbortController==='function'?new AbortController():null;
 var timeout=controller?setTimeout(function(){controller.abort()},12000):null;
 var url='https://my-api.plantnet.org/v2/species?api-key='+encodeURIComponent(KEY)+'&prefix='+encodeURIComponent(sci)+'&page=1&pageSize=20&lang='+encodeURIComponent(apiLanguage(l));
 metadataPending[k]=fetch(url,controller?{signal:controller.signal}:{}).then(function(response){if(!response.ok)throw new Error('metadata');return response.json()}).then(function(rows){
  // A prefix match can be a different species: accept the exact scientific name only.
  var record=Array.isArray(rows)?rows.find(function(x){return speciesKey(x.scientificNameWithoutAuthor)===speciesKey(sci)}):null;
  if(record){metadataCache[k]=record;return record;}
  metadataFailures[k]=Date.now();return null;
 }).catch(function(){metadataFailures[k]=Date.now();return null}).then(function(record){
  if(timeout)clearTimeout(timeout);delete metadataPending[k];return record;
 });return metadataPending[k];
}
function ensureMetadata(payload,l){
 (payload.results||[]).slice(0,3).forEach(function(r){var sci=(r.species||{}).scientificNameWithoutAuthor;if(!sci)return;
  fetchSpeciesDetails(sci,l);
  fetchMeta(sci,l).then(function(){if(payload===lastPayload&&appLanguage()===l&&typeof view!=='undefined'&&view==='id')paintLast()});
 });
}
function infoRow(label,value,latin){return '<div class="idmeta-row"><span>'+esc(label)+'</span><b'+(latin?' dir="ltr"':' dir="auto"')+'>'+esc(value)+'</b></div>'}
function localizedOrgan(value,t){return t.organs[value]||String(value||'')}
function conservationText(value,t){var code=String(value||'').toUpperCase();return code?(t.statuses[code]||code)+' ('+code+')':t.notProvided}
function imageUrl(value){try{var u=new URL(String(value));return u.protocol==='https:'?u.href:''}catch(e){return ''}}
function imageDate(image,l){
 var n=image.date&&image.date.timestamp;if(typeof n!=='number'||!Number.isFinite(n))return '';
 try{return new Intl.DateTimeFormat({ps:'ps-AF',fa:'fa-AF',ur:'ur-PK',en:'en'}[l]).format(new Date(n))}catch(e){return ''}
}

var DETAIL_TEXT={"ps": {"book": "د ایپ معلومات", "external": "اضافي معلومات — ویکیپیډیا", "description": "ماهیت او پېژندنه", "uses": "د سرچینې له مخي استعمال", "missing": "په دې ژبه کي باوري معلومات ونه موندل سول.", "usesMissing": "په دې سرچینه کي استعمال جلا نه دی بیان سوی.", "loading": "اضافي معلومات راټولېږي…", "source": "سرچینه", "unavailable": "اضافي معلومات اوس نه ترلاسه کېږي. انټرنټ وګورئ.", "caution": "دا عمومي معلومات دي؛ د عکس احتمالي پېژندنه د درملیز استعمال تایید نه دئ.", "noBook": "په کتاب کي د همدې نوعي برابر مدخل نشته. د ورته جنس استعمال دې بوټي ته نه سي منسوبېدای."}, "fa": {"book": "اطلاعات برنامه", "external": "اطلاعات تکمیلی — ویکی‌پدیا", "description": "ماهیت و معرفی", "uses": "کاربردهای ذکرشده در منبع", "missing": "اطلاعات در این زبان یافت نشد.", "usesMissing": "کاربرد در این منبع جداگانه بیان نشده است.", "loading": "دریافت اطلاعات تکمیلی…", "source": "منبع", "unavailable": "اطلاعات تکمیلی اکنون در دسترس نیست. اتصال را بررسی کنید.", "caution": "این اطلاعات عمومی است؛ شناسایی احتمالی عکس تأیید مصرف دارویی نیست.", "noBook": "مدخل مطابق با همین گونه در کتاب موجود نیست. کاربرد گونه‌های هم‌جنس را نمی‌توان به این گیاه نسبت داد."}, "ur": {"book": "ایپ کی معلومات", "external": "اضافی معلومات — ویکیپیڈیا", "description": "ماہیت اور تعارف", "uses": "ماخذ میں بیان کردہ استعمال", "missing": "اس زبان میں معلومات نہیں ملیں۔", "usesMissing": "اس ماخذ میں استعمال الگ بیان نہیں ہوا۔", "loading": "اضافی معلومات حاصل ہو رہی ہیں…", "source": "ماخذ", "unavailable": "اضافی معلومات اس وقت دستیاب نہیں۔ انٹرنیٹ دیکھیں۔", "caution": "یہ عمومی معلومات ہیں؛ تصویر کی ممکنہ شناخت دوائی کے استعمال کی تصدیق نہیں۔", "noBook": "کتاب میں اسی نوع کا مطابق اندراج نہیں۔ ایک ہی جنس کی دوسری انواع کا استعمال اس پودے سے منسوب نہیں کیا جا سکتا۔"}, "en": {"book": "App information", "external": "Additional information — Wikipedia", "description": "Description", "uses": "Uses stated by the source", "missing": "Information was not found in this language.", "usesMissing": "Uses are not separately described in this source.", "loading": "Loading additional information…", "source": "Source", "unavailable": "Additional information is unavailable. Check your connection.", "caution": "General information only. A probable photo identification does not confirm medicinal use.", "noBook": "No matching species entry is available in the book. Uses of other species in the same genus cannot be attributed to this plant."}};

var speciesDetails=Object.create(null),speciesDetailsPending=Object.create(null);
function detailKey(sci,l){return l+'|'+speciesKey(sci)}
function wikiRequest(l,params){
 var url=new URL('https://'+l+'.wikipedia.org/w/api.php');
 var values=Object.assign({action:'query',format:'json',formatversion:2,origin:'*',redirects:1},params);
 Object.keys(values).forEach(function(k){url.searchParams.set(k,values[k])});
 var controller=new AbortController(),timer=setTimeout(function(){controller.abort()},12000);
 return fetch(url.href,{signal:controller.signal}).then(function(r){if(!r.ok)throw new Error('source');return r.json()}).then(function(j){
  var page=j.query&&j.query.pages&&j.query.pages[0];
  if(!page||page.missing||page.pageprops&&Object.hasOwn(page.pageprops,'disambiguation'))return null;
  return page;
 }).finally(function(){clearTimeout(timer)});
}
function splitSourceExtract(text,l){
 var chunks=String(text||'').split(/\n\s*==+\s*([^\n=]+?)\s*==+\s*\n/),uses=[];
 var titles={en:/^(uses?|medicinal uses?|traditional uses?|ethnobotany|economic uses?)$/i,ps:/^(استعمال|کارونه|کارونې|ګټې|درملیز استعمال)$/,fa:/^(کاربردها|کاربرد|مصارف|خواص|استفاده‌ها|استفاده ها|کاربردهای دارویی)$/,ur:/^(استعمال|استعمالات|طبی استعمال|فوائد)$/};
 for(var i=1;i<chunks.length;i+=2)if(titles[l].test(chunks[i].trim()))uses.push(chunks[i+1]||'');
 function clean(v){return v.replace(/\n{3,}/g,'\n\n').trim().slice(0,3500)}
 return {description:clean(chunks[0]),uses:clean(uses.join('\n\n'))};
}
function verifyScientificTaxon(page,sci){
 var id=page.pageprops&&page.pageprops.wikibase_item;
 if(!/^Q[0-9]+$/.test(id||''))return Promise.resolve(false);
 var controller=new AbortController(),timer=setTimeout(function(){controller.abort()},12000);
 var url='https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=claims&ids='+encodeURIComponent(id);
 return fetch(url,{signal:controller.signal}).then(function(r){if(!r.ok)throw new Error('taxon');return r.json()}).then(function(j){
  var entity=j.entities&&j.entities[id],claims=entity&&entity.claims&&entity.claims.P225||[];
  return claims.some(function(c){var v=c.mainsnak&&c.mainsnak.datavalue;return v&&speciesKey(v.value)===speciesKey(sci)});
 }).finally(function(){clearTimeout(timer)});
}
function fetchSpeciesDetails(sci,l){
 var key=detailKey(sci,l);if(speciesDetails[key])return Promise.resolve(speciesDetails[key]);
 if(speciesDetailsPending[key])return speciesDetailsPending[key];
 // Resolve the scientific title first; localized pages must come from its language links.
 speciesDetailsPending[key]=wikiRequest('en',{prop:'extracts|langlinks|pageprops',explaintext:1,exsectionformat:'wiki',lllang:l,lllimit:10,titles:sci}).then(function(base){
  if(!base)return null;
  // A redirect to a broader taxon or similarly named plant must never supply uses.
  var safeTitle=speciesKey(base.title)===speciesKey(sci);
  var scientificLead=new RegExp('^'+sci.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:\\s|[,.(])','i').test(String(base.extract||'').trim());
  return (safeTitle||scientificLead?Promise.resolve(true):verifyScientificTaxon(base,sci)).then(function(verified){
   if(!verified)return null;
   if(l==='en')return base;
   var link=(base.langlinks||[]).find(function(x){return x.lang===l});
   return link?wikiRequest(l,{prop:'extracts|pageprops',explaintext:1,exsectionformat:'wiki',titles:link.title}):null;
  });
 }).then(function(page){
  var result=page?Object.assign(splitSourceExtract(page.extract,l),{url:'https://'+l+'.wikipedia.org/wiki/'+encodeURIComponent(page.title),title:page.title,state:'ready'}):{state:'missing'};
  speciesDetails[key]=result;return result;
 }).catch(function(){return {state:'error'}}).then(function(result){
  delete speciesDetailsPending[key];speciesDetails[key]=result;
  if(typeof view!=='undefined'&&view==='id'&&appLanguage()===l)paintLast();
  return result;
 });return speciesDetailsPending[key];
}
function detailParagraphsHtml(value){return String(value||'').split(/\n\s*\n/).filter(Boolean).map(function(v){return '<p>'+esc(v)+'</p>'}).join('')}
function bookSpeciesDetails(indices,l){
 var copy=DETAIL_TEXT[l],out='';
 indices.forEach(function(i){
  var plant=H[i],record=wordDetailLayout.records[plant.taj&&plant.taj[0]],fields=record&&record.fields&&record.fields[l];
  out+='<details class="idbook"><summary>'+esc(copy.book)+' — '+esc(nameOf(i))+'</summary>';
  if(fields){
   ['mhy','origin','mzj','khs','benefit','use','mzr','msl','bdl'].forEach(function(key){
    var items=fields[key];if(!Array.isArray(items)||!items.length)return;
    out+='<div class="idtext"><h4>'+esc(wordDetailLayout.labels[l][key])+'</h4>'+items.map(function(item){return (item.subtitle?'<h5>'+esc(item.subtitle)+'</h5>':'')+detailParagraphsHtml(item.text)}).join('')+'</div>';
   });
  }else out+='<p>'+esc(copy.missing)+'</p>';
  out+='<button class="idb" onclick="openHerb('+i+')">'+esc(T2().open)+'</button><div class="idsources">'+librarySource(plant)+'</div></details>';
 });return out;
}
function externalSpeciesDetails(sci,l){
 var copy=DETAIL_TEXT[l],record=speciesDetails[detailKey(sci,l)];
 var h='<section class="idexternal"><h3>'+esc(copy.external)+'</h3>';
 if(!record)return h+'<p role="status">'+esc(copy.loading)+'</p></section>';
 if(record.state!=='ready')return h+'<p>'+esc(record.state==='error'?copy.unavailable:copy.missing)+'</p></section>';
 h+='<div class="idtext"><h4>'+esc(copy.description)+'</h4>'+detailParagraphsHtml(record.description||copy.missing)+'</div>';
 h+='<div class="idtext"><h4>'+esc(copy.uses)+'</h4>'+detailParagraphsHtml(record.uses||copy.usesMissing)+'</div>';
 h+='<p class="idn">'+esc(copy.caution)+'</p><div class="idsources">'+esc(copy.source)+': <a target="_blank" rel="noopener" href="'+esc(record.url)+'">'+esc(record.title)+' · Wikipedia (CC BY-SA)</a></div></section>';
 return h;
}
try{var detailStyle=document.createElement('style');detailStyle.textContent='.idbook,.idexternal{margin-top:14px;padding:14px;border:1px solid var(--bd);border-radius:16px;background:var(--card);overflow-wrap:anywhere}.idbook summary{font-weight:700;cursor:pointer;line-height:1.8}.idtext{padding:10px 0;border-bottom:1px solid var(--bd)}.idtext h4,.idexternal h3{margin:4px 0 8px;font-size:15px;color:var(--ink)}.idtext h5{margin:8px 0;font-size:14px}.idtext p,.idexternal>p{font-size:14px;line-height:1.9;margin:6px 0;white-space:pre-line}.idsources{font-size:12px;line-height:1.8;padding-top:12px}.idsources a{color:var(--ink);text-decoration:underline}.idsources .sec{padding:0;margin:0;border:0;box-shadow:none}.idres{padding-bottom:120px}';document.head.appendChild(detailStyle)}catch(e){}


// Supplemental sources are independent: one unavailable service cannot hide the others.
var EXTRA_TEXT={
 ps:{title:'نور علمي معلومات',short:'لنډه پېژندنه — Wikidata',taxonomy:'علمي وېش — GBIF',kingdom:'عالم',phylum:'څانګه',class:'ټولګی',order:'رتبه',family:'کورنۍ',genus:'جنس',scientificName:'بشپړ علمي نوم'},
 fa:{title:'اطلاعات علمی بیشتر',short:'معرفی کوتاه — Wikidata',taxonomy:'رده‌بندی علمی — GBIF',kingdom:'فرمانرو',phylum:'شاخه',class:'رده',order:'راسته',family:'خانواده',genus:'سرده',scientificName:'نام کامل علمی'},
 ur:{title:'مزید سائنسی معلومات',short:'مختصر تعارف — Wikidata',taxonomy:'سائنسی درجہ بندی — GBIF',kingdom:'سلطنت',phylum:'شعبہ',class:'جماعت',order:'ترتیب',family:'خاندان',genus:'جنس',scientificName:'مکمل سائنسی نام'},
 en:{title:'More scientific information',short:'Short description — Wikidata',taxonomy:'Scientific classification — GBIF',kingdom:'Kingdom',phylum:'Phylum',class:'Class',order:'Order',family:'Family',genus:'Genus',scientificName:'Full scientific name'}
};
var extraCache=Object.create(null),extraPending=Object.create(null);
function extraRequest(url){
 var controller=new AbortController(),timer=setTimeout(function(){controller.abort()},12000);
 return fetch(url,{signal:controller.signal}).then(function(r){if(!r.ok)throw new Error('source');return r.json()}).finally(function(){clearTimeout(timer)});
}
function exactEntity(entity,sci){
 return (entity&&entity.claims&&entity.claims.P225||[]).some(function(c){var v=c.mainsnak&&c.mainsnak.datavalue;return c.rank!=='deprecated'&&v&&speciesKey(v.value)===speciesKey(sci)});
}
function fetchExtraSource(sci,source){
 var key=source+'|'+speciesKey(sci);if(extraCache[key])return Promise.resolve(extraCache[key]);
 if(extraPending[key])return extraPending[key];
 var request;
 if(source==='gbif'){
  request=extraRequest('https://api.gbif.org/v1/species/match?strict=true&kingdom=Plantae&name='+encodeURIComponent(sci)).then(function(j){
   if(j.matchType!=='EXACT'||j.rank!=='SPECIES'||j.kingdom!=='Plantae'||speciesKey(j.canonicalName)!==speciesKey(sci)||!Number.isSafeInteger(j.usageKey)||j.usageKey<=0)return {state:'missing'};
   return {state:'ready',data:j,url:'https://www.gbif.org/species/'+j.usageKey};
  });
 }else{
  request=wikiRequest('en',{prop:'pageprops',titles:sci}).then(function(page){
   var id=page&&page.pageprops&&page.pageprops.wikibase_item;
   if(!/^Q[0-9]+$/.test(id||''))return {entities:{}};
   return extraRequest('https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&ids='+encodeURIComponent(id)+'&props=claims%7Clabels%7Cdescriptions&languages=ps%7Cfa%7Cur%7Cen');
  }).then(function(j){
   var entities=Object.values(j.entities||{}),entity=entities.find(function(e){return /^Q[0-9]+$/.test(e.id||'')&&exactEntity(e,sci)});
   return entity?{state:'ready',data:entity,url:'https://www.wikidata.org/wiki/'+entity.id}:{state:'missing'};
  });
 }
 extraPending[key]=request.catch(function(){return {state:'error'}}).then(function(record){
  delete extraPending[key];extraCache[key]=record;
  if(typeof view!=='undefined'&&view==='id')paintLast();return record;
 });return extraPending[key];
}
function extraSpeciesDetails(sci,l){
 var copy=EXTRA_TEXT[l],base=DETAIL_TEXT[l],h='<section class="idexternal"><h3>'+esc(copy.title)+'</h3>';
 ['wikidata','gbif'].forEach(function(source){
  var key=source+'|'+speciesKey(sci),record=extraCache[key];
  h+='<div class="idtext"><h4>'+esc(source==='gbif'?copy.taxonomy:copy.short)+'</h4>';
  if(!record)h+='<p role="status">'+esc(base.loading)+'</p>';
  else if(record.state!=='ready')h+='<p>'+esc(record.state==='error'?base.unavailable:base.missing)+'</p>';
  else{
   if(source==='gbif'){
    ['scientificName','kingdom','phylum','class','order','family','genus'].forEach(function(field){if(record.data[field])h+=infoRow(copy[field],record.data[field],true)});
   }else{
    var description=record.data.descriptions&&record.data.descriptions[l],label=record.data.labels&&record.data.labels[l];
    if(label&&label.language===l)h+='<p><b>'+esc(label.value)+'</b></p>';
    h+=detailParagraphsHtml(description&&description.language===l?description.value:base.missing);
   }
   h+='<div class="idsources">'+esc(base.source)+': <a target="_blank" rel="noopener" href="'+esc(record.url)+'">'+(source==='gbif'?'GBIF':'Wikidata (CC0)')+'</a></div>';
  }
  h+='</div>';
  if(!record)fetchExtraSource(sci,source);
 });return h+'</section>';
}

function renderRes(rs,box){
 if(!box)return;build();
 var l=appLanguage(),t=T2(),bookMatches=[],h='';
 rs.slice(0,3).forEach(function(r){
  var sci=(r.species||{}).scientificNameWithoutAuthor||'',parts=speciesKey(sci).split(/\s+/);
  (IDX.sp[parts[0]+' '+(parts[1]||'')]||[]).forEach(function(i){if(bookMatches.indexOf(i)<0)bookMatches.push(i)});
 });
 h+='<details class="gkai-results"><summary>'+esc(DETAIL_TEXT[l].book)+'</summary>'+(bookMatches.length?bookSpeciesDetails(bookMatches,l):'<p>'+esc(DETAIL_TEXT[l].noBook)+'</p>')+'</details>';
 h+='<details class="gkai-results"><summary>'+esc(t.ai)+'</summary>';
 rs.slice(0,3).forEach(function(r){
  var species=r.species||{},sci=species.scientificNameWithoutAuthor||'',w=speciesKey(sci).split(/\s+/),key=w[0]+' '+(w[1]||''),g=w[0];
  var exact=IDX.sp[key]||[],sameGenus=(IDX.ge[g]||[]).filter(function(i){return exact.indexOf(i)<0});
  var percent=Math.max(0,Math.min(100,Math.round((Number(r.score)||0)*100))),meta=cachedMeta(sci,l)||{};
  var family=species.family&&species.family.scientificNameWithoutAuthor||meta.family||'',genus=species.genus&&species.genus.scientificNameWithoutAuthor||meta.genus||'';
  var author=species.scientificNameAuthorship||meta.scientificNameAuthorship||'',full=species.scientificName||(sci+(author?' '+author:''));
  h+='<section class="idc" dir="'+(l==='en'?'ltr':'rtl')+'"><div class="idn">'+esc(t.science)+'</div><b dir="ltr">'+esc(sci)+'</b>';
  h+='<small class="mint-confidence"><span>'+esc(t.confidence)+'</span><strong>'+percent+'%</strong></small><div class="idbar"><i style="width:'+percent+'%"></i></div>';
  if(exact.length)h+='<div class="idn">'+esc(t.inbook)+'</div>'+exact.map(function(i){return '<button class="idb" onclick="openHerb('+i+')">'+esc(nameOf(i))+' — '+esc(t.open)+'</button>'}).join('');
  else if(sameGenus.length)h+='<div class="idn">'+esc(t.genus)+'</div>'+sameGenus.slice(0,5).map(function(i){return '<button class="idb" onclick="openHerb('+i+')">'+esc(nameOf(i))+' — '+esc(t.open)+'</button>'}).join('');
  else h+='<div class="idn">'+esc(t.none)+'</div>';
  if(!exact.length)h+='<p class="idn">'+esc(DETAIL_TEXT[l].noBook)+'</p>';
  h+=externalSpeciesDetails(sci,l);
  h+=extraSpeciesDetails(sci,l);
  h+='<div class="idmore"><div class="idn"><b>'+esc(t.more)+'</b></div><div class="idmeta">';
  if(full)h+=infoRow(t.fullName,full,true);if(author)h+=infoRow(t.authority,author,true);
  if(genus)h+=infoRow(t.genusName,genus,true);if(family)h+=infoRow(t.fam,family,true);
  h+=infoRow(t.conservation,conservationText(meta.iucnCategory,t),false);
  if(lastPayload&&lastPayload.predictedOrgans&&lastPayload.predictedOrgans[0]&&lastPayload.predictedOrgans[0].organ)h+=infoRow(t.organTitle,localizedOrgan(lastPayload.predictedOrgans[0].organ,t),false);
  h+='</div>';
  var common=selectedNames(r,l),pending=metadataPending[metaKey(sci,l)];
  h+='<div class="idn"><b>'+esc(t.cn)+'</b></div>';
  if(common.length)h+='<div class="idcommon" dir="auto">'+common.map(esc).join('، ')+'</div>';
  else h+='<div class="idn">'+esc(l==='ps'?t.psNames:pending?t.namesLoading:t.localMissing)+'</div>';
  if(l==='ps'){
   var original=namesArray(meta.commonNames);if(!original.length&&lastPayloadLang==='en')original=namesArray(species.commonNames);
   if(original.length)h+='<details class="idoriginal"><summary>'+esc(t.originalNames)+'</summary><div dir="auto">'+original.map(esc).join('، ')+'</div></details>';
  }
  var images=(r.images||[]).slice(0,4).filter(function(m){return imageUrl(m.url&&(m.url.m||m.url.s||m.url.o))});
  if(images.length){h+='<div class="idn">'+esc(t.ph)+'</div><div class="idph">';
   images.forEach(function(m){var url=imageUrl(m.url&&(m.url.m||m.url.s||m.url.o)),organ=localizedOrgan(m.organ,t),date=imageDate(m,l);h+='<figure><img loading="lazy" src="'+esc(url)+'" alt="'+esc(organ)+'"><figcaption>';
    if(organ)h+='<span>'+esc(organ)+'</span>';
    if(m.author)h+='<span>'+esc(t.photoAuthor)+': <bdi>'+esc(m.author)+'</bdi></span>';
    if(m.license)h+='<span>'+esc(t.photoLicense)+': <bdi>'+esc(m.license)+'</bdi></span>';
    if(date)h+='<span>'+esc(t.photoDate)+': '+esc(date)+'</span>';
    h+='</figcaption></figure>';
   });h+='</div>';
  }
  var gbif=r.gbif&&r.gbif.id||meta.gbifId,powo=r.powo&&r.powo.id||meta.powoId,links='';
  if(gbif)links+='<a class="idl" target="_blank" rel="noopener" href="https://www.gbif.org/species/'+encodeURIComponent(gbif)+'">GBIF</a>';
  if(powo){var id=String(powo);if(id.indexOf('urn:')!==0)id='urn:lsid:ipni.org:names:'+id;links+='<a class="idl" target="_blank" rel="noopener" href="https://powo.science.kew.org/taxon/'+encodeURIComponent(id)+'">POWO (Kew)</a>';}
  if(links)h+='<div class="idn">'+esc(t.sourceLinks)+'</div><div>'+links+'</div>';
  h+='</div></section>';
 });
 box.innerHTML=h+'<div class="idn">'+esc(t.namesNote)+'</div><div class="idn">'+esc(t.note)+'</div></details>';
}
function compactAiField(value){
 if(Array.isArray(value))return value.slice(0,2).map(function(item){return {text:String(typeof item==='string'?item:item&&item.text||'').slice(0,400)}});
 return typeof value==='string'?value.slice(0,600):'';
}
function paintLast(){
 if(!lastPayload||typeof view==='undefined'||view!=='id')return;
 var box=$('idres');if(!box)return;if(!lastPayload.results||!lastPayload.results.length){showPlantnetNote(box,T2().noplant,'no_match');return;}renderRes(lastPayload.results,box);
 try {
  var aiLanguage=appLanguage(),aiBooks=[],aiCandidates=lastPayload.results.slice(0,3).map(function(r){
   var sp=r.species||{},scientific=sp.scientificNameWithoutAuthor||'',parts=speciesKey(scientific).split(/\s+/),matches=IDX.sp[parts[0]+' '+(parts[1]||'')]||[];
   matches.slice(0,2).forEach(function(i){
    var plant=H[i],record=wordDetailLayout.records[plant.taj&&plant.taj[0]],fields=record&&record.fields&&record.fields[aiLanguage];
    if(fields)aiBooks.push({scientific:scientific,name:nameOf(i),fields:{mhy:compactAiField(fields.mhy),mzj:compactAiField(fields.mzj)}});
   });
   return {scientific:scientific,confidence:Math.round((Number(r.score)||0)*100),family:sp.family&&sp.family.scientificNameWithoutAuthor||''};
  });
  window.ghazaliIdentificationPhoto=photoUrl;
  window.ghazaliLastIdentification={run:identificationRun,language:aiLanguage,plantnetStatus:'ready',candidates:aiCandidates,bookExcerpts:aiBooks.slice(0,2)};
  window.dispatchEvent(new CustomEvent('ghazali:identification',{detail:window.ghazaliLastIdentification}));
 } catch(aiError) {}
 var image=$('lp');if(image&&photoUrl){image.src=photoUrl;setMode('done')}
}

var stream=null,busy=false,idAbort=null,idTimer=null;
function lensStop(){if(stream){stream.getTracks().forEach(function(t){t.stop()});stream=null}}
function $(i){return document.getElementById(i)}
function setMode(m){var s=$('lstage');if(!s)return;s.className='lstage '+m;s.setAttribute('aria-busy',String(m==='scan'));s.querySelectorAll('button,input').forEach(function(el){el.disabled=m==='scan'});var hint=$('lhint');if(hint)hint.textContent=gkLensCopy()[m==='nocam'?15:13]}
function lensInit(){
 var s=$('lstage');if(!s)return;setMode('live');
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){setMode('nocam');return}
 navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}).then(function(st){
  if(!$('lv')||busy||view!=='id'){st.getTracks().forEach(function(t){t.stop()});return}
  lensStop();stream=st;var v=$('lv');v.srcObject=st;v.play&&v.play().catch(function(){});setMode('live')
 }).catch(function(){setMode('nocam')})
}
function showPlantnetNote(box,message,status,detail){
 if(!box)return;
 var chat=document.getElementById('ghazali-gemini');
 var tech=detail?' <code dir="ltr">'+esc((detail.name&&detail.name!=='Error'?detail.name+': ':'')+(detail.message||String(detail)))+'</code>':'';
 box.innerHTML='<details class="gkai-results"><summary>'+esc(T2().ai)+'</summary><p>'+esc(message)+tech+'</p></details>';
 if(chat)box.prepend(chat);
 var context=window.ghazaliLastIdentification;
 if(context&&context.run===identificationRun){
  context.plantnetStatus=status;
  window.dispatchEvent(new CustomEvent('ghazali:identification',{detail:context}));
 }
}
function runId(blobP,previewUrl){
 if(accountReady&&!accountSignedIn){go('id');return}
 if(busy)return;window.ghazaliLastIdentification=null;window.dispatchEvent(new CustomEvent('ghazali:identification-reset'));busy=true;lastPayload=null;var request=++identificationRun,requestLang=apiLanguage(appLanguage());
 idAbort=new AbortController();idTimer=setTimeout(function(){if(idAbort)idAbort.abort()},45000);setMode('scan');lensStop();var box=$('idres');if(box)box.innerHTML='<span class="lgrab"></span><div class="idspin">'+esc(T2().run)+'</div>';
 blobP.then(function(blob){
  if(photoUrl)URL.revokeObjectURL(photoUrl);photoUrl=URL.createObjectURL(blob);
  var image=$('lp');if(image)image.src=photoUrl;
  window.ghazaliIdentificationPhoto=photoUrl;
  window.ghazaliLastIdentification={run:request,language:appLanguage(),plantnetStatus:'pending',candidates:[],bookExcerpts:[]};
  window.dispatchEvent(new CustomEvent('ghazali:identification',{detail:window.ghazaliLastIdentification}));
  var data=new FormData();data.append('images',blob,'photo.jpg');data.append('organs',gkLensOrgan);var phase=$('mint-phase');if(phase)phase.textContent=gkLensCopy()[11];
  return fetch('https://my-api.plantnet.org/v2/identify/all?api-key='+encodeURIComponent(KEY)+'&nb-results=5&lang='+encodeURIComponent(requestLang)+'&include-related-images=true',{method:'POST',body:data,signal:idAbort.signal});
 }).then(function(response){
  if(response.status===404)return {results:[]};
  if(!response.ok)return response.text().then(function(t){var m='';try{m=(JSON.parse(t).message||JSON.parse(t).error||'')}catch(e){m=String(t||'').slice(0,80)}throw new Error(response.status+(m?' '+String(m).slice(0,80):'')+' @'+location.host)});return response.json();
 }).then(function(payload){
  if(request!==identificationRun)return;
  lastPayload=payload;lastPayloadLang=requestLang;var current=$('idres');
  if(payload.results&&payload.results.length){paintLast();ensureMetadata(payload,appLanguage())}
  else if(current&&view==='id')showPlantnetNote(current,T2().noplant,'no_match');
 }).catch(function(error){
  if(request!==identificationRun)return;var current=$('idres');if(current&&view==='id')showPlantnetNote(current,T2().err,'error',error);
 }).then(function(){clearTimeout(idTimer);idAbort=null;if(request===identificationRun){busy=false;if(view==='id')setMode('done')}});
}
function grabFrame(){
 var v=$('lv');if(!v||!v.videoWidth)return null;
 var c=document.createElement('canvas'),r=Math.min(1,1280/Math.max(v.videoWidth,v.videoHeight));c.width=Math.round(v.videoWidth*r);c.height=Math.round(v.videoHeight*r);c.getContext('2d').drawImage(v,0,0,c.width,c.height);
 return new Promise(function(res,rej){c.toBlob(function(b){b?res([b,URL.createObjectURL(b)]):rej(new Error('blob'))},'image/jpeg',.85)})
}
document.addEventListener('click',function(e){
 if(e.target.closest('#lshut')){
  if(busy)return;var g=stream&&grabFrame();
  if(g){g.then(function(x){runId(Promise.resolve(x[0]),x[1])})}
  else{var f=$('f');if(f)f.click()}
 }else if(e.target.closest('#lretake')){
  if(busy)return;window.ghazaliLastIdentification=null;window.dispatchEvent(new CustomEvent('ghazali:identification-reset'));lastPayload=null;if(photoUrl){URL.revokeObjectURL(photoUrl);photoUrl=''}var b=$('idres');if(b)b.innerHTML='<span class="lgrab"></span><div class="idn">'+gkLensCopy()[16]+'</div>';lensInit()
 }
});
window.pv=pv=function(el){
 var file=el.files&&el.files[0];if(!file)return;el.value='';
 var bytes=file.arrayBuffer?file.arrayBuffer():Promise.reject(new Error('no arrayBuffer'));
 var url=null;
 runId(bytes.then(function(buf){return shrink(new Blob([buf],{type:file.type||'image/jpeg'}))},function(){throw new Error('unreadable file (choose another photo or take a new one)')}),url);
};
var _r=window.render;
window.render=function(){var x=_r.apply(this,arguments);try{
 if(typeof view!=='undefined'&&view==='id'){
  if(lastPayload){paintLast();ensureMetadata(lastPayload,appLanguage())}
  else if(busy){setMode('scan');var box=$('idres');if(box)box.innerHTML='<span class="lgrab"></span><div class="idspin">'+esc(T2().run)+'</div>'}
  else if(!window.ghazaliLastIdentification)setTimeout(lensInit,30);
  if(window.ghazaliLastIdentification)window.dispatchEvent(new CustomEvent('ghazali:identification',{detail:window.ghazaliLastIdentification}));
 }else lensStop();
 }catch(e){}return x};
})();

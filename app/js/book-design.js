/* ===== Ghazali book-style plant page: replaces the detail layout for all plants ===== */
(function(){
"use strict";
if(window.__gkBook)return;window.__gkBook=1;

var BK={
 ps:{chartT:"د کیمیاوي اجزاوو چارټ",chartS:"د مهمو فعالو مرکباتو اټکلي سلنه",chartH:"پر هر جز کلیک وکړئ",role:"فارماکولوژيکي رول",share:"٪ برخه",booklet:"د بوټي کتابچه",badge:"طبي مفردات",code:"کوډ",other:"نور نومونه",otherSub:"په بېلابېلو ژبو",
  ords:["لومړی فصل","دویم فصل","درېیم فصل","څلورم فصل","پنځم فصل"],
  c1:["پېژندنه","پېژندنه، ماهیت او د پیدا کېدو ځایونه"],c2:["مزاج او مقدار","طبي مزاج، مصلح، بدل او د خوراک مقدار"],
  c3:["دودیز استعمال","دودیز او تاریخي استعمال"],c4:["کیمیاوي اجزا","کیمیاوي اجزا او مرکبات"],c5:["احتیاط","احتیاطي تدابیر او خبرداری"],
  refs:["سرچینې","پاورقي او علمي سرچینې"],intro2:"د دودیز طب (حکمت) د اصولو پر بنسټ د بوټي طبیعي ځانګړنې او د کارونې کچه په لاندې جدول کې ترتیب شوې ده:",
  chemSub:"د کتاب له مخې ثبت شوي اجزا",warn:"مهم طبي خبرداری او منع استعمال",pro:"مسلکي مشوره",
  fm:"الف-",fp:"الف+",size:"د متن اندازه: ",min:"دا تر ټولو کوچنۍ اندازه ده",max:"دا تر ټولو لویه اندازه ده",
  night:"د شپې تیاره پاڼه فعاله شوه",day:"د ورځې کاغذي پاڼه فعاله شوه",favOn:"په خوښ شویو کې خوندي شو",favOff:"له خوښ شویو څخه لرې شو",
  aBack:"شاته",aSm:"متن کوچنی کول",aLg:"متن لوی کول",aTheme:"د ورځې او شپې پاڼه",aFav:"خوښول",aShare:"شریکول",aNav:"د فصلونو فهرست"},
 fa:{chartT:"نمودار اجزای کیمیایی",chartS:"درصد تقریبی ترکیبات فعال مهم",chartH:"روی هر جزء بزنید",role:"نقش دارویی",share:"٪ سهم",booklet:"کتابچهٔ گیاه",badge:"مفردات طبی",code:"کد",other:"نام‌های دیگر",otherSub:"به زبان‌های مختلف",
  ords:["فصل اول","فصل دوم","فصل سوم","فصل چهارم","فصل پنجم"],
  c1:["شناخت","شناخت، ماهیت و محل پیدایش"],c2:["مزاج و مقدار","مزاج طبی، مصلح، بدل و مقدار مصرف"],
  c3:["کاربرد سنتی","کاربرد سنتی و تاریخی"],c4:["اجزای کیمیایی","اجزای کیمیایی و ترکیبات"],c5:["احتیاط","تدابیر احتیاطی و هشدار"],
  refs:["منابع","پاورقی و منابع علمی"],intro2:"بر پایهٔ اصول طب سنتی (حکمت)، ویژگی‌های طبیعی و مقدار مصرف در جدول زیر آمده است:",
  chemSub:"اجزای ثبت‌شده در کتاب",warn:"هشدار مهم پزشکی و منع مصرف",pro:"مشورت تخصصی",
  fm:"الف-",fp:"الف+",size:"اندازهٔ متن: ",min:"این کوچک‌ترین اندازه است",max:"این بزرگ‌ترین اندازه است",
  night:"صفحهٔ شبانه فعال شد",day:"صفحهٔ روز فعال شد",favOn:"به علاقه‌مندی‌ها افزوده شد",favOff:"از علاقه‌مندی‌ها حذف شد",
  aBack:"بازگشت",aSm:"کوچک‌کردن متن",aLg:"بزرگ‌کردن متن",aTheme:"صفحهٔ روز و شب",aFav:"علاقه‌مندی",aShare:"اشتراک",aNav:"فهرست فصل‌ها"},
 ur:{chartT:"کیمیائی اجزا کا چارٹ",chartS:"اہم فعال مرکبات کا تخمینی فیصد",chartH:"کسی بھی جز پر کلک کریں",role:"دوائی کردار",share:"٪ حصہ",booklet:"پودے کا کتابچہ",badge:"طبی مفردات",code:"کوڈ",other:"دیگر نام",otherSub:"مختلف زبانوں میں",
  ords:["پہلا باب","دوسرا باب","تیسرا باب","چوتھا باب","پانچواں باب"],
  c1:["تعارف","تعارف، ماہیت اور مقام پیدائش"],c2:["مزاج اور مقدار","طبی مزاج، مصلح، بدل اور مقدار خوراک"],
  c3:["روایتی استعمال","روایتی اور تاریخی استعمال"],c4:["کیمیائی اجزا","کیمیائی اجزا اور مرکبات"],c5:["احتیاط","احتیاطی تدابیر اور انتباہ"],
  refs:["ماخذ","حواشی اور علمی ماخذ"],intro2:"روایتی طب (حکمت) کے اصولوں کے مطابق قدرتی خصوصیات اور مقدارِ استعمال نیچے دی گئی ہیں:",
  chemSub:"کتاب میں درج اجزا",warn:"اہم طبی انتباہ اور ممانعت",pro:"ماہرانہ مشورہ",
  fm:"الف-",fp:"الف+",size:"متن کا سائز: ",min:"یہ سب سے چھوٹا سائز ہے",max:"یہ سب سے بڑا سائز ہے",
  night:"رات کا صفحہ فعال ہوا",day:"دن کا صفحہ فعال ہوا",favOn:"پسندیدہ میں محفوظ ہوا",favOff:"پسندیدہ سے ہٹا دیا گیا",
  aBack:"واپس",aSm:"متن چھوٹا کریں",aLg:"متن بڑا کریں",aTheme:"دن اور رات کا صفحہ",aFav:"پسندیدہ",aShare:"شیئر",aNav:"ابواب کی فہرست"},
 en:{chartT:"Constituents chart",chartS:"Approximate share of key active compounds",chartH:"Tap a constituent",role:"Pharmacological role",share:"% share",booklet:"Plant booklet",badge:"Medicinal simples",code:"Code",other:"Other names",otherSub:"In different languages",
  ords:["Chapter 1","Chapter 2","Chapter 3","Chapter 4","Chapter 5"],
  c1:["Overview","Identity, nature and where it grows"],c2:["Temperament & dose","Temperament, corrective, substitute and dose"],
  c3:["Traditional use","Traditional and historical use"],c4:["Constituents","Chemical constituents and preparations"],c5:["Cautions","Precautions and warnings"],
  refs:["Sources","Footnotes and sources"],intro2:"Following the principles of traditional medicine (hikmat), the natural properties and dose are set out below:",
  chemSub:"As recorded in the source book",warn:"Important medical warning",pro:"Professional advice",
  fm:"A-",fp:"A+",size:"Text size: ",min:"This is the smallest size",max:"This is the largest size",
  night:"Night page on",day:"Day page on",favOn:"Saved to favourites",favOff:"Removed from favourites",
  aBack:"Back",aSm:"Smaller text",aLg:"Larger text",aTheme:"Day / night page",aFav:"Favourite",aShare:"Share",aNav:"Chapter index"}
};
function X(){return BK[lang]||BK.ps}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}return null}
function fonts(){
 if(document.getElementById("bk-fonts"))return;
 var l=document.createElement("link");l.id="bk-fonts";l.rel="stylesheet";
 l.href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700&display=swap";
 document.head.appendChild(l);
}

/* ---------- builders ---------- */
function paras(items,dir){return items&&items.length?detailParagraphs(items,dir):""}
function lead(label,html){
 if(!html)return "";
 var m=/^<p([^>]*)>/.exec(html);
 if(m)html=html.replace(/^<p([^>]*)>/,"<p$1><strong>"+esc(label)+":</strong> ");
 else html="<p><strong>"+esc(label)+":</strong></p>"+html;
 return "<li>"+html+"</li>";
}
function rowVal(items){
 var out=[],cs=null;
 items.forEach(function(it){
  var sub=it.subtitle||"",txt=esc(String(it.text||"").trim());
  if(sub&&sub!==cs)out.push('<span class="bk-sub">'+esc(sub)+':</span> '+txt);
  else if(out.length)out[out.length-1]+=" "+txt;
  else out.push(txt);
  cs=sub;
 });
 return out.join("<br>");
}
function plate(sci,name){
 var s=sci?'<text x="400" y="458" text-anchor="middle" fill="#1C221F" opacity=".7" font-size="20" font-style="italic" font-family="Georgia,serif">'+esc(sci)+'</text>':"";
 return '<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+esc(name)+'" preserveAspectRatio="xMidYMid slice">'+
 '<defs><linearGradient id="bkPlateBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ECE6D6"/><stop offset="100%" stop-color="#DDD4C0"/></linearGradient></defs>'+
 '<rect width="800" height="500" fill="url(#bkPlateBg)"/>'+
 '<rect x="16" y="16" width="768" height="468" fill="none" stroke="#164A33" stroke-width="2" opacity=".35"/>'+
 '<rect x="23" y="23" width="754" height="454" fill="none" stroke="#164A33" stroke-width="1" opacity=".2"/>'+
 '<path d="M180 410 Q 400 396 620 410" stroke="#164A33" stroke-width="2.5" fill="none" opacity=".45"/>'+
 '<path d="M400 408 C 394 330 406 240 400 128" stroke="#164A33" stroke-width="5" fill="none" stroke-linecap="round"/>'+
 '<ellipse cx="352" cy="340" rx="62" ry="19" transform="rotate(-32 352 340)" fill="#23573D"/>'+
 '<ellipse cx="450" cy="318" rx="62" ry="19" transform="rotate(32 450 318)" fill="#2E6B4C"/>'+
 '<ellipse cx="346" cy="268" rx="58" ry="18" transform="rotate(-38 346 268)" fill="#1B4631"/>'+
 '<ellipse cx="456" cy="248" rx="58" ry="18" transform="rotate(38 456 248)" fill="#23573D"/>'+
 '<ellipse cx="358" cy="196" rx="52" ry="16" transform="rotate(-36 358 196)" fill="#2E6B4C"/>'+
 '<ellipse cx="446" cy="180" rx="52" ry="16" transform="rotate(36 446 180)" fill="#1B4631"/>'+
 '<ellipse cx="400" cy="124" rx="40" ry="15" transform="rotate(-90 400 124)" fill="#3B7E5C" opacity=".9"/>'+
 '<circle cx="318" cy="300" r="9" fill="#B5882A"/><circle cx="488" cy="282" r="9" fill="#B5882A"/><circle cx="402" cy="362" r="8" fill="#B5882A"/>'+
 s+'</svg>';
}
var IC={
 back:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 5l7 7-7 7"/>',
 moon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>',
 sun:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>',
 heart:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
 share:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>',
 warn:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>'
};
function svg(k,cls){return '<svg'+(cls?' class="'+cls+'"':'')+' fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">'+IC[k]+'</svg>'}
function divider(){return '<div class="bk-div" aria-hidden="true"><span></span><span class="bk-orn">❖</span><span></span></div>'}


function nd(s){return lang==="en"?String(s):String(s).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[d]})}
function parseChart(items){
 var out=[];
 (items||[]).forEach(function(it){
  String(it&&it.text!==undefined?it.text:it||"").split(/\n/).forEach(function(line){
   var p=line.split("|").map(function(s){return s.trim()});
   if(p.length<2||!p[0])return;
   var d=p[1].replace(/[۰-۹]/g,function(c){return c.charCodeAt(0)-1776}).replace(/[٠-٩]/g,function(c){return c.charCodeAt(0)-1632}).replace(/[٫,]/g,".");
   var m=/(\d+(?:\.\d+)?)/.exec(d);if(!m)return;
   var v=parseFloat(m[1]);if(!(v>=0))return;if(v>100)v=100;
   out.push({n:p[0],v:v,d:p.slice(2).join(" | ").trim()});
  });
 });
 return out.slice(0,12);
}
function chemBox(r,x){
 return '<div class="bk-ctop2"><span class="bk-ct">'+esc(r.n)+' — '+esc(x.role)+'</span><span class="bk-cs">'+esc(nd(r.v)+x.share)+'</span></div><p class="bk-cd"'+(r.d?'':' hidden')+'>'+esc(r.d)+'</p>';
}
function chartHtml(rows,x){
 var h='<div class="bk-card bk-chart"><div class="bk-card-head bk-chart-head"><div><h3>'+esc(x.chartT)+'</h3><p>'+esc(x.chartS)+'</p></div><span class="bk-hint">'+esc(x.chartH)+'</span></div><div class="bk-bars">';
 rows.forEach(function(r,i){
  h+='<button type="button" class="bk-crow'+(i===0?" on":"")+'" data-n="'+esc(r.n)+'" data-v="'+r.v+'" data-d="'+esc(r.d)+'" onclick="bkChem(this)"><div class="bk-ctop"><span>'+esc(r.n)+'</span><b dir="ltr">~'+r.v+'%</b></div><div class="bk-ctrack"><i class="c'+(i%4)+'" style="width:'+r.v+'%"></i></div></button>';
 });
 return h+'</div><div class="bk-cbox" id="bk-cbox">'+chemBox(rows[0],x)+'</div></div>';
}

var SEED={"T036": {"ps": "ګوند | 20 | د کتاب چاپي سلنه\nرال | 70 | د کتاب چاپي سلنه\nفرار غوړي | 4 | د کتاب چاپي سلنه\nنور مواد | 6 | د کتاب چاپي سلنه", "fa": "صمغ | 20 | درصد چاپ‌شده در کتاب\nرزین | 70 | درصد چاپ‌شده در کتاب\nروغن‌های فرار | 4 | درصد چاپ‌شده در کتاب\nسایر مواد | 6 | درصد چاپ‌شده در کتاب", "ur": "گوند | 20 | کتاب میں چھپا ہوا فیصد\nرال | 70 | کتاب میں چھپا ہوا فیصد\nفرار تیل | 4 | کتاب میں چھپا ہوا فیصد\nدیگر مواد | 6 | کتاب میں چھپا ہوا فیصد", "en": "Gum | 20 | Percentage printed in the book\nResin | 70 | Percentage printed in the book\nVolatile oil | 4 | Percentage printed in the book\nOther material | 6 | Percentage printed in the book"}, "T039": {"ps": "فرار غوړي (Absinthol) | 1.5 | د کتاب چاپي شمېره؛ د هرې نمونې ثابت ترکیب نه دئ.\nتریخ جوهر (Absinthin) | 0.5 | د کتاب چاپي شمېره؛ د هرې نمونې ثابت ترکیب نه دئ.\nرال | 5 | د کتاب چاپي شمېره؛ د هرې نمونې ثابت ترکیب نه دئ.", "fa": "روغن فرار (Absinthol) | 1.5 | عدد چاپ‌شده در کتاب؛ ترکیب ثابت هر نمونه نیست.\nجوهر تلخ (Absinthin) | 0.5 | عدد چاپ‌شده در کتاب؛ ترکیب ثابت هر نمونه نیست.\nرزین | 5 | عدد چاپ‌شده در کتاب؛ ترکیب ثابت هر نمونه نیست.", "ur": "فرار تیل (Absinthol) | 1.5 | کتاب میں چھپا عدد؛ ہر نمونے کی مستقل ترکیب نہیں۔\nتلخ جوہر (Absinthin) | 0.5 | کتاب میں چھپا عدد؛ ہر نمونے کی مستقل ترکیب نہیں۔\nرال | 5 | کتاب میں چھپا عدد؛ ہر نمونے کی مستقل ترکیب نہیں۔", "en": "Volatile oil (Absinthol) | 1.5 | Figure printed in the book; not a fixed composition of every sample.\nBitter principle (Absinthin) | 0.5 | Figure printed in the book; not a fixed composition of every sample.\nResin | 5 | Figure printed in the book; not a fixed composition of every sample."}, "T024": {"ps": "ټېنین | 15 | د کتاب چاپي سلنه\nکلسیم کاربونېټ | 3 | د کتاب چاپي سلنه", "fa": "تانن | 15 | درصد چاپ‌شده در کتاب\nکربنات کلسیم | 3 | درصد چاپ‌شده در کتاب", "ur": "ٹینن | 15 | کتاب میں چھپا ہوا فیصد\nکیلشیم کاربونیٹ | 3 | کتاب میں چھپا ہوا فیصد", "en": "Tannin | 15 | Percentage printed in the book\nCalcium carbonate | 3 | Percentage printed in the book"}, "T005": {"ps": "کاربوهایډرېټ | 12 | د ۱۰۰ ګرامو لپاره د کتاب چاپي سلنه.\nپروټین | 5 | د ۱۰۰ ګرامو لپاره د کتاب چاپي سلنه.", "fa": "کربوهیدرات | 12 | درصد چاپ‌شده در کتاب برای ۱۰۰ گرم.\nپروتئین | 5 | درصد چاپ‌شده در کتاب برای ۱۰۰ گرم.", "ur": "کاربوہائیڈریٹ | 12 | ۱۰۰ گرام کے لیے کتاب میں چھپا فیصد۔\nپروٹین | 5 | ۱۰۰ گرام کے لیے کتاب میں چھپا فیصد۔", "en": "Carbohydrate | 12 | Percentage printed in the book, per 100 g.\nProtein | 5 | Percentage printed in the book, per 100 g."}};
const MODERN_FIELDS={"chem_profile":["د کیمیاوي اجزاوو چارټ","نمودار اجزای کیمیایی","کیمیائی اجزا کا چارٹ","Chemical composition chart"],"molecular_formulas":["مالیکولي فورمولونه","فرمول‌های مولکولی","سالماتی فارمولے","Molecular formulae"],"chem_reactions":["کیمیاوي تعاملات","واکنش‌های کیمیایی","کیمیائی تعاملات","Chemical reactions"],"mhy":["نباتي پېژندنه","شناخت گیاه‌شناسی","نباتاتی شناخت","Botanical description"],"origin":["جغرافیایي خپرېدنه","پراکندگی جغرافیایی","جغرافیائی پھیلاؤ","Geographical distribution"],"part":["کارېدونکې برخه","بخش مورد استفاده","مستعمل حصہ","Medicinal part"],"macro":["ظاهري ځانګړتیاوي","ویژگی‌های ظاهری","ظاہری خصوصیات","Macroscopic characteristics"],"micro":["مایکروسکوپي ځانګړتیاوي","ویژگی‌های میکروسکوپی","خوردبینی خصوصیات","Microscopic characteristics"],"chem":["کیمیاوي اجزا","اجزای کیمیایی","کیمیائی اجزا","Chemical constituents"],"pharmacology":["فارماکولوژیکي اغېزې","اثرات فارماکولوژیک","فارماکولوجیکل اثرات","Pharmacological effects"],"clinical":["کلینیکي شواهد","شواهد بالینی","طبی تحقیقی شواہد","Clinical evidence"],"use":["طبي استعمالونه","کاربردهای درمانی","طبی استعمالات","Medicinal indications"],"dose":["د خوراک مقدار او طریقه","مقدار و روش مصرف","مقدار اور طریقۂ استعمال","Dosage and administration"],"mzr":["جانبي عوارض","عوارض جانبی","ضمنی اثرات","Adverse effects"],"contraindications":["د استعمال ممانعتونه","موارد منع مصرف","ممانعتِ استعمال","Contraindications"],"interactions":["له درملو سره تعاملات","تداخلات دارویی","دواؤں کے ساتھ تعاملات","Drug interactions"],"safety":["احتیاطي تدابیر","احتیاط‌ها","احتیاطی تدابیر","Precautions"],"quality":["کیفیت او خالصوالی","کیفیت و خلوص","معیار اور خالص پن","Quality and purity"],"storage":["ساتنه","نگهداری","ذخیرہ کرنے کا طریقہ","Storage"],"refs":["علمي سرچینې","منابع علمی","علمی ماخذ","Scientific references"]},MODERN_GROUPS=[[["نباتي پېژندنه او تشخیص","شناخت و تشخیص گیاه","نباتاتی شناخت و تشخیص","Botanical identification"],["mhy","origin","part","macro","micro"]],[["کیمیا او فارماکولوژي","کیمیا و فارماکولوژی","کیمیا اور فارماکولوجی","Chemistry and pharmacology"],["chem","chem_profile","molecular_formulas","chem_reactions","pharmacology","clinical"]],[["طبي استعمال او خوراک","کاربرد و مقدار مصرف","طبی استعمال اور خوراک","Indications and dosage"],["use","dose"]],[["خوندیتوب","ایمنی","حفاظت","Safety"],["mzr","contraindications","interactions","safety"]],[["کیفیت او ساتنه","کیفیت و نگهداری","معیار اور ذخیرہ","Quality and storage"],["quality","storage"]],[["علمي سرچینې","منابع علمی","علمی ماخذ","Scientific references"],["refs"]]],MODERN_CORE=["mhy","part","use","mzr","refs"],MODERN_SOFT=["origin","macro","micro","chem","chem_profile","molecular_formulas","chem_reactions","pharmacology","clinical","dose","contraindications","interactions","safety","quality","storage"];

/* Modern-only composition profile; ranges are not pie-chart shares. */
function modernChemRows(items){
 return (items||[]).flatMap(function(block){return String(block.text||'').split(/\n/)}).map(function(line){
  var p=line.split('|').map(function(x){return x.trim()});
  if(p.length<2||!p[0])return null;
  if(p.length===4&&/^(?:\d+(?:\.\d+)?(?:\s*[-–—]\s*\d+(?:\.\d+)?)?%?)?$/.test(p[1]))p.splice(1,0,'');
  var amount=(p[2]||'').replace(/%/g,'').replace(/[–—]/g,'-').trim();
  var m=/^(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?$/.exec(amount);
  var lo=m?+m[1]:null,hi=m?+(m[2]||m[1]):null;
  if(!p[3]||!p[4]||lo===null||lo<0||hi>100||hi<lo){lo=null;hi=null;}
  return {name:p[0],formula:p[1],lo:lo,hi:hi,scope:p[3]||'',source:p[4]||''};
 }).filter(Boolean).slice(0,40);
}
function modernFormula(v){return esc(v).replace(/\d+/g,function(n){return '<sub>'+n+'</sub>'});}
function modernChemHtml(items,ml){
 var rows=modernChemRows(items);if(!rows.length)return '';
 var labels=[['مستندي سلنې یوازې د ښودل سوې نمونې لپاره دي.','درصدهای مستند فقط مربوط به نمونه مشخص‌شده‌اند.','مستند فیصد صرف درج کردہ نمونے کے لیے ہیں۔','Documented composition values refer only to the specified sample.'],['سرچینه','منبع','ماخذ','Source']];
 return '<div class="md-chem-grid">'+rows.map(function(r){
  var valid=r.lo!==null,range=valid?(r.lo===r.hi?r.lo+'%':r.lo+'–'+r.hi+'%'):'';
  var source=/^https:\/\/[a-z0-9.-]+(?:[/?#][^\s]*)?$/i.test(r.source)?'<a href="'+esc(r.source)+'" target="_blank" rel="noopener noreferrer">'+esc(labels[1][ml])+'</a>':esc(r.source);
  return '<article class="md-compound"><div class="md-compound-head"><strong dir="auto">'+esc(r.name)+'</strong></div>'+
   (r.scope?'<p class="md-scope">'+esc(r.scope)+'</p>':'')+
   (valid?'<div class="md-range" dir="ltr"><b>'+range+'</b><div class="md-track" role="img" aria-label="'+range+'"><i style="left:'+r.lo+'%;width:'+Math.max(r.hi-r.lo,0.5)+'%"></i></div><div class="md-scale"><span>0%</span><span>100%</span></div></div>':'')+
   (!valid?'<p class="md-note">'+esc(['مستنده سلنه نسته','درصد مستند موجود نیست','مستند فیصد دستیاب نہیں','Documented percentage unavailable'][ml])+'</p>':'')+(source?'<p class="md-source">'+source+'</p>':'')+'</article>';
 }).join('')+'</div><p class="md-note">'+esc(labels[0][ml])+'</p>';
}

function modernMolecules(items,legacy,ml){
 var rows=(items||[]).flatMap(function(b){return String(b.text||'').split(/\n/)}).map(function(line){
  var p=line.split('|').map(function(s){return s.trim()});
  return p[0]&&p[1]?{name:p[0],formula:p[1],source:p[2]||''}:null;
 }).filter(Boolean);
 modernChemRows(legacy).forEach(function(r){if(r.formula&&!rows.some(function(x){return x.name.toLowerCase()===r.name.toLowerCase()&&x.formula===r.formula}))rows.push(r)});
 if(!rows.length)return paras(items,ml===3?'ltr':'rtl');
 return '<div class="md-chem-grid">'+rows.map(function(r){
  return '<article class="md-compound"><div class="md-compound-head"><strong dir="auto">'+esc(r.name)+'</strong><span class="md-formula" dir="ltr">'+modernFormula(r.formula)+'</span></div>'+(r.source?'<p class="md-source">'+esc(r.source)+'</p>':'')+'</article>';
 }).join('')+'</div>';
}
var MD_ICONS={
 leaf:'<path d="M20 4C9 3 3 9 5 15s12 5 15-11ZM4 20l10-10"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
 microscope:'<path d="M6 21h14M10 21v-4m-4-5 4 4h5a5 5 0 0 0 0-10M8 3l5 5-4 4-5-5Z"/>',
 flask:'<path d="M9 3h6m-5 0v7L4 19q-1 2 2 2h12q3 0 2-2l-6-9V3M7 15h10"/>',
 chart:'<path d="M3 3v18h18M7 17v-5m5 5V6m5 11v-8"/>',
 molecule:'<circle cx="12" cy="12" r="3"/><circle cx="4" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="12" cy="21" r="2"/><path d="m6 7 4 3m8-3-4 3m-2 5v4"/>',
 arrows:'<path d="M3 7h17l-4-4m4 14H3l4 4M20 7l-4 4M3 17l4-4"/>',
 pulse:'<path d="M3 12h4l3-7 4 14 3-7h4"/>',
 clipboard:'<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5V3h6v2M8 13l3 3 5-6"/>',
 pill:'<path d="M5 19a5 5 0 0 1 0-7l7-7a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7 0ZM9 8l7 7"/>',
 warning:'<path d="M12 3 2 21h20L12 3Zm0 6v5m0 3v1"/>',
 ban:'<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>',
 shield:'<path d="M12 3 4 6v6c0 5 4 8 8 10 4-2 8-5 8-10V6l-8-3Zm-4 9 3 3 5-6"/>',
 box:'<path d="m3 7 9-4 9 4v10l-9 4-9-4V7Zm0 0 9 4 9-4m-9 4v10"/>',
 book:'<path d="M12 6c-3-3-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15"/>'
};
var MD_FIELD_ICONS={mhy:'leaf',origin:'globe',part:'leaf',macro:'eye',micro:'microscope',chem:'flask',chem_profile:'chart',molecular_formulas:'molecule',chem_reactions:'arrows',pharmacology:'pulse',clinical:'clipboard',use:'pill',dose:'pill',mzr:'warning',contraindications:'ban',interactions:'arrows',safety:'shield',quality:'clipboard',storage:'box',refs:'book'};
function mdIcon(k){return '<svg class="md-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(MD_ICONS[MD_FIELD_ICONS[k]||k]||MD_ICONS.book)+'</svg>';}

function build(plant){
 var rec=wordDetailLayout.records[plant.taj[0]],F=rec.fields[lang]||rec.fields.ps||{},dir=lang==="en"?"ltr":"rtl",
  LB=wordDetailLayout.labels[lang]||wordDetailLayout.labels.ps,MT=wordDetailLayout.meta[lang]||wordDetailLayout.meta.ps,x=X();
 var has=function(k){return F[k]&&F[k].length};
 var modern=/^MD\d{4,}$/.test(plant.taj[0]), ml=['ps','fa','ur','en'].indexOf(lang);
 var nameRows=[];try{nameRows=gkEntryNameRows(rec.names[lang]||rec.names.ps||[],lang)}catch(e){}

 /* lean output used only for full-text search indexing */
 if(window.__bkLean){
  return '<div>'+nameRows.map(function(r){return '<p>'+esc(r[0])+" "+esc(r[1])+'</p>'}).join("")+
   Object.keys(F).map(function(k){return '<div data-field="'+k+'"><h3>'+esc((modern&&MODERN_FIELDS[k]?MODERN_FIELDS[k][ml]:LB[k])||k)+'</h3>'+paras(F[k],dir)+'</div>'}).join("")+'</div>';
 }

 var idx=H.indexOf(plant),isFav=idx>-1&&fav.indexOf(idx)>-1;
 var name=herbDisplay(plant),sci=rec.scientific||"",fam=rec.family||"";
 var chapters=[];

 if(modern){
  MODERN_GROUPS.forEach(function(g,i){
   var cards=g[1].map(function(k){
    var content=k==='chem_profile'?modernChemHtml(F[k],ml):k==='molecular_formulas'?modernMolecules(F[k],F.chem_profile,ml):paras(F[k],dir);
    if(!content&&(k==='molecular_formulas'||k==='chem_profile')){
     var empty=k==='molecular_formulas'?['مالیکولي فورمولونه لا نه دي ثبت سوي.','فرمول‌های مولکولی هنوز ثبت نشده‌اند.','سالماتی فارمولے ابھی درج نہیں ہوئے۔','Molecular formulae have not yet been recorded.']:['د کیمیاوي اجزاوو مستند معلومات لا نه دي ثبت سوي.','اطلاعات مستند اجزای کیمیایی هنوز ثبت نشده‌اند.','کیمیائی اجزا کی مستند معلومات ابھی درج نہیں ہوئیں۔','Documented chemical composition has not yet been recorded.'];
     content='<div class="md-compound"><p class="md-note" role="status">'+esc(empty[ml])+'</p></div>';
    }
    if(!content)return '';
    return '<article class="md-field md-field-'+k+'" data-field="'+k+'"><h3>'+mdIcon(k)+esc(MODERN_FIELDS[k][ml])+'</h3><div class="md-field-body">'+content+'</div></article>';
   }).join('');
   if(i===3){cards+='<article class="md-field md-warning"><h3>'+mdIcon('warning')+esc(x.pro)+'</h3><p>'+esc(t().disc)+'</p></article>';}
   if(cards)chapters.push({id:'bk-c'+(i+1),icon:['leaf','flask','pill','shield','box','book'][i],t:[g[0][ml],g[0][ml]],html:'<div class="md-fields">'+cards+'</div>'});
  });
 }else{
 /* chapter 1: identity / origin */
 (function(){
  var body=paras(F.mhy,dir);if(body)body=body.replace("<p ",'<p class="bk-dropcap" ');
  var li="";
  li+=lead(LB.origin,paras(F.origin,dir));
  li+=lead(LB.color,paras(F.color,dir));
  var idn=rec.identity_note&&rec.identity_note[lang];
  var sn=(idn?"<p>"+esc(idn)+"</p>":"")+paras(F.source_note,dir);
  li+=lead(LB.source_note,sn);
  var h=(body?'<div class="bk-ed">'+body+'</div>':"")+(li?'<ul class="bk-list bk-ed">'+li+'</ul>':"");
  if(h)chapters.push({id:"bk-c1",t:x.c1,html:h});
 })();

 /* chapter 2: temperament, corrective, substitute, dose */
 (function(){
  var rows="";
  ["mzj","msl","bdl","dose"].forEach(function(k){
   if(has(k))rows+='<div class="bk-row" data-field="'+k+'"><span class="bk-k">'+esc(LB[k])+'</span><span class="bk-v">'+rowVal(F[k])+'</span></div>';
  });
  if(rows)chapters.push({id:"bk-c2",t:x.c2,html:'<p class="bk-ed bk-muted">'+esc(x.intro2)+'</p><div class="bk-rows">'+rows+'</div>'});
 })();

 /* chapter 3: traditional use */
 (function(){
  var li="";
  ["khs","benefit","use","experience","history","notes"].forEach(function(k){li+=lead(LB[k],paras(F[k],dir))});
  if(li)chapters.push({id:"bk-c3",t:x.c3,html:'<ul class="bk-list bk-ed">'+li+'</ul>'});
 })();

 /* chapter 4: chemistry and preparations */
 (function(){
  var chem="",table=(rec.tables&&rec.tables[lang])||null;
  if(has("chem")||table){
   chem=(rec.chemistry_science&&rec.chemistry_science[lang])?detailChemistry(rec):paras(F.chem,dir);
   if(table)chem+='<h4>'+esc(table.title)+'</h4><p class="bk-note">'+esc(table.note)+'</p><div class="bk-tbl-wrap"><table class="bk-tbl"><tbody>'+
    table.rows.map(function(r){return '<tr><th scope="row">'+esc(r[0])+'</th><td dir="ltr">'+esc(r[1])+'</td></tr>'}).join("")+'</tbody></table></div>';
  }
  var h="",rows=parseChart(F.chart);
  if(!rows.length&&SEED[plant.taj[0]]&&SEED[plant.taj[0]][lang])rows=parseChart([{text:SEED[plant.taj[0]][lang]}]);
  if(rows.length)h+=chartHtml(rows,x);
  /* The legacy chem text remains in stored records, but the chart is the sole visible chemistry card. */
  var comp=lead(LB.compounds,paras(F.compounds,dir));
  if(comp)h+='<ul class="bk-list bk-ed">'+comp+'</ul>';
  if(h)chapters.push({id:"bk-c4",t:x.c4,html:h});
 })();

 /* chapter 5: cautions (always present, carries the general disclaimer) */
 (function(){
  var li="";
  ["mzr","poison_signs","poison_treatment","excretion","safety"].forEach(function(k){li+=lead(LB[k],paras(F[k],dir))});
  li+="<li><p><strong>"+esc(x.pro)+":</strong> "+esc(t().disc)+"</p></li>";
  chapters.push({id:"bk-c5",t:x.c5,html:'<div class="bk-warn"><div class="bk-warn-h">'+svg("warn")+'<span>'+esc(x.warn)+'</span></div><ul class="bk-list">'+li+'</ul></div>'});
 })();

 }
 /* names + photos */
 var names='<section id="bk-names" class="bk-names" data-bk-sec="1"><div class="bk-names-head"><h3 class="bk-serif">'+esc(x.other)+'</h3><span>'+esc(x.otherSub)+'</span></div>'+
  (nameRows.length?'<div class="bk-grid">'+nameRows.map(function(r){return '<div class="bk-cell"><small>'+esc(r[0])+'</small><strong dir="auto">'+esc(r[1])+'</strong></div>'}).join("")+'</div>'
   :'<p class="bk-note">'+esc(MT.absent)+'</p>')+
  (rec.name_notes&&rec.name_notes[lang]?'<p class="bk-note">'+esc(rec.name_notes[lang])+'</p>':"")+'</section>';

 var hasPhoto=false;
 try{var ph=window.HERB_PHOTOS&&window.HERB_PHOTOS[plant.taj[0]];hasPhoto=!!(ph&&PH_KEYS.some(function(k){return ph[k]}))}catch(e){}
 var fig=hasPhoto?'<div class="bk-photos">'+stagePhotoSlots()+'</div>'
  :'<figure class="bk-plate"><div class="bk-svgbox">'+plate(sci,name)+'</div><figcaption><span>'+esc((typeof PH_SOON!=="undefined"&&PH_SOON[lang])||"")+'</span>'+(sci?'<em>'+esc(sci)+'</em>':'')+'</figcaption></figure>';

 /* references */
 var refs="";try{refs=librarySource(plant).replace(/<h3>.*?<\/h3>/,"")}catch(e){}
 try{if(plant.link)refs+='<p><a href="'+esc(plant.link)+'" target="_blank" rel="noopener noreferrer">'+esc((typeof GK_ENTRY_VERIFY_LABEL!=="undefined"&&GK_ENTRY_VERIFY_LABEL[lang])||plant.link)+'</a></p>'}catch(e){}
 var refsHtml='<footer id="bk-refs" class="bk-refs" data-bk-sec="1"><h3 class="bk-serif">'+esc(x.refs[1])+'</h3>'+refs+'</footer>';

 /* nav chips */
 var chips='<button type="button" class="bk-chip on" data-t="bk-names" onclick="bkJump(\'bk-names\')">'+esc(x.other)+'</button>';
 chapters.forEach(function(c){chips+='<button type="button" class="bk-chip" data-t="'+c.id+'" onclick="bkJump(\''+c.id+'\')">'+esc(c.t[0])+'</button>'});
 chips+='<button type="button" class="bk-chip" data-t="bk-refs" onclick="bkJump(\'bk-refs\')">'+esc(x.refs[0])+'</button>';

 var secs=chapters.map(function(c,i){
  return '<section id="'+c.id+'" class="bk-sec" data-bk-sec="1"><div class="bk-sec-head"><small>'+esc(modern?String(i+1).padStart(2,'0'):x.ords[i]||"")+'</small><h2 class="bk-serif">'+(modern?mdIcon(c.icon):'')+esc(c.t[1])+'</h2></div>'+c.html+'</section>';
 }).join(modern?'':divider());

 var paper=ls("gk_bkpaper")||(typeof th!=="undefined"&&th==="night"?"night":"day");
 var fs=+ls("gk_bkfs")||17;if(fs<14||fs>23)fs=17;
 return '<div class="bk'+(modern?' md-monograph':'')+'" dir="'+dir+'" lang="'+lang+'" data-paper="'+paper+'" data-i="'+idx+'" style="--bk-fs:'+fs+'px">'+
  '<header class="bk-head"><div class="bk-bar"><div class="bk-left">'+
   '<button type="button" class="bk-btn bk-back" onclick="bkBack()" aria-label="'+esc(x.aBack)+'">'+svg("back")+'</button>'+
   '<div class="bk-ttl"><h1>'+esc(name)+(modern?'':' — '+esc(x.booklet))+'</h1><p>'+esc(t().title)+'</p></div></div>'+
   '<div class="bk-ctl"><div class="bk-sz"><button type="button" onclick="bkFont(-1)" aria-label="'+esc(x.aSm)+'">'+esc(x.fm)+'</button><span id="bk-fsb">'+fs+'</span><button type="button" onclick="bkFont(1)" aria-label="'+esc(x.aLg)+'">'+esc(x.fp)+'</button></div>'+
   '<button type="button" class="bk-btn" onclick="bkPaper()" aria-label="'+esc(x.aTheme)+'">'+svg("moon","bk-moon")+svg("sun","bk-sun")+'</button>'+
   '<button type="button" class="bk-btn bk-fav'+(isFav?" on":"")+'" onclick="bkFav()" aria-label="'+esc(x.aFav)+'">'+svg("heart")+'</button>'+
   '<button type="button" class="bk-btn" onclick="bkShare()" aria-label="'+esc(x.aShare)+'">'+svg("share")+'</button></div></div>'+
   '<nav class="bk-nav" aria-label="'+esc(x.aNav)+'">'+chips+'</nav><div class="bk-prog" aria-hidden="true"><i></i></div></header>'+
  '<main class="bk-main"><section class="bk-title"><span class="bk-badge">'+esc(modern?libraryBooks.modern[lang]:x.badge)+' · '+esc(x.code)+': '+esc(plant.taj[0])+'</span>'+
   '<h2 class="bk-serif">'+esc(name)+'</h2>'+
   (sci||fam?'<p class="bk-sci" dir="ltr">'+(sci?esc(sci):"")+(sci&&fam?" — ":"")+(fam?'Family: <b>'+esc(fam)+'</b>':"")+'</p>':"")+'</section>'+
   fig+names+(modern?'':divider())+secs+refsHtml+'</main></div>';
}


/* new dashboard field "chart": register it so imported/edited data is accepted */
try{
 var LO=wordDetailLayout,CL={ps:"د اجزاوو چارټ",fa:"نمودار اجزا",ur:"اجزا کا چارٹ",en:"Constituents chart"};
 if(LO.order.indexOf("chart")<0)LO.order.push("chart");
 ["ps","fa","ur","en"].forEach(function(l){if(LO.labels&&LO.labels[l]&&!LO.labels[l].chart)LO.labels[l].chart=CL[l]});
 Object.keys(LO.records).forEach(function(c){var r=LO.records[c];["ps","fa","ur","en"].forEach(function(l){if(r.fields&&r.fields[l]&&!r.fields[l].chart)r.fields[l].chart=[]})});
}catch(e){}

/* ---------- hook into the app ---------- */
var _bkOrig=wordOrderedPlantDetails;
wordOrderedPlantDetails=function(plant){try{return build(plant)}catch(e){try{console.warn("book design fallback",e)}catch(_){}return _bkOrig(plant)}};

var _ck0=contentKey;
contentKey=function(p){window.__bkLean=1;try{return _ck0.apply(this,arguments)}finally{window.__bkLean=0}};
try{_ck={}}catch(e){}

/* ---------- interactions ---------- */
function root(){return document.querySelector("#app .bk")}
window.bkBack=function(){goBack()};
window.bkShare=function(){var b=root();if(b&&b.dataset.i!=="-1")shareHerb(+b.dataset.i)};
window.bkJump=function(id){
 var el=document.getElementById(id),b=root();if(!el||!b)return;
 var hd=b.querySelector(".bk-head"),y=el.getBoundingClientRect().top+window.scrollY-(hd?hd.getBoundingClientRect().height:0)-8;
 window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
};
window.bkFont=function(step){
 var b=root();if(!b)return;
 var cur2=parseInt(getComputedStyle(b).getPropertyValue("--bk-fs"),10)||17,n=cur2+step,x=X();
 if(n<14||n>23){try{toast(step>0?x.max:x.min)}catch(e){}return}
 b.style.setProperty("--bk-fs",n+"px");ls("gk_bkfs",String(n));
 var s=document.getElementById("bk-fsb");if(s)s.textContent=n;
 try{toast(x.size+n+"px")}catch(e){}
};
window.bkPaper=function(){
 var b=root();if(!b)return;
 var night=b.getAttribute("data-paper")!=="night";
 b.setAttribute("data-paper",night?"night":"day");ls("gk_bkpaper",night?"night":"day");
 try{toast(night?X().night:X().day)}catch(e){}
};
window.bkChem=function(btn){
 var b=root();if(!b)return;
 [].forEach.call(b.querySelectorAll(".bk-crow"),function(r){r.classList.toggle("on",r===btn)});
 var box=document.getElementById("bk-cbox");if(!box)return;
 box.innerHTML=chemBox({n:btn.getAttribute("data-n"),v:btn.getAttribute("data-v"),d:btn.getAttribute("data-d")},X());
};
window.bkFav=function(){
 var b=root();if(!b)return;var i=+b.dataset.i;if(!(i>-1))return;
 var j=fav.indexOf(i);if(j>-1)fav.splice(j,1);else fav.push(i);
 sv("gk_fav",JSON.stringify(fav));
 var btn=b.querySelector(".bk-fav");if(btn)btn.classList.toggle("on",j===-1);
 try{toast(j===-1?X().favOn:X().favOff)}catch(e){}
};

var ticking=false;
function onScroll(){
 var b=root();if(!b)return;
 var st=window.scrollY||document.documentElement.scrollTop||0,mx=document.documentElement.scrollHeight-window.innerHeight;
 var pct=mx>0?Math.min(100,Math.max(0,st/mx*100)):100;
 var bar=b.querySelector(".bk-prog i");if(bar)bar.style.width=pct+"%";
 var hd=b.querySelector(".bk-head"),off=(hd?hd.getBoundingClientRect().height:0)+30,act=null;
 [].forEach.call(b.querySelectorAll("[data-bk-sec]"),function(s){if(s.getBoundingClientRect().top<=off)act=s.id});
 if(mx>0&&st>=mx-4)act="bk-refs";
 if(!act)act="bk-names";
 [].forEach.call(b.querySelectorAll(".bk-chip"),function(c){
  var on=c.getAttribute("data-t")===act;
  if(on!==c.classList.contains("on")){c.classList.toggle("on",on);if(on){var n=c.parentNode;try{n.scrollTo({left:c.offsetLeft-n.clientWidth/2+c.clientWidth/2,behavior:"smooth"})}catch(e){}}}
 });
}
window.addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(function(){ticking=false;onScroll()})}},{passive:true});

function init(){
 var a=document.getElementById("app");if(!a)return;
 if(a.querySelector(".bk")){a.classList.add("bkpage");fonts();
  try{var g=glanceRow(H[cur]);var nm=a.querySelector("#bk-names");if(g&&nm&&!a.querySelector(".glance"))nm.after(g)}catch(e){}
  onScroll();
 }
}
var _bkRender=render;
render=function(){_bkRender.apply(this,arguments);try{if(view==="lib"&&cur!==null)init()}catch(e){}};
})();

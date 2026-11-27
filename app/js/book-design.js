/* ===== Ghazali book-style plant page: replaces the detail layout for all plants ===== */
(function(){
"use strict";
if(window.__gkBook)return;window.__gkBook=1;

var BK={
 ps:{chartT:"د کیمیاوي اجزاوو چارټ",chartS:"د مهمو فعالو مرکباتو اټکلي سلنه",chartH:"پر هر جز کلیک وکړئ",role:"فارماکولوژيکي رول",share:"٪ برخه",booklet:"د بوټي کتابچه",badge:"طبي مفردات",code:"کوډ",other:"نور نومونه",otherSub:"په بېلابېلو ژبو",
  ords:["لومړی فصل","دویم فصل","درېیم فصل","څلورم فصل","پنځم فصل"],
  c1:["پېژندنه","پېژندنه، ماهیت او د پیدا کېدو ځایونه"],c2:["مزاج او مقدار","طبي مزاج، مصلح، بدل او د خوراک مقدار"],
  c3:["دودیز استعمال","دودیز استعمال"],c4:["کیمیاوي اجزا","کیمیاوي اجزا او مرکبات"],c5:["احتیاط","احتیاطي تدابیر او خبرداری"],
  refs:["سرچینې","پاورقي او علمي سرچینې"],intro2:"د دودیز طب (حکمت) د اصولو پر بنسټ د بوټي طبیعي ځانګړنې او د کارونې کچه په لاندې جدول کې ترتیب شوې ده:",
  chemSub:"د کتاب له مخې ثبت شوي اجزا",warn:"مهم طبي خبرداری او منع استعمال",pro:"مسلکي مشوره",
  fm:"الف-",fp:"الف+",size:"د متن اندازه: ",min:"دا تر ټولو کوچنۍ اندازه ده",max:"دا تر ټولو لویه اندازه ده",
  night:"د شپې تیاره پاڼه فعاله شوه",day:"د ورځې کاغذي پاڼه فعاله شوه",favOn:"په خوښ شویو کې خوندي شو",favOff:"له خوښ شویو څخه لرې شو",
  aBack:"شاته",aSm:"متن کوچنی کول",aLg:"متن لوی کول",aTheme:"د ورځې او شپې پاڼه",aFav:"خوښول",aShare:"شریکول",aNav:"د فصلونو فهرست"},
 fa:{chartT:"نمودار اجزای کیمیایی",chartS:"درصد تقریبی ترکیبات فعال مهم",chartH:"روی هر جزء بزنید",role:"نقش دارویی",share:"٪ سهم",booklet:"کتابچهٔ گیاه",badge:"مفردات طبی",code:"کد",other:"نام‌های دیگر",otherSub:"به زبان‌های مختلف",
  ords:["فصل اول","فصل دوم","فصل سوم","فصل چهارم","فصل پنجم"],
  c1:["شناخت","شناخت، ماهیت و محل پیدایش"],c2:["مزاج و مقدار","مزاج طبی، مصلح، بدل و مقدار مصرف"],
  c3:["کاربرد سنتی","کاربرد سنتی"],c4:["اجزای کیمیایی","اجزای کیمیایی و ترکیبات"],c5:["احتیاط","تدابیر احتیاطی و هشدار"],
  refs:["منابع","پاورقی و منابع علمی"],intro2:"بر پایهٔ اصول طب سنتی (حکمت)، ویژگی‌های طبیعی و مقدار مصرف در جدول زیر آمده است:",
  chemSub:"اجزای ثبت‌شده در کتاب",warn:"هشدار مهم پزشکی و منع مصرف",pro:"مشورت تخصصی",
  fm:"الف-",fp:"الف+",size:"اندازهٔ متن: ",min:"این کوچک‌ترین اندازه است",max:"این بزرگ‌ترین اندازه است",
  night:"صفحهٔ شبانه فعال شد",day:"صفحهٔ روز فعال شد",favOn:"به علاقه‌مندی‌ها افزوده شد",favOff:"از علاقه‌مندی‌ها حذف شد",
  aBack:"بازگشت",aSm:"کوچک‌کردن متن",aLg:"بزرگ‌کردن متن",aTheme:"صفحهٔ روز و شب",aFav:"علاقه‌مندی",aShare:"اشتراک",aNav:"فهرست فصل‌ها"},
 ur:{chartT:"کیمیائی اجزا کا چارٹ",chartS:"اہم فعال مرکبات کا تخمینی فیصد",chartH:"کسی بھی جز پر کلک کریں",role:"دوائی کردار",share:"٪ حصہ",booklet:"پودے کا کتابچہ",badge:"طبی مفردات",code:"کوڈ",other:"دیگر نام",otherSub:"مختلف زبانوں میں",
  ords:["پہلا باب","دوسرا باب","تیسرا باب","چوتھا باب","پانچواں باب"],
  c1:["تعارف","تعارف، ماہیت اور مقام پیدائش"],c2:["مزاج اور مقدار","طبی مزاج، مصلح، بدل اور مقدار خوراک"],
  c3:["روایتی استعمال","روایتی استعمال"],c4:["کیمیائی اجزا","کیمیائی اجزا اور مرکبات"],c5:["احتیاط","احتیاطی تدابیر اور انتباہ"],
  refs:["ماخذ","حواشی اور علمی ماخذ"],intro2:"روایتی طب (حکمت) کے اصولوں کے مطابق قدرتی خصوصیات اور مقدارِ استعمال نیچے دی گئی ہیں:",
  chemSub:"کتاب میں درج اجزا",warn:"اہم طبی انتباہ اور ممانعت",pro:"ماہرانہ مشورہ",
  fm:"الف-",fp:"الف+",size:"متن کا سائز: ",min:"یہ سب سے چھوٹا سائز ہے",max:"یہ سب سے بڑا سائز ہے",
  night:"رات کا صفحہ فعال ہوا",day:"دن کا صفحہ فعال ہوا",favOn:"پسندیدہ میں محفوظ ہوا",favOff:"پسندیدہ سے ہٹا دیا گیا",
  aBack:"واپس",aSm:"متن چھوٹا کریں",aLg:"متن بڑا کریں",aTheme:"دن اور رات کا صفحہ",aFav:"پسندیدہ",aShare:"شیئر",aNav:"ابواب کی فہرست"},
 en:{chartT:"Constituents chart",chartS:"Approximate share of key active compounds",chartH:"Tap a constituent",role:"Pharmacological role",share:"% share",booklet:"Plant booklet",badge:"Medicinal simples",code:"Code",other:"Other names",otherSub:"In different languages",
  ords:["Chapter 1","Chapter 2","Chapter 3","Chapter 4","Chapter 5"],
  c1:["Overview","Identity, nature and where it grows"],c2:["Temperament & dose","Temperament, corrective, substitute and dose"],
  c3:["Traditional use","Traditional use"],c4:["Constituents","Chemical constituents and preparations"],c5:["Cautions","Precautions and warnings"],
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
function modernChemHtml(items,ml,molecules){
 var rows=modernChemRows(items);if(!rows.length)return '';
 var labels=[['مستندي سلنې یوازې د ښودل سوې نمونې لپاره دي.','درصدهای مستند فقط مربوط به نمونه مشخص‌شده‌اند.','مستند فیصد صرف درج کردہ نمونے کے لیے ہیں۔','Documented composition values refer only to the specified sample.'],['سرچینه','منبع','ماخذ','Source'],['مستنده سلنه نسته','درصد مستند موجود نیست','مستند فیصد دستیاب نہیں','Documented percentage unavailable'],['فورمول نه دئ ثبت سوی','فرمول ثبت نشده','فارمولا درج نہیں','Formula unavailable'],['تفصیل او سرچینه','جزئیات و منبع','تفصیل اور ماخذ','Details and source']];
 var formulas=new Map();
 (molecules||[]).flatMap(function(b){return String(b.text||'').split(/\n/)}).forEach(function(line){
  var p=line.split('|').map(function(v){return v.trim()});if(!p[0]||!p[1])return;
  var key=p[0].normalize('NFKC').toLowerCase();if(!formulas.has(key))formulas.set(key,p[1]);else if(formulas.get(key)!==p[1])formulas.set(key,'');
 });
 var palette=['#168575','#397eb4','#997128','#8762b6','#b55c70','#337f91'];
 return '<div class="md-chem-grid md-gauge-grid">'+rows.map(function(r,i){
  var valid=r.lo!==null,range=valid?(r.lo===r.hi?r.lo+'%':r.lo+'–'+r.hi+'%'):'';
  var formula=r.formula||formulas.get(r.name.normalize('NFKC').toLowerCase())||'';
  var source=/^https:\/\/[a-z0-9.-]+(?:[/?#][^\s]*)?$/i.test(r.source)?'<a href="'+esc(r.source)+'" target="_blank" rel="noopener noreferrer">'+esc(labels[1][ml])+'</a>':esc(r.source);
  var arc='';
  if(valid){
   if(r.lo===r.hi){var angle=Math.PI*(1-r.lo/100);arc='<circle cx="'+(70+56*Math.cos(angle)).toFixed(3)+'" cy="'+(67-56*Math.sin(angle)).toFixed(3)+'" r="4" fill="currentColor"/>';}
   else{arc='<path d="M14 67 A56 56 0 0 1 126 67" pathLength="100" stroke="currentColor" stroke-width="9" stroke-dasharray="0 '+r.lo+' '+(r.hi-r.lo)+' '+(100-r.hi)+'"/>';}
  }
  return '<article class="md-compound md-gauge-card" style="--md-gauge-color:'+palette[i%palette.length]+'"><div class="md-gauge" dir="ltr">'+
   '<svg viewBox="0 0 140 88" aria-hidden="true" focusable="false" fill="none"><path d="M14 67 A56 56 0 0 1 126 67" stroke="var(--bk-track)" stroke-width="9" stroke-linecap="round"/>'+arc+'</svg>'+
   '<div class="md-gauge-center"><b>'+(valid?esc(range):'—')+'</b><span class="md-gauge-formula" dir="ltr">'+(formula?modernFormula(formula):'—')+'</span></div><div class="md-gauge-scale"><span>0%</span><span>100%</span></div></div>'+
   '<strong class="md-gauge-name" dir="auto">'+esc(r.name)+'</strong>'+
   (!valid?'<p class="md-note">'+esc(labels[2][ml])+'</p>':'')+(!formula?'<p class="md-note">'+esc(labels[3][ml])+'</p>':'')+
   (r.scope||source?'<details class="md-gauge-details"><summary>'+esc(labels[4][ml])+'</summary>'+(r.scope?'<p class="md-scope">'+esc(r.scope)+'</p>':'')+(source?'<p class="md-source">'+source+'</p>':'')+'</details>':'')+'</article>';
 }).join('')+'</div><p class="md-note">'+esc(labels[0][ml])+'</p>';
}

/* Independent molecule cards. A molecular formula alone never identifies a structure. */
function moleculeCid(source){
 var s=String(source||'').trim(),m=/https:\/\/pubchem\.ncbi\.nlm\.nih\.gov\/compounds?\/(\d{1,10})(?=[/?#\s,;.)\]]|$)/i.exec(s);
 if(!m)m=/\bPubChem\s*(?:CID\s*)?[:#]?\s*(\d{1,10})\b/i.exec(s);
 if(!m)m=/\bCID\s*[:#]?\s*(\d{1,10})\b/i.exec(s);
 return m?m[1]:'';
}
function moleculeReference(name,f){
 var aliases={
 'menthol':'1254','l-menthol':'16666','(-)-menthol':'16666','(-)menthol':'16666','منتول':'1254','مینتھول':'1254','منتھول':'1254',
 'menthone':'26447','l-menthone':'26447','(-)-menthone':'26447','منتون':'26447','منتھون':'26447','مینتھون':'26447',
 'isomenthone':'70962','(+)-isomenthone':'70962','ایزومنتون':'70962','ايزومنتون':'70962','آئسومینتھون':'70962','آئیسومینتھون':'70962',
 'menthyl acetate':'27867','l-menthyl acetate':'220674','(-)-menthyl acetate':'220674','منتایل اسیتات':'27867','منتيل اسيتات':'27867','منتیل استات':'27867','منتھائل ایسیٹیٹ':'27867',
 '1,8-cineole':'2758','1,8 cineole':'2758','1,8-cineol':'2758','eucalyptol':'2758','۱،۸ سینئول':'2758','1,8 سینئول':'2758','سینئول':'2758','یوکالیپتول':'2758',
 'limonene':'22311','لیمونین':'22311','لیمونینے':'22311',
 'menthofuran':'329983','منتوفوران':'329983','منتوفوران':'329983','مینتھوفیوران':'329983',
 'pulegone':'442495','(+)-pulegone':'442495','پولیګون':'442495','پولگون':'442495','پولے گون':'442495',
 'carvone':'7439','کاروون':'7439','کارون':'7439','کاروین':'7439',
 'rosmarinic acid':'5281792','rosemary acid':'5281792','روزمارینیک اسید':'5281792','روسمارینیک اسید':'5281792','روزمارینیک اسیډ':'5281792','روسمارینیک اسیډ':'5281792','رزمارینیک اسید':'5281792','اسید رزمارینیک':'5281792','اسید روزمارینیک':'5281792','روزمارینک ایسڈ':'5281792','روسمارینک ایسڈ':'5281792','isopulegol':'170833','(-)-isopulegol':'170833','ایزوپولیګول':'170833','ایزوپولگول':'170833','آئیسوپولیگول':'170833'};
 var n=String(name||'').normalize('NFKC').toLowerCase().trim().replace(/−/g,'-').replace(/\s+/g,' ');
 var candidate=aliases[n]||'';
 if(!candidate){var p=/\(([a-z][a-z0-9 ,\-]+)\)$/i.exec(n);if(p)candidate=aliases[p[1].trim()]||'';}
 var record=(window.GHAZALI_MOLECULES||{})[candidate];
 return record&&record.formula===f?candidate:'';
}
function moleculeMass(f){
 if(f.length>120||! /^(?:[A-Z][a-z]?\d*)+$/.test(f))return '';
 var weights={C:12.011,H:1.008,O:15.999,N:14.007,S:32.06,P:30.974,F:18.998,Cl:35.45,Br:79.904,I:126.904,Na:22.990,K:39.098,Ca:40.078,Mg:24.305,Fe:55.845,Zn:65.38,Si:28.085,B:10.81};
 var mass=0,m,re=/([A-Z][a-z]?)(\d*)/g;
 while((m=re.exec(f))){var n=m[2]?Number(m[2]):1;if(!Object.prototype.hasOwnProperty.call(weights,m[1])||n<1||n>10000)return '';mass+=weights[m[1]]*n;}
 return mass?mass.toFixed(2):'';
}
function moleculeLocal(cid,f){
 var rec=(window.GHAZALI_MOLECULES||{})[cid];
 if(!rec||rec.formula!==f)return '';
 var paths=Object.keys(rec.paths).map(function(k){
  var color=k[1]==='r'?'#bc4545':'currentColor';
  return '<path d="'+rec.paths[k]+'" fill="'+(k[0]==='f'?color:'none')+'" stroke="'+color+'" stroke-width="'+(k[2]==='1'?'1':(rec.bondWidth||2))+'" stroke-linecap="round" stroke-linejoin="round"/>';
 }).join('');
 var labels=rec.labels.map(function(v){return '<text x="'+v[0]+'" y="'+v[1]+'" fill="#bc4545" font-family="system-ui,sans-serif" font-size="'+(rec.labelSize||15)+'">'+v[2]+'</text>';}).join('');
 return '<svg viewBox="0 0 190 150" role="img" aria-label="PubChem CID '+cid+' — 2D reference" xmlns="http://www.w3.org/2000/svg">'+paths+labels+'</svg>';
}
function modernMolecules(items,legacy,ml){
 var rows=(items||[]).flatMap(function(b){return String(b.text||'').split(/\n/)}).map(function(line){
  var p=line.split('|').map(function(s){return s.trim()});
  return p[0]&&p[1]?{name:p[0],formula:p[1],source:p.slice(2).filter(Boolean).join(' | ')}:null;
 }).filter(Boolean);
 modernChemRows(legacy).forEach(function(r){if(r.formula&&!rows.some(function(x){return x.name.toLowerCase()===r.name.toLowerCase()&&x.formula===r.formula}))rows.push(r)});
 if(!rows.length)return paras(items,ml===3?'ltr':'rtl');
 var L={mass:['مالیکولي وزن','وزن مولکولی','سالماتی وزن','Molecular weight'],class:['کیمیاوي ډله','گروه کیمیایی','کیمیائی گروہ','Chemical class'],details:['علمي تفصیل','جزئیات علمی','علمی تفصیل','Scientific details'],missing:['مالیکولي شکل نه دئ ثبت سوی','ساختار مولکولی ثبت نشده','سالماتی ساخت درج نہیں','Structure unavailable'],offline:['شکل اوس نه ښکاري','تصویر فعلاً در دسترس نیست','تصویر فی الحال دستیاب نہیں','Structure currently unavailable'],simple:['ساده ۲D شکل؛ فضایي جهتونه نه دي ښودل سوي','شکل سادهٔ دوبعدی؛ آرایش فضایی نمایش داده نشده','سادہ دو بعدی شکل؛ فضائی ترتیب نہیں دکھائی گئی','2D connectivity; stereochemistry omitted'],alcohol:['الکول','الکل','الکحل','Alcohol'],ketone:['کیټون','کتون','کیٹون','Ketone']};
 return '<div class="md-chem-grid md-molecule-grid">'+rows.map(function(r){
  var f=String(r.formula).trim().replace(/[₀₁₂₃₄₅₆₇₈₉]/g,function(n){return '₀₁₂₃₄₅₆₇₈₉'.indexOf(n)}),explicitCid=moleculeCid(r.source),cid=explicitCid||moleculeReference(r.name,f),mass=moleculeMass(f),rec=(window.GHAZALI_MOLECULES||{})[cid],local=moleculeLocal(cid,f);
  var groups={phenolicacid:['فینولي اسید','اسید فنولی','فینولک ایسڈ','Phenolic acid'],alcohol:L.alcohol,ketone:L.ketone,ester:['اسټر','استر','ایسٹر','Ester'],ether:['ایتر','اتر','ایتھر','Ether'],hydrocarbon:['هایدروکاربن','هیدروکربن','ہائیڈروکاربن','Hydrocarbon'],furan:['فوران','فوران','فیوران','Furan']};
  var group=local&&rec&&groups[rec.group]?groups[rec.group][ml]:'';
  if(rec&&rec.formula!==f)cid='';
  var note=['د PubChem مرجع شکل؛ د نمونې فضایي جوړښت نه ثابتوي','ساختار مرجع PubChem؛ آرایش فضایی نمونه را اثبات نمی‌کند','PubChem کا حوالہ جاتی ساخت؛ نمونے کی فضائی ترتیب ثابت نہیں کرتا','PubChem reference structure; not proof of sample stereochemistry'][ml];
  var url=cid?'https://pubchem.ncbi.nlm.nih.gov/compound/'+cid:/^https:\/\/[a-z0-9.-]+(?:[/?#][^\s]*)?$/i.test(r.source)?r.source:'';
  var visual=local||(cid?'<img loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="'+esc(r.name)+'" src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/'+cid+'/PNG?record_type=2d&amp;image_size=300x300" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="md-molecule-placeholder" hidden>'+esc(L.offline[ml])+'</span>':'<span class="md-molecule-placeholder">'+esc(L.missing[ml])+'</span>');
  return '<article class="md-compound md-molecule-card"><strong class="md-molecule-name" dir="auto">'+esc(r.name)+'</strong><div class="md-molecule-visual" dir="ltr">'+visual+'</div>'+(local?'<small class="md-molecule-caption">'+esc(note+' · CID '+cid)+'</small>':'')+'<span class="md-formula" dir="ltr">'+modernFormula(f)+'</span>'+
   (mass?'<div class="md-molecule-meta"><small>'+esc(L.mass[ml])+'</small><b dir="ltr">≈ '+mass+' g/mol</b></div>':'')+
   (group?'<div class="md-molecule-meta"><small>'+esc(L.class[ml])+'</small><b>'+esc(group)+'</b></div>':'')+
   (url?'<a class="md-molecule-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(L.details[ml])+' ↗</a>':r.source?'<p class="md-source">'+esc(r.source)+'</p>':'')+'</article>';
 }).join('')+'</div>';
}
function modernInteractions(items,ml){
 var labels=[["درمل یا ډله","د تعامل ډول","احتمالي اغېز","احتیاط","علمي سرچینه"],["دارو یا گروه","نوع تداخل","اثر احتمالی","احتیاط","منبع علمی"],["دوا یا گروہ","تعامل کی نوعیت","ممکنہ اثر","احتیاط","علمی ماخذ"],["Drug or class","Interaction type","Potential effect","Precaution","Scientific source"]][ml],empty=["د تعاملاتو مستند معلومات لا نه دي ثبت سوي.","اطلاعات مستند تداخلات هنوز ثبت نشده است.","تعاملات کی مستند معلومات ابھی درج نہیں ہوئیں۔","Documented interaction information has not yet been recorded."][ml],rows=[],legacy=[];
 (items||[]).forEach(function(b){String(b.text||'').split(/\n/).forEach(function(line){
  if(!line.trim())return;var p=line.split('|').map(function(x){return x.trim()});
  if(p.length===5&&p[0]&&p[4])rows.push(p);else legacy.push(line);
 })});
 var h=rows.length?'<div class="md-interactions">'+rows.map(function(p){return '<article class="md-compound md-interaction"><div class="md-compound-head"><strong dir="auto">'+esc(p[0])+'</strong></div><dl>'+p.slice(1).map(function(v,i){var val=esc(v);if(i===3&&/^https:\/\/[a-z0-9.-]+(?:[/?#][^\s]*)?$/i.test(v))val='<a href="'+esc(v)+'" target="_blank" rel="noopener noreferrer">'+esc(labels[4])+'</a>';return '<div><dt>'+esc(labels[i+1])+'</dt><dd dir="auto">'+(val||'—')+'</dd></div>'}).join('')+'</dl></article>'}).join('')+'</div>':'';
 return h+legacy.map(function(line){return '<p>'+esc(line)+'</p>'}).join('')||'<p class="md-note">'+esc(empty)+'</p>';
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

function build(plant,previewRecord){
 var rec=previewRecord||wordDetailLayout.records[plant.taj[0]],F=rec.fields[lang]||rec.fields.ps||{},dir=lang==="en"?"ltr":"rtl",
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
 var name=previewRecord?rec.name[lang]:herbDisplay(plant),sci=rec.scientific||"",fam=rec.family||"";
 var chapters=[];
 var ibn=/^IB\d{4,}$/.test(plant.taj[0]);
 if(ibn){
  var fullLabel=["بشپړ متن","متن کامل","مکمل متن","Full text"][ml];
  var warning=["دا تاریخي طبي متن دئ، نه د معاصر علاج لارښوونه.","این متن طبی تاریخی است، نه دستور درمان معاصر.","یہ تاریخی طبی متن ہے، جدید علاج کی ہدایت نہیں۔","Historical medical text, not modern treatment guidance."][ml];
  var missing=["بشپړ متن لا نه دئ ثبت سوی.","متن کامل هنوز ثبت نشده است.","مکمل متن ابھی درج نہیں ہوا۔","Full text has not yet been entered."][ml];
  var body=(F.full_text||[]).flatMap(function(b){return String(b.text||"").split(/\r?\n+/).map(function(t){return t.trim()}).filter(Boolean).map(function(t){return {text:t,subtitle:b.subtitle||""}})}).map(function(b){var t=b.text,match=t.match(/^\S+(?:\s+\S+){0,2}/u),start=match?match[0]:t;return '<p dir="'+dir+'" style="margin:0 0 1.2em;padding-bottom:.65em;border-bottom:1px solid var(--bk-border);white-space:pre-wrap">'+(b.subtitle?'<strong style="font-size:1.15em;color:var(--bk-green)">'+esc(b.subtitle)+'</strong> ':'')+'<strong style="font-size:1.12em;color:var(--bk-green)">'+esc(start)+'</strong>'+esc(t.slice(start.length))+'</p>'}).join("");
  var safety=paras(F.safety,dir);
  chapters.push({id:"bk-c1",t:[fullLabel,fullLabel],html:'<p class="bk-note">'+esc(warning)+'</p><div class="bk-ed">'+(body||'<p>'+esc(missing)+'</p>')+'</div>'+(safety?'<div class="bk-warn">'+safety+'</div>':'')});
 }else if(modern){
  MODERN_GROUPS.forEach(function(g,i){
   var cards=g[1].map(function(k){
    var content=k==='chem_profile'?modernChemHtml(F[k],ml,F.molecular_formulas):k==='molecular_formulas'?modernMolecules(F[k],F.chem_profile,ml):k==='interactions'?modernInteractions(F[k],ml):paras(F[k],dir);
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
  (nameRows.length?'<div class="bk-grid">'+nameRows.map(function(r,i){return '<div class="bk-cell"'+(!modern&&i>=4?' hidden style="display:none" data-bk-extra="1"':'')+'><small>'+esc(r[0])+'</small><strong dir="auto">'+esc(r[1])+'</strong></div>'}).join("")+'</div>'+(!modern&&nameRows.length>4?'<button type="button" class="bk-chip" style="display:block;margin:12px auto 0" aria-expanded="false" onclick="var b=this,e=b.getAttribute(\'aria-expanded\')!==\'true\';b.parentElement.querySelectorAll(\'[data-bk-extra]\').forEach(function(n){n.hidden=!e;n.style.display=e?\'\':\'none\'});b.setAttribute(\'aria-expanded\',String(e));b.textContent=e?b.dataset.less:b.dataset.more" data-more="'+esc(({ps:"نور وښیه",fa:"بیشتر نشان بده",ur:"مزید دکھائیں",en:"Show more"})[lang]||"Show more")+'" data-less="'+esc(({ps:"لږ وښیه",fa:"کمتر نشان بده",ur:"کم دکھائیں",en:"Show less"})[lang]||"Show less")+'">'+esc(({ps:"نور وښیه",fa:"بیشتر نشان بده",ur:"مزید دکھائیں",en:"Show more"})[lang]||"Show more")+'</button>':'')
   :'<p class="bk-note">'+esc(MT.absent)+'</p>')+
  (rec.name_notes&&rec.name_notes[lang]?'<p class="bk-note">'+esc(rec.name_notes[lang])+'</p>':"")+'</section>';

 var hasPhoto=false;
 try{var ph=window.HERB_PHOTOS&&window.HERB_PHOTOS[plant.taj[0]];hasPhoto=!!(ph&&PH_KEYS.some(function(k){return ph[k]}))}catch(e){}
 var fig=(hasPhoto||ibn)?'<div class="bk-photos">'+stagePhotoSlots()+'</div>'
  :'<figure class="bk-plate"><div class="bk-svgbox">'+plate(sci,name)+'</div><figcaption><span>'+esc((typeof PH_SOON!=="undefined"&&PH_SOON[lang])||"")+'</span>'+(sci?'<em>'+esc(sci)+'</em>':'')+'</figcaption></figure>';

 /* references */
 var refs="";try{if(!previewRecord)refs=librarySource(plant).replace(/<h3>.*?<\/h3>/,"")}catch(e){}
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
   '<div class="bk-ttl"><h1>'+esc(name)+(modern||ibn?'':' — '+esc(x.booklet))+'</h1><p>'+esc(t().title)+'</p></div></div>'+
   '<div class="bk-ctl"><div class="bk-sz"><button type="button" onclick="bkFont(-1)" aria-label="'+esc(x.aSm)+'">'+esc(x.fm)+'</button><span id="bk-fsb">'+fs+'</span><button type="button" onclick="bkFont(1)" aria-label="'+esc(x.aLg)+'">'+esc(x.fp)+'</button></div>'+
   '<button type="button" class="bk-btn" onclick="bkPaper()" aria-label="'+esc(x.aTheme)+'">'+svg("moon","bk-moon")+svg("sun","bk-sun")+'</button>'+
   '<button type="button" class="bk-btn bk-fav'+(isFav?" on":"")+'" onclick="bkFav()" aria-label="'+esc(x.aFav)+'">'+svg("heart")+'</button>'+
   '<button type="button" class="bk-btn" onclick="bkShare()" aria-label="'+esc(x.aShare)+'">'+svg("share")+'</button></div></div>'+
   '<nav class="bk-nav" aria-label="'+esc(x.aNav)+'">'+chips+'</nav><div class="bk-prog" aria-hidden="true"><i></i></div></header>'+
  '<main class="bk-main"><section class="bk-title"><span class="bk-badge">'+esc(ibn?libraryBooks.ibn[lang]:modern?libraryBooks.modern[lang]:x.badge)+' · '+esc(x.code)+': '+esc(plant.taj[0])+'</span>'+
   '<h2 class="bk-serif">'+esc(name)+'</h2>'+
   (sci||fam?'<p class="bk-sci" dir="ltr">'+(sci?esc(sci):"")+(sci&&fam?" — ":"")+(fam?'Family: <b>'+esc(fam)+'</b>':"")+'</p>':"")+'</section>'+
   (previewRecord?'<article class="md-field md-warning" role="note"><h3>'+esc(previewRecord.warning[lang])+'</h3><p><a href="../index.html">'+esc(x.aBack)+'</a></p></article>':'')+fig+names+(modern?'':divider())+secs+refsHtml+'</main></div>';
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
  // Modern monographs use the scientific chapters directly, without traditional classification chips.
  if(!a.querySelector(".bk.md-monograph")){
   try{var g=glanceRow(H[cur]);var nm=a.querySelector("#bk-names");if(g&&nm&&!a.querySelector(".glance"))nm.after(g)}catch(e){}
  }
  onScroll();
 }
}

/* Isolated design preview: never inserted into H, wordDetailLayout or Firebase. */
var MD_DEMO_ROWS={"mhy":["څوکلن خوشبویه بوټی؛ د Lamiaceae کورنۍ. د نوعې دقیق تشخیص لا مقابلې ته اړتیا لري.","گیاه معطر چندساله از خانواده نعناعیان؛ تشخیص دقیق نیازمند تطبیق است.","خوشبودار بارہماسی پودا، خاندان Lamiaceae؛ درست شناخت کی تطبیق باقی ہے.","Aromatic perennial in Lamiaceae; precise identity criteria await verification."],"origin":["جغرافیایي اصل، اوسنی خپرېدنه او د افغانستان د کرنې شواهد جلا ثبت کړئ.","خاستگاه، پراکندگی و شواهد کشت افغانستان جدا ثبت شود.","آبائی علاقہ، پھیلاؤ اور افغانستان میں کاشت کے شواہد الگ درج کریں۔","Record native range, current distribution and Afghan cultivation evidence separately."],"part":["وچي پاڼي؛ اسانسي غوړي د ګل لرونکي هوايي برخو څخه جلا تعریف کړئ.","برگ خشک؛ اسانس اندام هوایی گلدار جدا تعریف شود.","خشک پتے؛ پھول دار فضائی حصوں کا تیل الگ بیان کریں۔","Dried leaf; define essential oil from flowering aerial parts separately."],"macro":["د پاڼي شکل، څنډې، رګونه، رنګ او بوی؛ دقیق معیارونه وروسته تاییدېږي.","شکل، حاشیه، رگبرگ، رنگ و بو؛ معیار دقیق نیازمند تأیید است.","پتے کی شکل، کنارے، رگیں، رنگ اور بو؛ معیار کی تصدیق باقی ہے۔","Leaf shape, margins, veins, colour and odour; exact criteria pending."],"micro":["د سطحي حجرو، تنفسي سوریو، غدوي او غیرغدوي وېښتانو او پوډر نښې ثبت کړئ؛ نوعه او اندازه لا نه دي تایید سوي.","سلول‌های اپیدرم، روزنه‌ها، کرک غده‌ای و غیرغده‌ای و نشانه‌های پودر؛ نوع و اندازه هنوز تأیید نشده‌اند.","سطحی خلیات، روزن، غدودی و غیرغدودی بال اور سفوف کی نشانیاں؛ قسم اور جسامت کی تصدیق باقی ہے۔","Record epidermal cells, stomata, glandular and non-glandular trichomes and powder markers; exact types and dimensions pending."],"chem":["په اسانسي غوړیو کي مهم مرکبات منتول او منتون دي.","منتول و منتون از اجزای عمده اسانس‌اند.","اسینشل آئل کے اہم مرکبات مینتھول اور مینتھون ہیں۔","Menthol and menthone are major essential-oil constituents."],"chem_reactions":["د پېژندني ازموینې، TLC او د تعامل شرایط د معتبرې طریقې له مخې ثبت کړئ.","آزمون‌های شناسایی، TLC و شرایط واکنش طبق روش معتبر ثبت شود.","شناختی آزمائشیں، TLC اور تعامل کی شرائط معتبر طریقے سے درج کریں۔","Record identity tests, TLC and reaction conditions from validated methods."],"pharmacology":["د اغېز میکانیزم، تجربوي ماډل او د شواهدو کچه جلا ثبت کړئ.","سازوکار اثر، مدل آزمایش و سطح شواهد جدا ثبت شود.","طریقۂ اثر، تجرباتی ماڈل اور شواہد کی سطح الگ درج کریں۔","Distinguish mechanisms, experimental models and evidence level."],"clinical":["کلینیکي څېړنه، ګډونوال، پایله او محدودیتونه؛ د پاڼي او غوړیو شواهد جلا کړئ.","مطالعه بالینی، شرکت‌کنندگان، نتیجه و محدودیت؛ شواهد برگ و اسانس جدا شود.","طبی تحقیق، شرکاء، نتائج اور حدود؛ پتے اور تیل کے شواہد الگ رکھیں۔","Record clinical study design, participants, outcomes and limitations; distinguish leaf from oil."],"use":["د پاڼي او اسانسي غوړیو تایید سوی یا دودیز استعمال جلا ولیکئ؛ لا نهایي سوی نه دئ.","کاربرد تأییدشده یا سنتی برگ و اسانس جدا؛ هنوز نهایی نشده است.","پتے اور تیل کے منظور شدہ یا روایتی استعمال الگ؛ حتمی نہیں۔","Separate authorized and traditional indications for leaf and oil; not finalized."],"dose":["د درملو بڼه، عمر، لاره، مقدار او موده د رسمي سند مطابق؛ فعلاً مقدار نه ټاکل کېږي.","شکل دارو، سن، راه مصرف، مقدار و مدت مطابق سند رسمی؛ فعلاً بدون مقدار.","دوا کی شکل، عمر، طریقہ، مقدار اور مدت سرکاری دستاویز کے مطابق؛ فی الحال مقدار نہیں۔","Specify formulation, age, route, dose and duration from the official monograph; no dose assigned in this draft."],"mzr":["جانبي عوارض د استعمال له طریقې او شواهدو سره ثبت کړئ؛ وروستی لېست لا نه دئ تایید سوی.","عوارض با راه مصرف و شواهد ثبت شود؛ فهرست نهایی تأیید نشده است.","ضمنی اثرات طریقۂ استعمال اور شواہد سمیت؛ حتمی فہرست غیر مصدقہ ہے۔","Record adverse effects with route and evidence; final list pending."],"contraindications":["حساسیت، عمر، ځانګړي ناروغان او د استعمال ممانعتونه د رسمي متن له مخې.","حساسیت، سن، گروه‌های خاص و منع مصرف از متن رسمی.","حساسیت، عمر، مخصوص مریض اور ممانعتیں سرکاری متن سے۔","Record allergy, age and population-specific contraindications from the official text."],"interactions":["مستند تعاملات، د شواهدو ډول او نامعلوم معلومات جلا کړئ.","تداخلات مستند، نوع شواهد و موارد نامعلوم جدا شود.","مصدقہ تداخلات، نوعیتِ شواہد اور نامعلوم معلومات الگ کریں۔","Separate documented interactions, evidence type and unknowns."],"safety":["د امیندوارۍ، شیدو ورکولو او ماشومانو احتیاطونه جلا تایید کړئ؛ دا مسوده طبي لارښوونه نه ده.","احتیاط بارداری، شیردهی و کودکان جدا تأیید شود؛ این پیش‌نویس توصیه پزشکی نیست.","حمل، رضاعت اور بچوں کی احتیاطیں الگ تصدیق کریں؛ یہ مسودہ طبی ہدایت نہیں۔","Verify pregnancy, lactation and pediatric precautions separately; not medical instructions."],"quality":["د هویت ازموینه، پردي مواد، رطوبت، اېرې او د اسانسي غوړیو اندازه؛ حدود له اصلي فارماکوپیا څخه تایید کړئ.","هویت، مواد خارجی، رطوبت، خاکستر و مقدار اسانس؛ حدود از فارماکوپه تأیید شود.","شناخت، غیر متعلقہ مواد، نمی، راکھ اور تیل کی مقدار؛ حدود فارماکوپیا سے تصدیق کریں۔","Identity testing, foreign matter, moisture, ash and oil content; verify limits against the original pharmacopoeia."],"storage":["ظرف، رڼا، رطوبت، تودوخه او د ساتني موده د اصلي سند له مخې ثبت کړئ.","ظرف، نور، رطوبت، دما و مدت نگهداری طبق سند اصلی.","برتن، روشنی، نمی، حرارت اور مدت اصل دستاویز سے درج کریں۔","Record container, light, humidity, temperature and shelf life from the original source."],"refs":["لومړنۍ سرچینې: EMA/HMPC/522409/2013، د ترکیب برخه؛ PubChem CID 1254 او 26447. اصلي فارماکوپیا سره بشپړه مقابله پاته ده.","منابع اولیه: EMA/HMPC/522409/2013 و PubChem CID 1254 و 26447؛ تطبیق کامل با فارماکوپه باقی است.","ابتدائی ماخذ: EMA/HMPC/522409/2013 اور PubChem CID 1254، 26447؛ اصل فارماکوپیا سے تطبیق باقی ہے۔","Preliminary sources: EMA/HMPC/522409/2013 and PubChem CID 1254 and 26447; full original-pharmacopoeia comparison pending."],"chem_profile":["Menthol | 30-55 | اسانسي غوړي | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf\nMenthone | 14-32 | اسانسي غوړي | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf","Menthol | 30-55 | اسانس | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf\nMenthone | 14-32 | اسانس | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf","Menthol | 30-55 | اسینشل آئل | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf\nMenthone | 14-32 | اسینشل آئل | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf","Menthol | 30-55 | Essential oil | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf\nMenthone | 14-32 | Essential oil | https://www.ema.europa.eu/system/files/documents/herbal-report/menthae_piperitae_aetheroleum_and_folium_-_ar_en.pdf"],"molecular_formulas":["Menthol | C10H20O | https://pubchem.ncbi.nlm.nih.gov/compound/1254\nMenthone | C10H18O | https://pubchem.ncbi.nlm.nih.gov/compound/26447","Menthol | C10H20O | https://pubchem.ncbi.nlm.nih.gov/compound/1254\nMenthone | C10H18O | https://pubchem.ncbi.nlm.nih.gov/compound/26447","Menthol | C10H20O | https://pubchem.ncbi.nlm.nih.gov/compound/1254\nMenthone | C10H18O | https://pubchem.ncbi.nlm.nih.gov/compound/26447","Menthol | C10H20O | https://pubchem.ncbi.nlm.nih.gov/compound/1254\nMenthone | C10H18O | https://pubchem.ncbi.nlm.nih.gov/compound/26447"]};
var MD_DEMO_NAMES=["نعناع فلفلي","نعناع فلفلی","پودینہ فلفلی","Peppermint"];
var MD_DEMO_WARN=["آزمایښتي مسوده — د اصلي فارماکوپیا سره بشپړه مقابله لا نه ده سوې؛ د طبي استعمال لپاره نه ده.","پیش‌نویس آزمایشی — تطبیق کامل با فارماکوپه باقی است؛ برای مصرف پزشکی نیست.","آزمائشی مسودہ — اصل فارماکوپیا سے مکمل تطبیق باقی ہے؛ طبی استعمال کے لیے نہیں۔","DESIGN PREVIEW — original pharmacopoeia verification pending; not for medical use."];
function modernDemo(){
 var langs=['ps','fa','ur','en'],rec={name:{},names:{},fields:{},warning:{},scientific:'Mentha × piperita L.',family:'Lamiaceae'};
 langs.forEach(function(l,i){rec.name[l]=MD_DEMO_NAMES[i];rec.names[l]=[['Latin','Mentha × piperita L.'],['English','Peppermint']];rec.warning[l]=MD_DEMO_WARN[i];rec.fields[l]={};Object.keys(MD_DEMO_ROWS).forEach(function(k){rec.fields[l][k]=MD_DEMO_ROWS[k][i].split('\n').map(function(text){return {text:text,subtitle:'',source_ref:'design-preview'}})})});
 var p={taj:['MD0000'],nm:rec.name,s:rec.scientific};
 var el=document.getElementById('app'),nav=document.getElementById('nav');
 if(!el)return;var requested=new URLSearchParams(location.search).get('lang');if(langs.includes(requested))lang=requested;
 document.documentElement.lang=lang;document.documentElement.dir=lang==='en'?'ltr':'rtl';
 el.className='app bkpage';if(nav)nav.hidden=true;el.innerHTML=build(p,rec);
 var controls=el.querySelector('.bk-ctl');if(controls)controls.innerHTML=langs.map(function(l,i){return '<a class="bk-chip" href="?modern-preview=1&amp;lang='+l+'">'+['پښتو','فارسی','اردو','English'][i]+'</a>'}).join('');
 var back=el.querySelector('.bk-back');if(back){back.removeAttribute('onclick');back.addEventListener('click',function(){location.href='../index.html'})}fonts();onScroll();
}
var _bkRender=render;
var mdPreview=new URLSearchParams(location.search).get('modern-preview')==='1';
render=function(){if(mdPreview){modernDemo();return;}_bkRender.apply(this,arguments);try{if(view==="lib"&&cur!==null)init()}catch(e){}};
if(mdPreview)modernDemo();
})();

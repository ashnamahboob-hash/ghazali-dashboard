/* ===== v2 improvements ===== */
var SOON={ps:"ډیر ژر",fa:"به‌زودی",ur:"جلد",en:"Soon"};
var DONE={ps:"بشپړ",fa:"کامل",ur:"مکمل",en:"Detailed"};
var MORE={ps:"نور وښایه",fa:"نمایش بیشتر",ur:"مزید دیکھیں",en:"Show more"};
var LESS={ps:"لږ وښایه",fa:"نمایش کمتر",ur:"کم دکھائیں",en:"Show less"};
var SUMM={ps:"لنډیز",fa:"خلاصه",ur:"خلاصہ",en:"Summary"};
I.cross='<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>';
I.mortar='<path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M14 11l5-6"/>';
H.forEach(function(p){if(p.s)p.s=p.s.replace(/\s*\(to be verified\)/i,"")});
function isReal(p){return !!(p&&p.taj&&Object.prototype.hasOwnProperty.call(wordDetailLayout.records,p.taj[0]))}
function isRich(p){return isReal(p)}
var _card=card;
card=function(p){var h=_card(p);if(!isRich(p))return h;var k=h.lastIndexOf("</i></div></div>");if(k<0)return h;
 return h.slice(0,k)+'</i><span class="badge-done">✓ '+(DONE[lang]||DONE.en)+'</span></div></div>'};
function enhanceDetail(){
 var a=document.getElementById("app"),T=t();if(!a)return;
 var bar=a.querySelector(".bar");if(!bar)return;
 var pp=H[cur],pid=pp&&pp.taj&&pp.taj[0];
 var ident=a.querySelector(".detail-identity-card");
 // old-style pages: put photos first, compact title
 if(!ident&&pid&&HERB_PHOTOS[pid]&&!a.querySelector(".pslots")){
  var tmp=document.createElement("div");tmp.innerHTML=stagePhotoSlots();
  var hero=a.querySelector(".hero"),anchor=bar;
  if(hero){var si=hero.querySelector("i"),sl=document.createElement("p");sl.className="sci-line";sl.setAttribute("dir","ltr");sl.textContent=si?si.textContent:"";hero.remove();bar.after(sl);anchor=sl}
  anchor.after(tmp.firstChild);
 }
 // other names: show first 4
 if(ident){
  var rows=[].slice.call(ident.querySelectorAll(".other-names dl>div"));
  if(rows.length>4){
   rows.slice(4).forEach(function(r){r.classList.add("more-hidden")});
   var on=ident.querySelector(".other-names"),b=document.createElement("button");b.type="button";b.className="show-more";
   b.textContent=(MORE[lang]||MORE.en)+" ("+(rows.length-4)+")";var op=false;
   b.onclick=function(){op=!op;rows.slice(4).forEach(function(r){r.classList.toggle("more-hidden",!op)});b.textContent=op?(LESS[lang]||LESS.en):(MORE[lang]||MORE.en)+" ("+(rows.length-4)+")"};
   on.appendChild(b);
  }
  var props=a.querySelector('[data-card="properties"]');if(props)ident.after(props);
 }
 // collect cards up to the first note
 var cards=[];
 for(var k=0;k<a.children.length;k++){
  var c=a.children[k];
  if(c.classList.contains("note"))break;
  if(!c.classList.contains("sec")||c.classList.contains("pslots")||c.classList.contains("detail-identity-card"))continue;
  var hh=c.querySelector("h3");if(hh&&/^\s*(سرچین|Source|منبع|ماخذ|مصدر)/.test(hh.textContent))continue;
  if(c.classList.contains("word-detail-field")||(!ident&&c.querySelector("h3")))cards.push(c);
 }
 var ICON={description:"book",origin:"pin",properties:"heart",chemistry:"flask",preparations:"mortar",uses:"cup",notes:"book",poisoning:"warn",history:"book",safety:"warn"};
 var jump=document.createElement("nav");jump.className="jump";jump.setAttribute("aria-label","sections");
 var firstOpen=false;
 cards.forEach(function(c){
  var id=c.getAttribute("data-card")||"",h3=c.querySelector("h3"),svg=h3&&h3.querySelector("svg");
  var title=id==="properties"?(SUMM[lang]||SUMM.en):(h3?h3.textContent.replace(/\s*:\s*$/,"").trim():"");
  var icon=ICON[id]?ic(ICON[id]):(svg?svg.outerHTML:ic("book"));
  var warn=id==="poisoning"||id==="safety"||c.classList.contains("warn");
  if(warn&&!ICON[id])icon=ic("warn");
  var det=document.createElement("details");det.className=c.className+" acc"+(id==="properties"?" summary-card":" acc-sub");
  if(warn)det.classList.add("warn");
  if(id)det.setAttribute("data-card",id);
  var sm=document.createElement("summary");sm.innerHTML='<span class="acc-t">'+icon+'<span></span></span>';sm.querySelector(".acc-t>span").textContent=title;
  var body=document.createElement("div");body.className="acc-body";while(c.firstChild)body.appendChild(c.firstChild);
  det.appendChild(sm);det.appendChild(body);
  var open=id==="properties"||warn||(!firstOpen&&id!=="properties");
  if(id!=="properties"&&!warn)firstOpen=true;
  det.open=open;c.replaceWith(det);
  var btn=document.createElement("button");btn.type="button";btn.innerHTML=icon+"<span></span>";btn.querySelector("span").textContent=title;
  btn.onclick=function(){det.open=true;sm.scrollIntoView({behavior:"smooth",block:"start"})};
  jump.appendChild(btn);
 });
 if(cards.length>1){
  var ps=a.querySelector(".pslots");(ps||bar).after(jump);
  var topbar=bar.getBoundingClientRect().height;if(topbar)jump.style.top=Math.round(topbar*0.62/(+fz||1))+"px";
 }
 // share button
 if(!bar.querySelector(".share-btn")){
  var sb=document.createElement("button");sb.className="back share-btn";sb.type="button";
  sb.setAttribute("aria-label",SHARE[lang]||SHARE.en);sb.innerHTML=ic("share");sb.onclick=function(){shareHerb(cur)};
  bar.appendChild(sb);
 }
}
var _render=render;
render=function(){_render.apply(this,arguments);if(view==="lib"&&cur!==null)enhanceDetail()};
render();

/* ===== v2.1: full-text search + share ===== */
var SHARE={ps:"شریک کړه",fa:"اشتراک",ur:"شیئر",en:"Share"};
var COPIED={ps:"کاپي شو",fa:"کپی شد",ur:"کاپی ہو گیا",en:"Copied"};
I.share='<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>';
var _ck={};
function contentKey(p){
 var k=lang+"|"+(p.taj?p.taj[0]:p.s);
 if(_ck[k]!==undefined)return _ck[k];
 var txt="";
 try{
  if(p.taj&&inStage(p)){var d=document.createElement("div");d.innerHTML=stagePlantDetails(p);txt=d.textContent}
  else{["ben","use","cau"].forEach(function(f){if(p[f])txt+=" "+(p[f][lang]||p[f].ps||"")})}
 }catch(e){txt=""}
 return _ck[k]=librarySearchKey(txt);
}
var _lm=libraryMatches;
libraryMatches=function(p,q){
 if(_lm(p,q))return true;
 return q.length>=3&&isRich(p)&&contentKey(p).indexOf(q)>-1;
};
function toast(msg){
 var el=document.createElement("div");el.textContent=msg;
 el.style.cssText="position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:var(--gold);color:#173b2d;padding:8px 18px;border-radius:999px;font-weight:700;z-index:99;font-size:14px";
 document.body.appendChild(el);setTimeout(function(){el.remove()},1600);
}
function shareHerb(i){
 var p=H[i],T=t(),a=document.getElementById("app");
 var sm=a.querySelector('[data-card="properties"] .acc-body');
 var body=sm?sm.innerText.replace(/\s*\n+\s*/g," · ").trim().slice(0,300):"";
 var text=herbDisplay(p)+(p.s?" ("+p.s+")":"")+"\n"+(body?body+"…\n":"")+"\n— "+T.title+"\n"+T.disc;
 if(navigator.share){navigator.share({title:herbDisplay(p),text:text}).catch(function(){})}
 else if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast(COPIED[lang]||COPIED.en)},function(){toast(text.slice(0,40))})}
 else toast(text.slice(0,40));
}
var _render2=render;
render=function(){
 _render2.apply(this,arguments);

};
render();

/* ===== v2.2: photos ===== */
window.HERB_PHOTOS=window.HERB_PHOTOS||{};
var PH_KEYS=["plant","leaf","flower","fruit","used"];
var PH_SOON={ps:"عکسونه ډیر ژر اضافه کېږي.",fa:"عکس‌ها به‌زودی اضافه می‌شوند.",ur:"تصاویر جلد شامل کی جائیں گی۔",en:"Photos coming soon."};
I.flower='<circle cx="12" cy="6.5" r="3"/><circle cx="17.5" cy="12" r="3"/><circle cx="12" cy="17.5" r="3"/><circle cx="6.5" cy="12" r="3"/><circle cx="12" cy="12" r="1.4"/>';
I.fruit='<path d="M12 7.5c-5-2.2-8.5 1.5-8.5 5.8 0 4 3 7.7 5.2 7.7 1.2 0 2-.7 3.3-.7s2.1.7 3.3.7c2.2 0 5.2-3.7 5.2-7.7 0-4.3-3.5-8-8.5-5.8z"/><path d="M12 7.5c0-2 1-3.3 3-4.2"/>';
function applyPhotos(){H.forEach(function(p){var id=p.taj&&p.taj[0],e=id&&HERB_PHOTOS[id];if(!e)return;var f=e.plant||e.leaf||e.flower||e.fruit||e.used;if(f)p.img=f})}
applyPhotos();pickFt();
function openPhoto(src,cap){
 var o=document.createElement("div");o.id="lightbox";o.innerHTML='<button aria-label="close">×</button><img alt=""><p></p>';
 o.querySelector("img").src=src;o.querySelector("p").textContent=cap||"";
 var close=function(){o.remove();document.removeEventListener("keydown",key)};var key=function(e){if(e.key==="Escape")close()};
 o.onclick=close;document.addEventListener("keydown",key);document.body.appendChild(o);
}
document.addEventListener("click",function(e){var b=e.target.closest("[data-photo]");if(b)openPhoto(b.dataset.photo,b.dataset.cap)});
stagePhotoSlots=function(all){
 var p=H[cur],id=p&&p.taj&&p.taj[0],e=(HERB_PHOTOS&&id&&HERB_PHOTOS[id])||{};
 var caps={ps:["بشپړ بوټی","پاڼه","ګل","مېوه یا کارېدونکې برخه"],fa:["گیاه کامل","برگ","گل","میوه یا بخش کاربردی"],ur:["مکمل پودا","پتّا","پھول","پھل یا استعمال شدہ حصہ"],en:["Whole plant","Leaf","Flower","Fruit or used part"]}[lang];
 var icons=["sprout","leaf","flower","fruit","fruit"];caps=caps.concat([{ps:"وچه یا کارېدونکې برخه",fa:"خشک یا بخش کاربردی",ur:"خشک یا استعمال شدہ حصہ",en:"Dried or used part"}[lang]]);
 var has=PH_KEYS.some(function(k){return e[k]}),first=all?null:PH_KEYS.find(function(k){return e[k]}),hero="";
 if(first){var hi=PH_KEYS.indexOf(first);hero='<button class="ps-hero" data-photo="'+esc(e[first])+'" data-cap="'+esc(caps[hi]+(e.lic&&e.lic[first]?' — '+e.lic[first]:''))+'"><img loading="lazy" src="'+esc(e[first])+'" alt="'+esc(caps[hi])+'"></button>'}
 var row=PH_KEYS.map(function(k,i){
  if(k===first)return"";
  if(!e[k]&&(has||k==="used"))return"";
  return e[k]?'<figure><button class="ps-img" data-photo="'+esc(e[k])+'" data-cap="'+esc(caps[i]+(e.lic&&e.lic[k]?' — '+e.lic[k]:''))+'"><img loading="lazy" src="'+esc(e[k])+'" alt="'+esc(caps[i])+'"></button><figcaption>'+esc(caps[i])+'</figcaption></figure>'
   :'<figure><div class="ps-empty" aria-hidden="true">'+ic(icons[i])+'</div><figcaption>'+esc(caps[i])+'</figcaption></figure>';
 }).join("");
 return '<section class="sec pslots"><h3>'+figCopy[lang][1]+'</h3>'+hero+'<div class="ps-row" style="grid-template-columns:repeat('+Math.max(1,Math.min(4,PH_KEYS.filter(function(k){return k!==first&&(e[k]||(!has&&k!=="used"))}).length))+',minmax(0,1fr))">'+row+'</div>'+
  (has?'':'<p class="ps-soon">'+(PH_SOON[lang]||PH_SOON.en)+'</p>')+(e.credit?'<p class="ps-credit">'+esc(e.credit)+'</p>':'')+(e.licCredit?'<p class="ps-credit">📷 '+esc(e.licCredit)+'</p>':'')+'</section>';
};
/* ===== v2.2: temperament filter ===== */
var MZL={ps:["ګرم","سوړ","وچ","لوند"],fa:["گرم","سرد","خشک","مرطوب"],ur:["گرم","سرد","خشک","تر"],en:["Hot","Cold","Dry","Moist"]};
var MZT={ps:"مزاج",fa:"مزاج",ur:"مزاج",en:"Temperament"};
var MZN={ps:"د کتاب لومړی یاد سوی مزاج؛ بشپړو بوټو ته.",fa:"نخستین مزاج ذکرشده در کتاب؛ برای گیاهان کامل.",ur:"کتاب میں پہلے مذکور مزاج؛ مکمل اندراجات کے لیے۔",en:"First temperament stated in the book; detailed herbs only."};
var mzSel={hot:false,cold:false,dry:false,wet:false},_mzc={};
function mzActive(){return mzSel.hot||mzSel.cold||mzSel.dry||mzSel.wet}
function mzOf(p){
 var id=p.taj&&p.taj[0];if(!id||!inStage(p))return null;
 if(_mzc[id]!==undefined)return _mzc[id];
 var r=null,sv=lang;
 try{lang="ps";var d=document.createElement("div");d.innerHTML=stagePlantDetails(p);var el=d.querySelector('[data-field="mzj"]');
  if(el){var tx=el.textContent.replace(/^\s*مزاج\s*:?/,"");
   var h=tx.search(/ګرم|سوړ|سړ|معتدل/),m=tx.search(/وچ|لوند/);
   r={};
   var hm=h>-1?tx.slice(h).match(/ګرم|سوړ|سړ|معتدل/)[0]:"";
   r.heat=/ګرم/.test(hm)?"hot":(/سوړ|سړ/.test(hm)?"cold":(/معتدل/.test(hm)?"neutral":null));
   var mm=m>-1?tx.slice(m).match(/وچ|لوند/)[0]:"";
   r.moist=mm==="وچ"?"dry":(mm==="لوند"?"wet":null);
  }}catch(e){r=null}
 lang=sv;return _mzc[id]=r;
}
function mzOK(p){
 if(!mzActive())return true;var r=mzOf(p);if(!r)return false;
 if(mzSel.hot&&r.heat!=="hot")return false;if(mzSel.cold&&r.heat!=="cold")return false;
 if(mzSel.dry&&r.moist!=="dry")return false;if(mzSel.wet&&r.moist!=="wet")return false;return true;
}
function mzRow(){
 var l=MZL[lang]||MZL.en,ks=["hot","cold","dry","wet"];
 return '<div class="mz-row" id="mz-row" role="group" aria-label="'+(MZT[lang]||MZT.en)+'"><span>'+(MZT[lang]||MZT.en)+'</span>'+
  ks.map(function(k,i){return '<button data-mz="'+k+'" aria-pressed="'+mzSel[k]+'" class="'+(mzSel[k]?'on':'')+'">'+l[i]+'</button>'}).join("")+'</div>'+(mzActive()?'<p class="mz-note">'+(MZN[lang]||MZN.en)+'</p>':'');
}
/* ===== v2.2: offline ===== */
try{if(/^https?:$/.test(location.protocol)&&"serviceWorker" in navigator){window.addEventListener("load",function(){try{navigator.serviceWorker.register("sw.js").catch(function(){})}catch(e){}})}}catch(e){}

var UNV={ps:"هویت لا تایید نه دی",fa:"هویت هنوز تأیید نشده",ur:"شناخت ابھی تصدیق شدہ نہیں",en:"Identity not yet confirmed"};
var PRD={ps:"محصول",fa:"فرآورده",ur:"مصنوعات",en:"Product"};
var HEATL={neutral:{ps:"معتدل",fa:"معتدل",ur:"معتدل",en:"Neutral"}};
var KIND={A:{ps:"حیواني",fa:"حیوانی",ur:"حیوانی",en:"Animal"},M:{ps:"معدني",fa:"معدنی",ur:"معدنی",en:"Mineral"}};
var HEATC={hot:"#e8956b",cold:"#6fb3d6",neutral:"#9bc28a"};
function glanceRow(p){
 var id=p&&p.taj&&p.taj[0];if(!id)return null;
 var g=document.createElement("div");g.className="glance";var n=0;
 var T=t(),L=MZL[lang]||MZL.en,rec=null;try{rec=tajRecords.find(function(r){return r[0]===id})}catch(e){}
 var note=rec&&rec[4]||"";
 if(KIND[id[0]]){g.insertAdjacentHTML("beforeend",'<span class="gchip"><i style="--c:#b49be0"></i>'+(KIND[id[0]][lang]||KIND[id[0]].en)+'</span>');n++}
 var mz=mzOf(p);
 if(mz&&mz.heat){var w=mz.heat==="hot"?L[0]:mz.heat==="cold"?L[1]:(HEATL.neutral[lang]||HEATL.neutral.en);
  g.insertAdjacentHTML("beforeend",'<span class="gchip"><i style="--c:'+HEATC[mz.heat]+'"></i>'+(MZT[lang]||MZT.en)+': <b>'+w+'</b> <small>('+({ps:"د کتاب لومړی یاد سوی",fa:"نخستین ذکرشده",ur:"پہلے مذکور",en:"first stated"}[lang])+')</small></span>');n++}
 if(/محصول|مه ورسره/.test(note)){g.insertAdjacentHTML("beforeend",'<span class="gchip"><i style="--c:#d9b873"></i>'+(PRD[lang]||PRD.en)+'</span>');n++}
 // Verification is managed by the dashboard; do not show an unverified-identity chip on plant pages.
 return n?g:null;
}
function clampIt(p){
 if(p.closest(".other-names")||p.closest(".detail-identity-card")||p.classList.contains("clamp"))return;
 if(p.textContent.length<300)return;
 p.classList.add("clamp");
 var b=document.createElement("button");b.type="button";b.className="more-btn";
 var m=(MORE[lang]||MORE.en),l=(LESS[lang]||LESS.en);b.textContent=m;
 b.onclick=function(){var o=p.classList.toggle("open");b.textContent=o?l:m};
 p.after(b);
}
var _enh2=enhanceDetail;
enhanceDetail=function(){
 _enh2();
 var a=document.getElementById("app"),ident=a.querySelector(".detail-identity-card");
 if(ident){var g=glanceRow(H[cur]);if(g)ident.after(g)}
 [].forEach.call(a.querySelectorAll(".detail-summary-row h3"),function(h){h.textContent=h.textContent.replace(/\s*[:：]\s*$/,"")});
 [].forEach.call(a.querySelectorAll('.detail-summary-row[data-field="mzr"]'),function(r){r.classList.add("is-harm")});
 [].forEach.call(a.querySelectorAll(".detail-summary-row p, .acc-body p"),clampIt);
};

/* ===== v3.1: source line + feedback ===== */
// ---- ډاټا: د نظرونو د ترلاسه کولو لار. دلته خپل شمېره (د هېواد کوډ سره، پرته له +) یا ایمیل ولیکئ ----
var FEEDBACK={whatsapp:"",email:""};
var FB={
 title:{ps:"ستاسو نظر",fa:"نظر شما",ur:"آپ کی رائے",en:"Your feedback"},
 hint:{ps:"د دې مدخل په اړه سمون، نوې معلومات، عکس یا وړاندیز ولیکئ.",fa:"درباره این مدخل اصلاح، اطلاعات تازه، عکس یا پیشنهاد بنویسید.",ur:"اس اندراج کے بارے میں اصلاح، نئی معلومات، تصویر یا تجویز لکھیں۔",en:"Write a correction, new information, a photo or a suggestion about this entry."},
 types:{ps:["سمون","نوې معلومات","عکس","نور"],fa:["اصلاح","اطلاعات تازه","عکس","دیگر"],ur:["اصلاح","نئی معلومات","تصویر","دیگر"],en:["Correction","New info","Photo","Other"]},
 ph:{ps:"خپل نظر دلته ولیکئ…",fa:"نظر خود را اینجا بنویسید…",ur:"اپنی رائے یہاں لکھیں…",en:"Write your feedback here…"},
 nm:{ps:"نوم (اختیاري)",fa:"نام (اختیاری)",ur:"نام (اختیاری)",en:"Name (optional)",ar:"الاسم (اختياري)"},
 send:{ps:"نظر ولیږه",fa:"ارسال نظر",ur:"رائے بھیجیں",en:"Send feedback"},
 empty:{ps:"لومړی نظر ولیکئ",fa:"ابتدا نظر را بنویسید",ur:"پہلے رائے لکھیں",en:"Please write something first"},
 saved:{ps:"ستاسو نظر ثبت شو. مننه!",fa:"نظر شما ثبت شد. سپاس!",ur:"آپ کی رائے محفوظ ہو گئی۔ شکریہ!",en:"Saved. Thank you!"},
 copied:{ps:"نظر کاپي شو او په دې وسیله کې ثبت شو",fa:"نظر کپی و ذخیره شد",ur:"رائے کاپی اور محفوظ ہو گئی",en:"Copied and saved on this device"},
 mine:{ps:"ستاسو پخواني نظرونه (په دې وسیله کې)",fa:"نظرهای قبلی شما (در این دستگاه)",ur:"آپ کی پچھلی آراء (اس ڈیوائس پر)",en:"Your earlier notes (on this device)"}
};
function fbLoad(){try{return JSON.parse(localStorage.getItem(window.gkStorageKey?window.gkStorageKey("gk_feedback"):"gk_feedback")||"[]")}catch(e){return[]}}
function fbSave(a){try{localStorage.setItem(window.gkStorageKey?window.gkStorageKey("gk_feedback"):"gk_feedback",JSON.stringify(a.slice(-200)))}catch(e){}try{if(window.gkSendFb&&a.length)window.gkSendFb(a[a.length-1])}catch(e){}}
function fbUrl(msg){
 var f=FEEDBACK||{};
 if(f.whatsapp)return "https://wa.me/"+String(f.whatsapp).replace(/\D/g,"")+"?text="+encodeURIComponent(msg);
 if(f.email)return "mailto:"+f.email+"?subject="+encodeURIComponent("غزالي خزانه نظر")+"&body="+encodeURIComponent(msg);
 return "";
}
function fbTid(box,id){return box._tg?box._tg().id:id}
function fbHead(box,id,nm){var t=box._tg?box._tg():{id:id,nm:nm};return "[غزالي خزانه] "+(t.id?t.id+" — "+t.nm:"عمومي / General")}
function buildFeedback(p){
 var id=(p&&p.taj&&p.taj[0])||"",nm=herbDisplay(p);
 var box=document.createElement("section");box.className="sec fb";
 var tp=FB.types[lang]||FB.types.en,sel=0;
 box.innerHTML='<h3></h3><p class="fb-hint"></p><div class="fb-types"></div><textarea rows="4"></textarea><input type="text" autocomplete="name"><button type="button" class="fb-send"></button><div class="fb-list" hidden><h4></h4><div></div></div>';
 box.querySelector("h3").textContent=FB.title[lang]||FB.title.en;
 box.querySelector(".fb-hint").textContent=FB.hint[lang]||FB.hint.en;
 var ta=box.querySelector("textarea"),inp=box.querySelector("input");ta.placeholder=FB.ph[lang]||FB.ph.en;inp.placeholder=FB.nm[lang]||FB.nm.en;
 box.querySelector(".fb-send").textContent=FB.send[lang]||FB.send.en;
 var tb=box.querySelector(".fb-types");
 tp.forEach(function(x,i){var b=document.createElement("button");b.type="button";b.textContent=x;if(!i)b.className="on";b.onclick=function(){sel=i;[].forEach.call(tb.children,function(c,j){c.className=j===i?"on":""})};tb.appendChild(b)});
 function renderList(){
  var mine=fbLoad().filter(function(x){return x.id===id}),L=box.querySelector(".fb-list");
  L.hidden=!mine.length;if(!mine.length)return;
  L.querySelector("h4").textContent=FB.mine[lang]||FB.mine.en;var d=L.querySelector("div");d.innerHTML="";
  mine.slice(-5).reverse().forEach(function(x){var e=document.createElement("div");e.className="fb-item";e.textContent=x.text;var sm=document.createElement("small");sm.textContent=x.type+" · "+new Date(x.ts).toLocaleDateString();e.appendChild(sm);d.appendChild(e)});
 }
 box.querySelector(".fb-send").onclick=function(){
  var text=ta.value.trim();if(!text){toast(FB.empty[lang]||FB.empty.en);ta.focus();return}
  var who=inp.value.trim(),type=tp[sel];
  var msg=fbHead(box,id,nm)+"\n"+type+"\n\n"+text+(who?"\n\n— "+who:"");
  var a=fbLoad();a.push({id:fbTid(box,id),type:type,text:text,name:who,ts:Date.now()});fbSave(a);
  var url=fbUrl(msg);
  if(url){window.open(url,"_blank");toast(FB.saved[lang]||FB.saved.en)}
  else if(!window.gkSendFb&&navigator.clipboard){navigator.clipboard.writeText(msg).then(function(){toast(FB.copied[lang]||FB.copied.en)},function(){toast(FB.saved[lang]||FB.saved.en)})}
  else toast(FB.saved[lang]||FB.saved.en);
  ta.value="";renderList();
 };
 renderList();return box;
}
var _enh3=enhanceDetail;
enhanceDetail=function(){
 _enh3();
 var a=document.getElementById("app");if(!a||a.querySelector(".fb"))return;
 var note=a.querySelector(".note"),line=null;
 {
  var srcs=[],seen=[];
  if(note)for(var n=note.nextElementSibling;n;n=n.nextElementSibling)if(n.classList.contains("sec")&&!n.classList.contains("fb"))srcs.push(n);
  [].forEach.call(a.children,function(c){if(c.classList.contains("sec")&&!c.classList.contains("acc")&&!c.classList.contains("pslots")&&!c.classList.contains("fb")&&!c.classList.contains("detail-identity-card")&&srcs.indexOf(c)<0){var h=c.querySelector("h3");if(h&&/سرچین|Source|منبع|ماخذ|مصدر/.test(h.textContent))srcs.push(c)}});
  if(srcs.length){
   line=document.createElement("p");line.className="src-line";
   var parts=[];
   srcs.forEach(function(c){
    var h=c.querySelector("h3");var lab=h?h.textContent.trim():"";
    [].forEach.call(c.querySelectorAll("p,a,li"),function(e){if(e.tagName==="P"&&e.querySelector("a"))return;if(e.tagName==="A"&&!e.closest("p")&&!e.closest("li")){}
     var tx=e.textContent.replace(/\s+/g," ").trim();if(!tx)return;
     if(e.tagName==="A"){var l=document.createElement("a");l.href=e.href;l.target="_blank";l.rel="noopener";l.textContent=tx;parts.push(l)}else if(!e.querySelector("a"))parts.push(tx)});
    if(lab&&parts.length){parts.unshift({lab:lab+":"})}
    c.remove();
   });
   var first=true;parts.forEach(function(x){if(x&&x.lab){line.appendChild(document.createTextNode(x.lab+" "));first=true;return}
    if(!first)line.appendChild(document.createTextNode(" · "));first=false;
    if(typeof x==="string")line.appendChild(document.createTextNode(x));else line.appendChild(x)});
   (note||a.lastElementChild).after(line);
  }
 }
 /* feedback form removed from entry pages */
};

/* ===== v4: only T001–T045 carry content; all others use the blank template ===== */
(function(){
 var drop=["ben","use","cau","mzj","mhy","khs","mzr","src","msl","bdl","otherNames","gal","gl","poster"];
 H.forEach(function(p){if(isReal(p))return;drop.forEach(function(k){delete p[k]});p.s=""});
 _ck={};
})();
var PEND={ps:"معلومات به وروسته زیات شي.",fa:"اطلاعات بعداً افزوده می‌شود.",ur:"معلومات بعد میں شامل کی جائیں گی۔",en:"Information will be added later."};
var NMLBL={ur:{ps:"اردو",fa:"اردو",ur:"اردو",en:"Urdu",ar:"الأردية"},en:{ps:"انګلیسي",fa:"انگلیسی",ur:"انگریزی",en:"English",ar:"الإنجليزية"}};
var BLANK_CARDS=[["description",["mhy"]],["origin",["origin"]],["properties",["mzj","khs","benefit","mzr","msl","bdl"]],["chemistry",["chem"]],["preparations",["experience"]],["uses",["use"]],["notes",["notes"]]];
function blankPlantDetails(p){
 var copy=wordDetailLayout.meta[lang],labels=wordDetailLayout.labels[lang],pend=PEND[lang]||PEND.en,rec=p.taj||[];
 var head=function(key,body){return '<div class="detail-identity-block" data-field="'+key+'"><h3>'+esc(copy[key])+'</h3>'+body+'</div>'};
 var empty='<p class="empty-field">'+esc(pend)+'</p>';
 var strip=function(x){return String(x||"").replace(/\s*\([^)]*\)/g,"").trim()};
 var names=[];if(rec[1])names.push([NMLBL.ur[lang]||NMLBL.ur.en,rec[1]]);if(rec[2])names.push([NMLBL.en[lang]||NMLBL.en.en,strip(rec[2])||rec[2]]);
 var html=bar(esc(herbDisplay(p)))+stagePhotoSlots();
 html+='<section class="sec word-detail-field detail-identity-card" data-card="identity">'+
  head("scientific",'<p class="scientific-name empty-field" dir="ltr" lang="la">—</p>')+
  head("family",'<p class="empty-field" dir="ltr" lang="la">—</p>')+
  head("names",names.length?'<div class="other-names"><dl>'+names.map(function(n){return '<div><dt>'+esc(n[0])+'</dt><dd dir="auto">'+esc(n[1])+'</dd></div>'}).join("")+'</dl></div>':empty)+'</section>';
 BLANK_CARDS.forEach(function(g){
  var id=g[0],body=g[1].map(function(k){return '<div class="'+(id==="properties"?"detail-summary-row":"detail-subsection")+'" data-field="'+k+'"><h3>'+esc(labels[k])+(id==="properties"?" :":"")+'</h3>'+empty+'</div>'}).join("");
  html+='<section class="sec word-detail-field" data-card="'+id+'">'+body+'</section>';
 });
 var src="";try{src=librarySource(p)}catch(e){}
 return html+'<div class="note">'+t().disc+'</div>'+src;
}
var _spd=stagePlantDetails;
stagePlantDetails=function(p){return isReal(p)?_spd(p):blankPlantDetails(p)};

/* ===== v4.1 ===== */
// code search: T45 / t045 / M44 → exact code
var _lm2=libraryMatches;
libraryMatches=function(p,q){
 var m=/^([tam])0*(\d{1,3})$/.exec(q);
 if(m)return !!(p.taj&&p.taj[0].toLowerCase()===m[1]+("00"+m[2]).slice(-3));
 return _lm2(p,q);
};
// typing mode (hide fixed nav while keyboard is open)
document.addEventListener("focusin",function(e){var t=e.target;if(t&&t.matches&&t.matches(".fb textarea,.fb input")){document.body.classList.add("typing");setTimeout(function(){try{t.scrollIntoView({block:"center",behavior:"smooth"})}catch(x){}},350)}});
document.addEventListener("focusout",function(e){var t=e.target;if(t&&t.matches&&t.matches(".fb textarea,.fb input"))setTimeout(function(){if(!document.activeElement||!document.activeElement.matches||!document.activeElement.matches(".fb textarea,.fb input"))document.body.classList.remove("typing")},150)});
// live home search
var HSL={ps:"ټول پایلې په کتابتون کې",fa:"همه نتایج در کتابخانه",ur:"تمام نتائج لائبریری میں",en:"All results in library"};
function homeLive(){
 var inp=document.getElementById("hs");if(!inp)return;
 var host=document.getElementById("hs-res");
 var q=librarySearchKey(inp.value);
 if(!q){if(host)host.remove();return}
 if(!host){host=document.createElement("div");host.id="hs-res";var row=document.querySelector(".home-hero")||document.querySelector(".search-row");row.after(host)}
 var res=[];H.forEach(function(p,i){if(isPublished(p)&&res.length<7&&libraryMatches(p,q))res.push(i)});
 host.innerHTML="";
 res.forEach(function(i){var p=H[i],b=document.createElement("button");b.type="button";var n=document.createElement("span");n.textContent=herbDisplay(p);b.appendChild(n);if(p.taj){var c=document.createElement("small");c.textContent=p.taj[0];b.appendChild(c)}b.onclick=function(){openHerb(i)};host.appendChild(b)});
 var all=document.createElement("button");all.type="button";all.className="hs-all";all.textContent=res.length?(HSL[lang]||HSL.en):"—";all.onclick=function(){go("lib",inp.value)};host.appendChild(all);
}
document.addEventListener("input",function(e){if(e.target&&e.target.id==="hs")homeLive()});
// photo attach in feedback card
FB.photo={ps:"عکس ورزیات کړئ",fa:"افزودن عکس",ur:"تصویر شامل کریں",en:"Add a photo"};
FB.rm={ps:"لرې کړه",fa:"حذف",ur:"ہٹائیں",en:"Remove"};
FB.manual={ps:"په واټساپ کې عکس په لاس ور ضمیمه کړئ",fa:"عکس را در واتساپ دستی پیوست کنید",ur:"واٹس ایپ میں تصویر خود منسلک کریں",en:"Please attach the photo manually in WhatsApp"};
FB.pnote={ps:"عکس د شریکولو له لارې (Share) لېږل کېږي؛ هلته واټساپ وټاکئ.",fa:"عکس از طریق اشتراک‌گذاری ارسال می‌شود؛ واتساپ را انتخاب کنید.",ur:"تصویر شیئر کے ذریعے بھیجی جاتی ہے؛ واٹس ایپ منتخب کریں۔",en:"The photo is sent via Share — choose WhatsApp there."};
function shrinkImage(file,cb){
 try{var img=new Image(),u=URL.createObjectURL(file);
  img.onload=function(){var m=1280,r=Math.min(1,m/Math.max(img.width,img.height)),c=document.createElement("canvas");c.width=Math.round(img.width*r);c.height=Math.round(img.height*r);c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);
   c.toBlob(function(b){cb(b?new File([b],"photo.jpg",{type:"image/jpeg"}):file,c.toDataURL("image/jpeg",.6))},"image/jpeg",.82)};
  img.onerror=function(){cb(file,u)};img.src=u}catch(e){cb(file,"")}
}
var _bf=buildFeedback;
buildFeedback=function(p){
 var box=_bf(p),send=box.querySelector(".fb-send"),id=(p&&p.taj&&p.taj[0])||"",nm=herbDisplay(p);
 var row=document.createElement("div");row.className="fb-photo";
 row.innerHTML='<label class="fb-add filelabel">'+ic("cam")+'<span></span><input type="file" accept="image/*"></label><img alt="" hidden><button type="button" class="fb-rm" hidden></button>';
 row.querySelector(".fb-add span").textContent=FB.photo[lang]||FB.photo.en;
 var fi=row.querySelector("input[type=file]");
 var im=row.querySelector("img"),rm=row.querySelector(".fb-rm");rm.textContent=FB.rm[lang]||FB.rm.en;
 var picked=null;
 fi.onchange=function(){var f=fi.files&&fi.files[0];if(!f)return;shrinkImage(f,function(file,url){picked=file;im.src=url;im.hidden=false;rm.hidden=false})};
 rm.onclick=function(){picked=null;fi.value="";im.hidden=true;rm.hidden=true};
 var note=document.createElement("p");note.className="fb-note";note.textContent=FB.pnote[lang]||FB.pnote.en;
 send.before(row);send.before(note);
 // wrap send to support sharing the photo
 var ta=box.querySelector("textarea"),inp=box.querySelector("input[type=text]");
 var orig=send.onclick;
 if(window.gkUpload){note.textContent=({ps:"عکس د نظر سره یو ځای ایډمین ته لېږل کېږي.",fa:"عکس همراه نظر برای مدیر ارسال می‌شود.",ur:"تصویر رائے کے ساتھ ایڈمن کو بھیجی جاتی ہے۔",en:"The photo is sent to the admin together with your note."})[lang]||""}
 send.onclick=function(ev){
  if(window.gkUpload){
   if(!window.gkWebUser&&!window.NativeAccount){toast(authText().sign_in_required);go('usr');return}
   var text0=ta.value.trim();if(!text0){toast(FB.empty[lang]||FB.empty.en);ta.focus();return}
   var tp0=box.querySelector(".fb-types .on"),who0=inp.value.trim();
   var e0={id:fbTid(box,id),type:tp0?tp0.textContent:"",text:text0,name:who0,ts:Date.now(),sent:true};
   var f0=picked;send.disabled=true;
   window.gkUpload(e0,f0).then(function(ok){send.disabled=false;if(ok){var a0=fbLoad();a0.push(e0);fbSave(a0);ta.value='';rm.onclick()}toast(ok?(FB.saved[lang]||FB.saved.en):({ps:"نظر ونه لېږل سو، بیا هڅه وکړئ",fa:"ارسال نشد، دوباره تلاش کنید",ur:"نہیں بھیجا جا سکا، دوبارہ کوشش کریں",en:"Could not send, please try again"})[lang])});
   return;
  }
  if(picked&&navigator.canShare&&navigator.canShare({files:[picked]})){
   var text=ta.value.trim();if(!text){toast(FB.empty[lang]||FB.empty.en);ta.focus();return}
   var tp=box.querySelector(".fb-types .on"),who=inp.value.trim();
   var msg=fbHead(box,id,nm)+"\n"+(tp?tp.textContent:"")+"\n\n"+text+(who?"\n\n— "+who:"");
   var a=fbLoad();a.push({id:fbTid(box,id),type:tp?tp.textContent:"",text:text,name:who,ts:Date.now()});fbSave(a);
   navigator.share({files:[picked],text:msg,title:"غزالي خزانه"}).then(function(){toast(FB.saved[lang]||FB.saved.en)}).catch(function(){});
   ta.value="";rm.onclick();var r=box.querySelector(".fb-list");if(r){}
   return;
  }
  var had=!!picked;orig.call(this,ev);if(had&&!(navigator.canShare)){toast(FB.manual[lang]||FB.manual.en)}
  if(had){rm.onclick()}
 };
 return box;
};
// keep live results after re-render
var _render4=render;
render=function(){_render4.apply(this,arguments);if(view==="home"&&homeQuery)homeLive()};

/* ===== v5: About page (replaces account button) ===== */
window.ABOUT={
 ps:{title:"د ایپ په اړه",link:"د ایپ په اړه، نظر او شریکول",prog:"د ثبت پرمختګ",share:"ایپ شریک کړئ",fbT:"نظر او وړاندیز",fbH:"د ایپ یا کوم بوټي په اړه نظر، سمون، نوي معلومات یا عکس ولیکئ. که د یو ځانګړي بوټي په اړه وي، لاندې یې وټاکئ.",pick:"د کوم بوټي په اړه؟ (اختیاري)",pph:"بوټی یا کوډ ولټوئ…",gen:"عمومي نظر",src:"سرچینه او اخطار",ver:"نسخه",shareTxt:"غزالي خزانه — د طبي بوټو علمي کتابتون"},
 fa:{title:"درباره برنامه",link:"درباره برنامه، نظر و اشتراک",prog:"پیشرفت ثبت",share:"اشتراک برنامه",fbT:"نظر و پیشنهاد",fbH:"درباره برنامه یا یک گیاه نظر، اصلاح، اطلاعات تازه یا عکس بنویسید. اگر درباره گیاه مشخصی است، آن را در پایین انتخاب کنید.",pick:"درباره کدام گیاه؟ (اختیاری)",pph:"نام یا کد گیاه را جستجو کنید…",gen:"نظر عمومی",src:"منبع و هشدار",ver:"نسخه",shareTxt:"گنجینه غزالی — کتابخانه علمی گیاهان دارویی"},
 ur:{title:"ایپ کے بارے میں",link:"ایپ کے بارے میں، رائے اور شیئر",prog:"اندراج کی پیش رفت",share:"ایپ شیئر کریں",fbT:"رائے اور تجویز",fbH:"ایپ یا کسی بوٹی کے بارے میں رائے، اصلاح، نئی معلومات یا تصویر لکھیں۔ اگر کسی خاص بوٹی کے بارے میں ہے تو نیچے منتخب کریں۔",pick:"کس بوٹی کے بارے میں؟ (اختیاری)",pph:"بوٹی یا کوڈ تلاش کریں…",gen:"عمومی رائے",src:"ماخذ اور انتباہ",ver:"ورژن",shareTxt:"غزالی خزانہ — طبی جڑی بوٹیوں کی علمی لائبریری"},
 en:{title:"About",link:"About, feedback & share",prog:"Entries completed",share:"Share the app",fbT:"Feedback & suggestions",fbH:"Write feedback, a correction, new information or a photo about the app or a herb. If it is about a specific herb, pick it below.",pick:"About which herb? (optional)",pph:"Search herb name or code…",gen:"General feedback",src:"Source & notice",ver:"Version",shareTxt:"Ghazali's Treasury — a scientific library of medicinal herbs"}
};
Object.assign(ABOUT.ps,{abT:"د ایپ په اړه",abP1:"«غزالي خزانه» د دودیز او عصري طب پر بنسټ د طبي بوټو د پېژندنې یو منظم او علمي مرکز دی. موخه مو دا ده چې د بوټو پېژندنه، سیمه‌ییز نومونه او علمي کارونې په اسانه او معیاري بڼه په پښتو ژبه وړاندې شي.",abP2:"د ایپ علمي ذخیره په پرله‌پسې ډول پراخېږي، او نوي بوټي، انځورونه او کره معلومات وخت پر وخت ورزیاتېږي."});
Object.assign(ABOUT.fa,{abT:"درباره برنامه",abP1:"«گنجینه غزالی» یک مرکز منظم و علمی برای شناخت گیاهان طبی بر پایه طب سنتی و مدرن است. هدف ما این است که شناخت گیاهان، نام‌های محلی و کاربردهای علمی آن‌ها به شکل ساده و معیاری ارائه شود.",abP2:"ذخیره علمی برنامه به‌طور پیوسته گسترش می‌یابد و گیاهان، تصاویر و اطلاعات دقیق جدید هر از چندی افزوده می‌شود."});
Object.assign(ABOUT.ur,{abT:"ایپ کے بارے میں",abP1:"«غزالی خزانہ» روایتی اور جدید طب کی بنیاد پر طبی جڑی بوٹیوں کی پہچان کا ایک منظم اور علمی مرکز ہے۔ ہمارا مقصد یہ ہے کہ جڑی بوٹیوں کی پہچان، مقامی نام اور علمی استعمال آسان اور معیاری انداز میں پیش کیے جائیں۔",abP2:"ایپ کا علمی ذخیرہ مسلسل وسیع ہو رہا ہے، اور نئی جڑی بوٹیاں، تصاویر اور مستند معلومات وقتاً فوقتاً شامل کی جاتی ہیں۔"});
Object.assign(ABOUT.en,{abT:"About the app",abP1:"“Ghazali’s Treasury” is an organised scientific centre for identifying medicinal plants, based on traditional and modern medicine. Our aim is to present plant identification, local names and scientific uses in a simple and standard way.",abP2:"The app’s scientific collection keeps growing, and new plants, images and verified information are added from time to time."});
I.info='<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>';
function shareApp(){
 var A=ABOUT[lang]||ABOUT.en,url=/^https?:$/.test(location.protocol)?location.href.split("#")[0]:"";
 var text=A.shareTxt+(url?"\n"+url:"");
 if(navigator.share){navigator.share({title:t().title,text:A.shareTxt,url:url||undefined}).catch(function(){})}
 else window.open("https://wa.me/?text="+encodeURIComponent(text),"_blank");
}
function aboutPage(){
 var T=t(),u=ui[lang],A=ABOUT[lang]||ABOUT.en,real=H.filter(isPublished).length,total=tajRecords.length;
 return bar(A.title)+
  '<section class="sec about-top"><div class="about about-brand">'+appEmblem()+'<strong>'+T.title+'</strong><p>'+T.tag+'</p><p>'+A.ver+' <b dir="ltr">2.1</b></p></div>'+
  '<div class="prog"><div class="prog-t"><span>'+A.prog+'</span><b dir="ltr">'+real+' / '+total+'</b></div><div class="prog-bar"><i style="width:'+(real/total*100).toFixed(1)+'%"></i></div></div>'+
  '<button class="share-app" onclick="shareApp()">'+ic("share")+'<span>'+A.share+'</span></button></section>'+
  '<section class="sec about-text"><h3>'+A.abT+'</h3><p>'+A.abP1+'</p><p>'+A.abP2+'</p></section>'+
  '<section class="sec"><p class="fb-hint"><b>'+u.offline+'</b> '+u.privacy+'</p></section>';
}
function buildGeneralFeedback(){
 var A=ABOUT[lang]||ABOUT.en,dummy={nm:{ps:"",fa:"",ur:"",en:""},s:""};
 var box=buildFeedback(dummy),sel=null;
 box.querySelector("h3").textContent=A.fbT;box.querySelector(".fb-hint").textContent=A.fbH;
 var wrap=document.createElement("div");
 wrap.innerHTML='<p class="pick-lbl"></p><div class="pick-chip"></div><input type="search" class="pick-in" autocomplete="off"><div class="pick-res" hidden></div>';
 wrap.querySelector(".pick-lbl").textContent=A.pick;
 var inp=wrap.querySelector(".pick-in"),res=wrap.querySelector(".pick-res"),chip=wrap.querySelector(".pick-chip");inp.placeholder=A.pph;
 box._tg=function(){return sel?{id:sel.id,nm:sel.nm}:{id:"",nm:""}};
 function show(){chip.innerHTML="";if(sel){var c=document.createElement("span");c.className="pick-sel";c.innerHTML='<span></span><button type="button" aria-label="x">×</button>';c.firstChild.textContent=sel.id+" — "+sel.nm;c.querySelector("button").onclick=function(){sel=null;show()};chip.appendChild(c)}inp.hidden=!!sel}
 inp.oninput=function(){
  var q=librarySearchKey(inp.value);res.innerHTML="";if(!q){res.hidden=true;return}
  var n=0;H.forEach(function(p){if(n>=6||!isPublished(p)||!libraryMatches(p,q))return;n++;var b=document.createElement("button");b.type="button";var s1=document.createElement("span");s1.textContent=herbDisplay(p);b.appendChild(s1);if(p.taj){var sm=document.createElement("small");sm.textContent=p.taj[0];b.appendChild(sm)}
   b.onclick=function(){sel={id:p.taj?p.taj[0]:"",nm:herbDisplay(p)};inp.value="";res.hidden=true;show()};res.appendChild(b)});
  res.hidden=!n;
 };
 box.querySelector(".fb-hint").after(wrap);show();
 var ph=box.querySelector(".fb-list");if(ph)ph.style.display="none";
 return box;
}
var _render5=render;
render=function(){
 _render5.apply(this,arguments);
 if(view==="about"||view==="feedback"){var h=document.getElementById("about-fb");if(h&&!h.firstChild)h.appendChild(buildGeneralFeedback())}
};
render();

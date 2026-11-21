/* Shared rendering for original and dashboard-imported entry names. */
var GK_ENTRY_NAME_LANGUAGES = [
 ['ar','عربي|عربی|العربية|Arabic',{ps:'عربي',fa:'عربی',ur:'عربی',en:'Arabic'}],
 ['fa','فارسي|فارسی|الفارسية|Persian|Farsi|دري|دری',{ps:'فارسي',fa:'فارسی',ur:'فارسی',en:'Persian'}],
 ['ur','اردو|اردوئی|الأردية|Urdu',{ps:'اردو',fa:'اردو',ur:'اردو',en:'Urdu'}],
 ['en','انګلیسي|انگلیسی|انگریزی|الإنجليزية|English',{ps:'انګلیسي',fa:'انگلیسی',ur:'انگریزی',en:'English'}],
 ['ps','پښتو|پشتو|البشتوية|Pashto',{ps:'پښتو',fa:'پشتو',ur:'پشتو',en:'Pashto'}],
 ['sd','سندي|سندی|سندھی|السندية|Sindhi',{ps:'سندي',fa:'سندی',ur:'سندھی',en:'Sindhi'}],
 ['bn','بنګالي|بنگالی|بنګالی|بنگلہ|البنغالية|Bengali',{ps:'بنګالي',fa:'بنگالی',ur:'بنگالی',en:'Bengali'}],
 ['gu','ګجراتي|گجراتی|الغجراتية|Gujarati',{ps:'ګجراتي',fa:'گجراتی',ur:'گجراتی',en:'Gujarati'}],
 ['mr','مرهټي|مرهتی|مرہٹی|مرہ\\s*ٹی|المراتية|Marathi',{ps:'مرهټي',fa:'مرهتی',ur:'مرہٹی',en:'Marathi'}],
 ['sa','سنسکرت|سنسکریت|السنسكريتية|Sanskrit',{ps:'سنسکرت',fa:'سنسکریت',ur:'سنسکرت',en:'Sanskrit'}],
 ['hi','هندي|ہندی|هندی|الهندية|Hindi',{ps:'هندي',fa:'هندی',ur:'ہندی',en:'Hindi'}],
 ['ne','نیپالي|نیپالی|النيبالية|Nepali',{ps:'نیپالي',fa:'نیپالی',ur:'نیپالی',en:'Nepali'}],
 ['la','لاتیني|الطینی|لاتینی|Latin',{ps:'لاتیني',fa:'لاتینی',ur:'الطینی',en:'Latin'}]
];
function gkEntryLanguage(label) {
 return GK_ENTRY_NAME_LANGUAGES.find(function(row){return new RegExp('^(?:'+row[1]+')$','i').test(String(label||'').trim());});
}
function gkEntryNameRows(input,displayLang) {
 var rows=[],seen=new Set();
 function add(label,value){
  label=String(label||'').trim();value=String(value||'').trim();
  if(!value)return;
  var known=gkEntryLanguage(label);if(known)label=known[2][displayLang]||known[2].en;
  var id=label+'\u0000'+value;if(seen.has(id))return;seen.add(id);rows.push([label,value]);
 }
 function parse(text){
  String(text||'').split(/[\n؛;]+/).map(function(s){return s.trim();}).filter(Boolean).forEach(function(part){
   var aliases=GK_ENTRY_NAME_LANGUAGES.map(function(r){return r[1];}).join('|');
   var language='(?:'+aliases+')';
   var marker=new RegExp('('+language+'(?:\\s*(?:اور|و|and|&)\\s*'+language+')*(?:\\s*اور\\s*عام\\s*زبان)?)\\s*(?:[:：]|میں|کې)','gi');
   var matches=Array.from(part.matchAll(marker));
   if(!matches.length){var colon=part.search(/[:：]/);if(colon>0)add(part.slice(0,colon),part.slice(colon+1));else add('',part);return;}
   var prefix=part.slice(0,matches[0].index).replace(/(?:،|,|اور|جبکہ)\s*$/,'').trim();
   if(prefix){var colon=prefix.search(/[:：]/);if(colon>0)add(prefix.slice(0,colon),prefix.slice(colon+1));else add('',prefix);}
   matches.forEach(function(m,i){
    var value=part.slice(m.index+m[0].length,i+1<matches.length?matches[i+1].index:part.length)
     .replace(/\s*کہتے\s*ہیں[۔.]?\s*$/,'').replace(/\s*(?:،|,)?\s*(?:اور|جبکہ)\s*$/,'').replace(/[،,\s]+$/,'').trim();
    var labels=m[1].replace(/\s*اور\s*عام\s*زبان$/,'').split(/\s*(?:اور|\band\b|&)\s*|\s+و\s+/i);
    labels.forEach(function(label){add(label,value);});
   });
  });
 }
 if(Array.isArray(input))input.forEach(function(row){if(Array.isArray(row)&&row[0])add(row[0],row[1]);else if(Array.isArray(row))parse(row[1]);else parse(row);});
 else parse(input);
 return rows;
}

/* Keep verification links below the source line for every entry layout. */
var GK_ENTRY_VERIFY_LABEL={ps:'د تایید لینک',fa:'پیوند بررسی',ur:'تصدیق کا لنک',en:'Verification link'};
function gkEntryVerificationFooter(){
 var app=document.getElementById('app');if(!app||typeof cur!=='number'||!H[cur])return;
 var identity=app.querySelector('.detail-identity-card');if(!identity)return;
 var links=[],seen=new Set();
 function add(url,label){
  try{var u=new URL(url,location.href);if(!/^https?:$/.test(u.protocol)||seen.has(u.href))return;seen.add(u.href);links.push([u.href,label]);}catch(e){}
 }
 app.querySelectorAll('.entry-verification').forEach(function(el){el.remove();});
 identity.querySelectorAll('a[href]').forEach(function(a){add(a.href,a.textContent);a.remove();});
 var plant=H[cur];if(plant.link)add(plant.link,GK_ENTRY_VERIFY_LABEL[lang]||GK_ENTRY_VERIFY_LABEL.en);
 if(!links.length)return;
 var footer=document.createElement('p');footer.className='src-line entry-verification';
 links.forEach(function(item,i){if(i)footer.appendChild(document.createTextNode(' · '));var a=document.createElement('a');a.href=item[0];a.target='_blank';a.rel='noopener noreferrer';a.textContent=item[1]||GK_ENTRY_VERIFY_LABEL[lang]||GK_ENTRY_VERIFY_LABEL.en;footer.appendChild(a);});
 app.appendChild(footer);
}
var gkEntryPreviousEnhance=enhanceDetail;
enhanceDetail=function(){gkEntryPreviousEnhance.apply(this,arguments);gkEntryVerificationFooter();};

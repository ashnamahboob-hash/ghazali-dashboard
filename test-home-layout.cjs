const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=require('./tools/app-source.cjs')();
const between=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)+a.length));
const ctx={I:{},H:[{taj:['T017'],img:'data:image/jpeg;base64,test',nm:{}}],lang:'ps',selectedProvince:'',provinces:['کندهار'],homeQuery:'',window:{},ic:x=>'<svg data-icon="'+x+'"></svg>',isPublished:p=>!!p,esc:x=>String(x),herbDisplay:()=> 'Celery',t:()=>({title:'Title',tag:'Tag',ph:'Search',lib:'Library'}),appEmblem:()=>'<span>Logo</span>',discoveryCards:()=>'<section>Discovery</section>',bar:t=>'<header>'+t+'</header>'};
vm.createContext(ctx);
for(const [a,b] of [['var regionText=','I.spark='],['var homeLabels=','function featuredHerbs'],['var referenceSections=','var otherNameLabels='],['var feedbackLabels=','const settingsLabels='],['function regionPage(page){','pickFt();']])vm.runInContext(between(a,b),ctx);
for(const lang of ['ps','fa','ur','en']){
 ctx.lang=lang;const home=ctx.homePage();
 assert.equal((home.match(/class="tile"/g)||[]).length,4);
 assert(home.includes("go('feedback')"));assert(home.includes(ctx.feedbackLabels[lang]));
 for(const key of ['regions','health','pharmacopoeia','qanun'])assert(home.includes("go('"+key+"')"));
 assert(!home.includes("go('farming')"));assert(!home.includes("go('compounds')"));
 assert(home.includes('<img class="library-cover library-collage"'));
 const region=ctx.regionPage('regions');assert(region.includes('cultivation-fold'));assert(region.includes(ctx.regionText[lang][1]));
 assert(region.includes('select'));ctx.selectedProvince='کندهار';assert(ctx.regionPage('regions').includes('کندهار'));ctx.selectedProvince='';
}
ctx.H=[];assert(ctx.libraryCover().includes('library-collage'),'library card keeps its own herbal photo while approved plant photos load');
assert(html.includes('view==="feedback"'));assert(html.includes('if(view==="about"||view==="feedback")'));
console.log('Passed: four home tiles, four-language feedback labels, distinct herbal photo on the library card, nested cultivation and province selection.');

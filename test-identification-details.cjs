const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/app/index.html','utf8');
for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))if(!/^<script[^>]*type="module"/.test(m[0]))new vm.Script(m[1]);
const start=html.indexOf('var DETAIL_TEXT='),end=html.indexOf('function renderRes(rs,box)',start);
const ctx={URL,AbortController,setTimeout,clearTimeout,console,view:'home',lang:'ps',speciesKey:s=>String(s||'').trim().replace(/\s+/g,' ').toLowerCase(),esc:s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'),appLanguage:()=>ctx.lang};
vm.createContext(ctx);vm.runInContext(html.slice(start,end),ctx);
const layouts=html.slice(html.indexOf('const wordDetailLayout ='),html.indexOf('/* WORD_DETAIL_LAYOUT_END */'));
// Use the real book data rather than a copy of the renderer's expected structure.
vm.runInContext(layouts.slice(0,layouts.indexOf('\nfunction detailParagraphs'))+'\nthis.book=wordDetailLayout;',ctx);
ctx.wordDetailLayout=ctx.book;ctx.H=[{taj:['T001']}];ctx.nameOf=()=>'<Fig>';ctx.librarySource=()=>'<p>book page 1</p>';ctx.T2=()=>({open:'Open'});
for(const l of ['ps','fa','ur','en','ar']){
 ctx.lang=l;
 const out=ctx.bookSpeciesDetails([0],l);assert(out.includes('idtext'),l+' book fields');assert(out.includes('&lt;Fig&gt;'));assert(!out.includes('undefined'));
 const missing=ctx.externalSpeciesDetails('Blepharis ciliaris',l);assert(missing.includes(ctx.DETAIL_TEXT[l].loading));
 ctx.speciesDetails[ctx.detailKey('Blepharis ciliaris',l)]={state:'missing'};assert(ctx.externalSpeciesDetails('Blepharis ciliaris',l).includes(ctx.DETAIL_TEXT[l].missing));
}
assert.equal(ctx.splitSourceExtract('Plant description.\n\n== Uses ==\n\nTraditional use.\n\n== References ==\nOther text','en').uses,'Traditional use.');
assert.equal(ctx.splitSourceExtract('پېژندنه\n\n== استعمال ==\n\nد سرچینې متن','ps').uses,'د سرچینې متن');
assert.equal(ctx.splitSourceExtract('Description without uses.','en').uses,'');
(async()=>{
 let requests=0;ctx.fetch=async url=>{requests++;const u=new URL(url),ps=u.hostname.startsWith('ps.');return {ok:true,json:async()=>({query:{pages:[ps?{title:'انځر',extract:'د انځر ماهیت\n\n== استعمال ==\n\nاستعمال'}:{title:'Ficus carica',extract:'Ficus carica is a plant.',langlinks:[{lang:'ps',title:'انځر'}]}]}})}};
 const both=await Promise.all([ctx.fetchSpeciesDetails('Ficus carica','ps'),ctx.fetchSpeciesDetails('Ficus carica','ps')]);assert.equal(requests,2,'coalesce duplicate requests and follow language link');assert.equal(both[0].uses,'استعمال');
 assert(ctx.externalSpeciesDetails('Ficus carica','ps').includes('https://ps.wikipedia.org/wiki/'));
 ctx.fetch=async()=>({ok:true,json:async()=>({query:{pages:[{title:'Blepharis',extract:'Blepharis is a genus.'}]}})});
 assert.equal((await ctx.fetchSpeciesDetails('Blepharis ciliaris','en')).state,'missing','reject broader taxon');
 ctx.fetch=async()=>{throw new Error('offline')};assert.equal((await ctx.fetchSpeciesDetails('Offline species','fa')).state,'error');

 ctx.infoRow=(label,value)=>'<p>'+ctx.esc(label)+': '+ctx.esc(value)+'</p>';
 let sourceCalls=0;
 ctx.fetch=async url=>{
  sourceCalls++;
  const u=new URL(url);
  if(u.hostname==='api.gbif.org')return {ok:true,json:async()=>({matchType:'EXACT',rank:'SPECIES',kingdom:'Plantae',canonicalName:'Ficus carica',scientificName:'Ficus carica L.',usageKey:5361909,family:'Moraceae'})};
  if(u.hostname==='en.wikipedia.org')return {ok:true,json:async()=>({query:{pages:[{title:'Fig',pageprops:{wikibase_item:'Q36146'}}]}})};
  assert.equal(u.searchParams.get('ids'),'Q36146','resolve scientific redirect before fetching Wikidata');
  return {ok:true,json:async()=>({entities:{Q36146:{id:'Q36146',claims:{P225:[{mainsnak:{datavalue:{value:'Ficus carica'}}}]},descriptions:{ps:{language:'ps',value:'د انځر پېژندنه'},en:{language:'en',value:'Fig species'}}}}})};
 };
 await Promise.all([ctx.fetchExtraSource('Ficus carica','gbif'),ctx.fetchExtraSource('Ficus carica','gbif'),ctx.fetchExtraSource('Ficus carica','wikidata')]);
 assert.equal(sourceCalls,3,'coalesce GBIF and resolve Wikidata redirect');
 for(const l of ['ps','fa','ur','ar','en']){
  const out=ctx.extraSpeciesDetails('Ficus carica',l);
  assert(out.includes(ctx.EXTRA_TEXT[l].taxonomy));assert(out.includes('Moraceae'));assert(out.includes('https://www.gbif.org/species/5361909'));
  if(l==='ps')assert(out.includes('د انځر پېژندنه'));else if(l!=='en'){assert(out.includes(ctx.DETAIL_TEXT[l].missing));assert(!out.includes('Fig species'),'no silent English fallback');}
 }
 ctx.fetch=async()=>({ok:true,json:async()=>({matchType:'HIGHERRANK',rank:'GENUS',kingdom:'Plantae',canonicalName:'Unknown species',usageKey:1})});
 assert.equal((await ctx.fetchExtraSource('Unknown species','gbif')).state,'missing');
 assert.equal(ctx.exactEntity({claims:{P225:[{rank:'deprecated',mainsnak:{datavalue:{value:'Ficus carica'}}}]}},'Ficus carica'),false);
 assert.equal(ctx.exactEntity({claims:{P225:[{mainsnak:{datavalue:{value:'Ficus palmata'}}}]}},'Ficus carica'),false);
 ctx.fetch=async()=>{throw Error('offline')};
 assert.equal((await ctx.fetchExtraSource('Offline extra','gbif')).state,'error');
 console.log('Passed: five-language real book fields, escaping, source sections, missing translations, exact species guard, request coalescing, offline errors, script parsing.');
})().catch(e=>{console.error(e);process.exitCode=1});

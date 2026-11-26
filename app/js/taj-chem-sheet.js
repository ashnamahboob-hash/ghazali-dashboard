/* Taj al-Mufradat chemistry: compact cards and accessible bottom sheet. */
(function(){
"use strict";
var previous=window.bkChem, savedOverflow="", active=null;
function close(){
 var sheet=document.getElementById("gk-chem-sheet");if(sheet)sheet.remove();
 document.body.style.overflow=savedOverflow;
 if(active){active.focus({preventScroll:true});active=null;}
}
window.gkCloseChem=close;
window.bkChem=function(btn){
 var book=btn.closest(".bk");if(!book || book.classList.contains("md-monograph")){if(typeof previous==="function")return previous(btn);return;}
 close();active=btn;
 book.querySelectorAll(".bk-crow").forEach(function(el){el.classList.toggle("on",el===btn)});
 var n=btn.getAttribute("data-n")||"",d=btn.getAttribute("data-d")||"",v=btn.getAttribute("data-v")||"";
 var lang=book.getAttribute("lang")||"ps";
 var labels={ps:["افعال او ځانګړتیاوي","بندول","اټکلي برخه"],fa:["اثرات و ویژگی‌ها","بستن","سهم تقریبی"],ur:["افعال اور خصوصیات","بند کریں","تخمینی حصہ"],en:["Actions and properties","Close","Approximate share"]}[lang]||["افعال او ځانګړتیاوي","بندول","اټکلي برخه"];
 function el(tag,cls,txt){var x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;}
 var outer=el("div","gk-chem-overlay");outer.id="gk-chem-sheet";
 var backdrop=el("button","gk-chem-backdrop");backdrop.type="button";backdrop.setAttribute("aria-label",labels[1]);backdrop.onclick=close;
 var panel=el("section","gk-chem-panel");panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");panel.setAttribute("aria-label",n);panel.setAttribute("dir",book.getAttribute("dir")||"rtl");
 var handle=el("div","gk-chem-handle");
 var header=el("div","gk-chem-header");var title=el("h3","",n);
 var dismiss=el("button","gk-chem-close","×");dismiss.type="button";dismiss.setAttribute("aria-label",labels[1]);dismiss.onclick=close;
 header.append(title,dismiss);
 var body=el("div","gk-chem-body");
 if(v!=="")body.appendChild(el("p","gk-chem-share",labels[2]+": ~"+v+"%"));
 body.appendChild(el("h4","",labels[0]));
 body.appendChild(el("p","gk-chem-description",d||"—"));
 panel.append(handle,header,body);outer.append(backdrop,panel);
 savedOverflow=document.body.style.overflow;document.body.style.overflow="hidden";
 document.body.appendChild(outer);dismiss.focus({preventScroll:true});
 };
 document.addEventListener("keydown",function(e){if(e.key==="Escape"&&document.getElementById("gk-chem-sheet"))close();});
})();

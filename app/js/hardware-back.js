/* Android back button / browser back: one history entry per page step, pushed at the moment of the user's tap
   (browsers skip entries pushed without a tap, so we never re-push inside popstate). */
(function(){
  var depth = 0, skip = false;
  function push(){ try { history.pushState({ gk: ++depth }, ""); } catch (e) {} }
  function sync(){ if (depth > 0) { var n = depth; depth = 0; skip = true; try { history.go(-n); } catch (e) { skip = false; } } }
  var baseRemember = rememberPage;
  rememberPage = function(){ var r = baseRemember.apply(this, arguments); push(); return r; };
  function slide(sign){
    try {
      if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!app || !app.animate) return;
      /* calm "fade-through": new page fades in from 40% with a tiny rise; going back is a plain fade */
      var from = sign > 0 ? { opacity: .4, transform: "translateY(10px)" } : { opacity: .4, transform: "none" };
      app.animate([from, { opacity: 1, transform: "none" }], { duration: 220, easing: "cubic-bezier(.2,0,0,1)" });
    } catch (e) {}
  }
  function moved(before, sign){ if (view !== before[0] || cur !== before[1]) slide(sign); }
  var baseGo = go;
  go = function(){ var b = [view, cur], r = baseGo.apply(this, arguments); moved(b, 1); if (view === "home" && pageTrail.length === 0) sync(); return r; };
  var baseOpenHerb = openHerb;
  openHerb = function(){ var b = [view, cur], r = baseOpenHerb.apply(this, arguments); moved(b, 1); return r; };
  var baseGoBack = goBack;
  goBack = function(){ var b = [view, cur], r = baseGoBack.apply(this, arguments); moved(b, -1); return r; };
  window.addEventListener("load", function(){
    if (typeof afOpenPlant === "function") { var baseOpenPlant = afOpenPlant; afOpenPlant = function(){ var r = baseOpenPlant.apply(this, arguments); push(); slide(1); return r; }; }
    if (typeof afClosePlant === "function") { var baseClosePlant = afClosePlant; afClosePlant = function(){ var r = baseClosePlant.apply(this, arguments); slide(-1); return r; }; }
  });
  window.addEventListener("popstate", function(){
    if (skip) { skip = false; return; }
    if (depth > 0) depth--;
    try {
      if (typeof afSelectedId !== "undefined" && afSelectedId !== null) { afClosePlant(); return; }
      goBack();
    } catch (e) {}
  });
})();

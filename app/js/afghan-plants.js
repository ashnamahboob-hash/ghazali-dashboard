/* moved to data/afghan-embed.js */
var afPlants = null, afLoading = false, afQuery = "", afCat = "all", afSelectedId = null;

var AF_UI = {
  ps: { allProv: "ټول", search: "د بوټي نوم یا ګټه ولټوئ...", found: "بوټي وموندل شول", allCat: "ټول", mizaj: "مزاج", ben: "طبي ګټې", loc: "د پیدا کېدو سیمې", warn: "احتیاط او خبرداری", src: "سرچینې او علمي لینکونه", backList: "بېرته لېست ته", loading: "معلومات راولول کېږي..." },
  fa: { allProv: "همه ولایات", search: "جستجوی نام گیاه یا فایده...", found: "گیاه یافت شد", allCat: "همه", mizaj: "مزاج", ben: "فواید طبی", loc: "مناطق رویش", warn: "احتیاط و هشدار", src: "منابع و لینک‌های علمی", backList: "بازگشت به فهرست", loading: "در حال بارگذاری..." },
  ur: { allProv: "تمام صوبے", search: "پودے کا نام یا فائدہ تلاش کریں...", found: "پودے ملے", allCat: "سب", mizaj: "مزاج", ben: "طبی فوائد", loc: "پائے جانے کے علاقے", warn: "احتیاط اور انتباہ", src: "مآخذ اور سائنسی لنکس", backList: "فہرست پر واپس", loading: "لوڈ ہو رہا ہے..." },
  en: { allProv: "All Provinces", search: "Search plant name or benefit...", found: "plants found", allCat: "All", mizaj: "Temperament", ben: "Medicinal Benefits", loc: "Native Regions", warn: "Caution & Warning", src: "Sources & Scientific Links", backList: "Back to list", loading: "Loading..." }
};

/* Data source: Firestore collection "afghan_plants" (managed from the dashboard). Falls back to the JSON file. */
var afSource = "json", afFS = null, afPhotos = {}, afPhotoLoading = {};
function afWaitDb(ms) {
  return new Promise(function(res) {
    if (window.gkFirebase && window.gkFirebase.db) return res(window.gkFirebase.db);
    var t = setTimeout(function() { res(null); }, ms);
    window.addEventListener("gk-firebase-ready", function() { clearTimeout(t); res(window.gkFirebase ? window.gkFirebase.db : null); }, { once: true });
  });
}
function afLoadFirestore() {
  return afWaitDb(6000).then(function(db) {
    if (!db) return null;
    return import("https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js").then(function(m) {
      afFS = m;
      return m.getDocs(m.collection(db, "afghan_plants")).then(function(snap) {
        var a = []; snap.forEach(function(d) { var x = d.data(); x.id = d.id; a.push(x); }); return a;
      });
    });
  });
}
function afLoadJson() {
  afLoadCredits();
  return fetch("ghazali_all_100_plants_final.json").then(function(r) { return r.json(); }).catch(function() { return AF_EMBED; });
}
var afCol = null;
try { afCol = new Intl.Collator(["ps", "fa", "ar"]); } catch (e) { afCol = { compare: function(a, b) { return a < b ? -1 : a > b ? 1 : 0; } }; }
function afSort(list) {
  return list.slice().sort(function(a, b) {
    if (a.no != null && b.no != null && a.no !== b.no) return a.no - b.no;
    return afCol.compare(a.name_ps || "", b.name_ps || "");
  });
}
function afLoadData() {
  if (afPlants || afLoading) return;
  afLoading = true;
  afLoadFirestore().catch(function() { return null; }).then(function(list) {
    if (list && list.length) { afSource = "fs"; return list; }
    return afLoadJson();
  }).then(function(list) {
    afPlants = afSort(list || []); afLoading = false; if (view === "regions") render();
  }).catch(function() { afLoading = false; afPlants = afSort(AF_EMBED); if (view === "regions") render(); });
}
function afLoadPhotos(id) {
  if (afPhotos[id] || afPhotoLoading[id] || !afFS || !window.gkFirebase) return;
  afPhotoLoading[id] = true;
  afFS.getDocs(afFS.collection(window.gkFirebase.db, "afghan_plants", String(id), "photos")).then(function(snap) {
    var a = []; snap.forEach(function(d) { var x = d.data(); x._n = Number(d.id) || 0; if (/^data:image\//.test(x.data || "")) a.push(x); });
    a.sort(function(x, y) { return x._n - y._n; });
    afPhotos[id] = a; afPhotoLoading[id] = false;
    if (String(afSelectedId) === String(id) && view === "regions") render();
  }).catch(function() { afPhotos[id] = []; afPhotoLoading[id] = false; });
}
function afGalleryHtml(p) {
  if (afSource === "fs") {
    if (!(p.photoCount > 0)) return "";
    var ph = afPhotos[p.id];
    if (!ph) { afLoadPhotos(p.id); return ""; }
    if (!ph.length) return "";
    var cr = ph.map(function(x, i) {
      var parts = [x.author, x.license, x.source].filter(function(v) { return v && String(v).trim(); });
      return parts.length ? '<div class="af-credit">' + (i + 1) + ". " + esc(parts.join(" · ")) + "</div>" : "";
    }).join("");
    return '<div class="af-gallery">' + ph.map(function(x) { return '<img alt="' + esc(p.name_en || "") + '" src="' + x.data + '">'; }).join("") + "</div>" + cr;
  }
  return '<div class="af-gallery">' + [1, 2, 3, 4].map(function(n) { return '<img loading="lazy" alt="' + esc(p.name_en || "") + '" src="' + afImgUrl(p.id, n) + '" onerror="this.remove()">'; }).join("") + "</div>" + afCreditLine(p.id);
}

/* Photos: put files in app/afghan-plants/ named 001.jpg (main), 001-2.jpg, 001-3.jpg, 001-4.jpg.
   Optional credits: app/afghan-plants/credits.json  { "1": {"author":"","license":"","source":""} } */
var AF_IMG_DIR = "afghan-plants/", afCredits = {}, afCreditsLoaded = false;
function afImgUrl(id, n) {
  var s = String(id); while (s.length < 3) s = "0" + s;
  return AF_IMG_DIR + s + (n > 1 ? "-" + n : "") + ".jpg";
}
function afLoadCredits() {
  if (afCreditsLoaded) return;
  afCreditsLoaded = true;
  fetch(AF_IMG_DIR + "credits.json").then(function(r) { return r.ok ? r.json() : {}; })
    .then(function(j) { afCredits = j || {}; if (afSelectedId !== null && view === "regions") render(); })
    .catch(function() {});
}
function afCreditLine(id) {
  var c = afCredits[String(id)];
  if (!c) return "";
  var parts = [c.author, c.license, c.source].filter(function(x) { return x && String(x).trim(); });
  return parts.length ? '<div class="af-credit">' + esc(parts.join(" · ")) + '</div>' : "";
}
function afField(p, base) {
  var preferred = p[base + "_" + lang];
  if (typeof preferred === "string" && preferred.trim()) return preferred;
  if (lang === "en") {
    // Do not mislabel Pashto medical text as English; translations require review.
    return base === "name" ? (p.name_en || p.name_ps || "") : "English translation pending";
  }
  return p[base + "_ps"] || "";
}

function afIsCold(p) {
  return (p.mizaj_ps || "").indexOf("سوړ") > -1 || (p.mizaj_fa || "").indexOf("سرد") > -1;
}

function afOpenPlant(id) { afSelectedId = id; render(); window.scrollTo(0, 0); }
function afClosePlant() { afSelectedId = null; render(); window.scrollTo(0, 0); }
function afSetProv(v) { selectedProvince = v; render(); }
function afSetQuery(v) { afQuery = v; afRenderListOnly(); }

/* Use one consistent location matcher for province counts and filtered results.
   General regional descriptions are not evidence of presence in every province. */
function afProvinceMatches(p, pr) {
  if (!pr) return true;
  var location = String(p.location_ps || "");
  var normalized = function(v) {
    return String(v).replace(/[يىې]/g, "ی").replace(/ك/g, "ک").replace(/\s+/g, " ").trim();
  };
  var text = normalized(location), name = normalized(pr);
  return text.indexOf(name) !== -1 || /(?:په )?ټول هېواد|ټول افغانستان|په ټول افغانستان/.test(text);
}
function afProvCount(pr) {
  if (!afPlants) return 0;
  return afPlants.filter(function(p) { return afProvinceMatches(p, pr); }).length;
}
function afPickProv(i) {
  selectedProvince = i < 0 ? "" : provinces[i];
  var btns = document.querySelectorAll(".af-provs button");
  for (var k = 0; k < btns.length; k++) btns[k].classList.toggle("on", Number(btns[k].getAttribute("data-i")) === i);
  afRenderListOnly();
}
/* Province display names are localized; canonical Pashto keys remain unchanged for filtering. */
var AF_PROV_NAMES = {
 en:["Badakhshan","Badghis","Baghlan","Balkh","Bamyan","Daykundi","Farah","Faryab","Ghazni","Ghor","Helmand","Herat","Jowzjan","Kabul","Kandahar","Kapisa","Khost","Kunar","Kunduz","Laghman","Logar","Nangarhar","Nimroz","Nuristan","Paktia","Paktika","Panjshir","Parwan","Samangan","Sar-e Pol","Takhar","Uruzgan","Maidan Wardak","Zabul"],
 fa:["بدخشان","بادغیس","بغلان","بلخ","بامیان","دایکندی","فراه","فاریاب","غزنی","غور","هلمند","هرات","جوزجان","کابل","قندهار","کاپیسا","خوست","کنر","کندز","لغمان","لوگر","ننگرهار","نیمروز","نورستان","پکتیا","پکتیکا","پنجشیر","پروان","سمنگان","سرپل","تخار","ارزگان","میدان وردک","زابل"],
 ur:["بدخشان","بادغیس","بغلان","بلخ","بامیان","دایکندی","فراہ","فاریاب","غزنی","غور","ہلمند","ہرات","جوزجان","کابل","قندھار","کاپیسا","خوست","کنڑ","قندوز","لغمان","لوگر","ننگرہار","نیمروز","نورستان","پکتیا","پکتیکا","پنجشیر","پروان","سمنگان","سرپل","تخار","ارزگان","میدان وردک","زابل"]
};
function afProvName(pr) {
 var i = provinces.indexOf(pr), names = AF_PROV_NAMES[lang];
 return i < 0 || !names || !names[i] ? pr : names[i];
}
function afProvChips(u) {
  var items = provinces.map(function(pr, i) { return { i: i, n: afProvCount(pr), name: afProvName(pr) }; })
    .sort(function(a, b) { return b.n - a.n; });
  var all = '<button data-i="-1" class="' + (selectedProvince === "" ? "on" : "") + '" onclick="afPickProv(-1)">' + u.allProv + '<small>' + afPlants.length + '</small></button>';
  return '<div class="af-provs">' + all + items.map(function(x) {
    var cls = (selectedProvince === provinces[x.i] ? "on" : "") + (x.n === 0 ? " zero" : "");
    return '<button data-i="' + x.i + '" class="' + cls.trim() + '" onclick="afPickProv(' + x.i + ')">' + esc(x.name) + '<small>' + x.n + '</small></button>';
  }).join("") + '</div>';
}
function afFilterPlants() {
  if (!afPlants) return [];
  var qv = afQuery.trim().toLowerCase();
  return afPlants.filter(function(p) {
    if (!afProvinceMatches(p, selectedProvince)) return false;
    if (qv) {
      var hay = [p.name_ps, p.name_fa, p.name_ur, p.name_en, p.scientific_name, p.benefits_ps, p.benefits_fa, p.benefits_ur, p.location_ps].join(" ").toLowerCase();
      if (hay.indexOf(qv) === -1) return false;
    }
    return true;
  });
}

function afRenderCards(list) {
  if (!list.length) return '<div class="empty">' + t().none + '</div>';
  return list.map(function(p) {
    var hasWarn = !!(p.warning_ps && p.warning_ps.trim());
    var mzClass = afIsCold(p) ? "cold" : "hot";
    return '<div class="af-card" onclick="afOpenPlant(\'' + p.id + '\')">' +
      (afSource === "fs" ? (/^data:image\//.test(p.thumb || "") ? '<img class="af-thumb" alt="" src="' + p.thumb + '">' : "") : '<img class="af-thumb" loading="lazy" alt="" src="' + afImgUrl(p.id, 1) + '" onerror="this.remove()">') +
      '<div class="af-card-top"><div><b>' + esc(afField(p, "name")) + '</b><i>' + esc(p.scientific_name) + '</i></div>' +
      (hasWarn ? '<span class="af-mz warn-tag">⚠</span>' : '') + '</div>' +
      '<div class="af-badges"><span class="af-mz ' + mzClass + '">' + esc(afField(p, "mizaj")) + '</span></div>' +
      '<p class="af-sum">' + esc(afField(p, "benefits")) + '</p>' +
      '<div class="af-loc">📍 ' + esc(afField(p, "location")) + '</div></div>';
  }).join("");
}

function afRenderListOnly() {
  var list = afFilterPlants(), u = AF_UI[lang] || AF_UI.ps;
  var cEl = document.getElementById("af-count"), lEl = document.getElementById("af-list");
  if (cEl) cEl.textContent = list.length + " " + u.found;
  if (lEl) lEl.innerHTML = afRenderCards(list);
}

var _origRegionPage = typeof regionPage === "function" ? regionPage : null;
regionPage = function(v) {
  if (v !== "regions") return _origRegionPage ? _origRegionPage(v) : "";
  var u = AF_UI[lang] || AF_UI.ps;
  if (!afPlants) {
    afLoadData();
    return bar(regionText[lang][0]) + '<div class="empty">' + u.loading + '</div>';
  }
  if (afSelectedId !== null) {
    var p = afPlants.find(function(x) { return String(x.id) === String(afSelectedId); });
    if (p) {
      var warnTxt = afField(p, "warning");
      return '<div class="bar"><button class="back" onclick="afClosePlant()" aria-label="back">' + ic("back") + '</button><h2>' + esc(afField(p, "name")) + '</h2></div>' +
        afGalleryHtml(p) +
        '<div class="sec"><i class="scientific-name" dir="ltr" style="font-size:18px;color:var(--gold)">' + esc(p.scientific_name) + '</i>' +
        '<div class="names" style="margin-top:12px;margin-bottom:0">' +
        '<div><small>پښتو</small>' + esc(p.name_ps) + '</div><div><small>دري / فارسی</small>' + esc(p.name_fa) + '</div>' +
        '<div><small>اردو</small>' + esc(p.name_ur) + '</div><div><small>English</small>' + esc(p.name_en) + '</div></div></div>' +
        '<div class="glance"><span class="gchip"><i></i><small>' + u.mizaj + ':</small> ' + esc(afField(p, "mizaj")) + '</span>' +
        '<span class="gchip"><i></i>' + esc(p.category) + '</span></div>' +
        '<div class="sec"><h3>' + ic("heart") + u.ben + '</h3><p>' + esc(afField(p, "benefits")) + '</p></div>' +
        '<div class="sec"><h3>' + ic("pin") + u.loc + '</h3><p>' + esc(afField(p, "location")) + '</p></div>' +
        (warnTxt ? '<div class="sec warn"><h3>' + ic("warn") + u.warn + '</h3><p>' + esc(warnTxt) + '</p></div>' : '') +
        '<div class="sec"><h3>' + u.src + '</h3><p style="font-size:13.5px;color:var(--soft)">' + esc(p.source) + '</p>' +
        '<div class="af-links">' + (p.source_links || []).map(function(lk) {
          var lbl = lk.indexOf("kew") > -1 ? "POWO (Kew)" : lk.indexOf("gbif") > -1 ? "GBIF" : lk.indexOf("fao") > -1 ? "FAO" : "مخزن الادویه";
          return '<a href="' + esc(lk) + '" target="_blank" rel="noopener">' + lbl + ' ↗</a>';
        }).join("") + '</div></div>' +
        '<div class="note">' + t().disc + '</div>';
    }
  }
  var list = afFilterPlants();
  return bar(regionText[lang][0]) +
    '<div class="af-wrap"><div class="af-controls">' +
    '<input class="af-search" type="search" value="' + esc(afQuery) + '" placeholder="' + esc(u.search) + '" oninput="afSetQuery(this.value)">' +
    '</div>' + afProvChips(u) +
    '<div class="af-count" id="af-count">' + list.length + ' ' + u.found + '</div>' +
    '<div id="af-list" class="af-wrap">' + afRenderCards(list) + '</div></div>';
};

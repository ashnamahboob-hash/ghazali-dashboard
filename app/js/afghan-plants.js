/* moved to data/afghan-embed.js */
var afPlants = null, afLoading = false, afQuery = "", afCat = "all", afSelectedId = null;
var afProvExpanded = false, afLayout = "grid";
try { afLayout = localStorage.getItem("gk_afghan_layout") === "list" ? "list" : "grid"; } catch (e) {}

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
    function ready() {
      clearTimeout(t);
      window.removeEventListener("gk-firebase-ready", ready);
      res(window.gkFirebase ? window.gkFirebase.db : null);
    }
    var t = setTimeout(function() {
      window.removeEventListener("gk-firebase-ready", ready);
      res(null);
    }, ms);
    window.addEventListener("gk-firebase-ready", ready);
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
  return fetch("ghazali_all_100_plants_final.json").then(function(r) {
    if (!r.ok) throw new Error("Afghan plant backup unavailable: " + r.status);
    return r.json();
  }).then(function(list) {
    return Array.isArray(list) ? list : AF_EMBED;
  }).catch(function() { return AF_EMBED; });
}
var afCol = null;
try { afCol = new Intl.Collator(["ps", "fa", "ar"]); } catch (e) { afCol = { compare: function(a, b) { return a < b ? -1 : a > b ? 1 : 0; } }; }
function afSort(list) {
  return list.slice().sort(function(a, b) {
    if (a.no != null && b.no != null && a.no !== b.no) return a.no - b.no;
    return afCol.compare(a.name_ps || "", b.name_ps || "");
  });
}
var afRefreshLoading = false;
function afRefreshLiveData() {
  if (afSource === "fs" || afLoading || afRefreshLoading || !afPlants ||
      !window.gkFirebase || !window.gkFirebase.db) return;
  afRefreshLoading = true;
  afLoadFirestore().then(function(list) {
    if (!Array.isArray(list) || !list.length) return;
    afPlants = afSort(list);
    afSource = "fs";
    afPhotos = {};
    afPhotoLoading = {};
    if (afSelectedId !== null && !afPlants.some(function(p) { return String(p.id) === String(afSelectedId); })) {
      afSelectedId = null;
    }
    if (view === "regions") render();
  }).catch(function() {
    // Keep the existing offline list until live data becomes available.
  }).then(function() { afRefreshLoading = false; });
}
window.addEventListener("gk-firebase-ready", afRefreshLiveData);
window.addEventListener("online", afRefreshLiveData);
function afLoadData() {
  if (afPlants || afLoading) return;
  afLoading = true;
  afLoadFirestore().catch(function() { return null; }).then(function(list) {
    if (Array.isArray(list) && list.length) { afSource = "fs"; return list; }
    afSource = "json";
    return afLoadJson();
  }).then(function(list) {
    afPlants = afSort(Array.isArray(list) ? list : []); afLoading = false; if (view === "regions") render();
    if (afSource !== "fs") afRefreshLiveData();
  }).catch(function() { afSource = "json"; afLoading = false; afPlants = afSort(AF_EMBED); if (view === "regions") render(); });
}
function afLoadPhotos(id) {
  if (afPhotos[id] || afPhotoLoading[id] || !afFS || !window.gkFirebase || !window.gkFirebase.db) return;
  afPhotoLoading[id] = true;
  afFS.getDocs(afFS.collection(window.gkFirebase.db, "afghan_plants", String(id), "photos")).then(function(snap) {
    var a = []; snap.forEach(function(d) { var x = d.data(); x._n = Number(d.id) || 0; if (/^data:image\//.test(x.data || "")) a.push(x); });
    a.sort(function(x, y) { return x._n - y._n; });
    afPhotos[id] = a; afPhotoLoading[id] = false;
    if (String(afSelectedId) === String(id) && view === "regions") render();
  }).catch(function() {
    // A failed request is not an empty gallery: allow another attempt after reconnect.
    afPhotoLoading[id] = false;
  });
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
    // Missing warning must stay absent; never fabricate a caution section.
    if (base === "warning") return "";
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
  afProvExpanded = false;
  render();
}
function afToggleProvs() {
  afProvExpanded = !afProvExpanded;
  var grid = document.getElementById("af-provs-grid"), toggle = document.getElementById("af-prov-toggle");
  if (grid) grid.hidden = !afProvExpanded;
  if (toggle) toggle.setAttribute("aria-expanded", String(afProvExpanded));
}
function afSetLayout(mode) {
  afLayout = mode === "list" ? "list" : "grid";
  try { localStorage.setItem("gk_afghan_layout", afLayout); } catch (e) {}
  var list = document.getElementById("af-list");
  if (list) list.setAttribute("data-layout", afLayout);
  document.querySelectorAll(".af-layout-mode [data-af-layout]").forEach(function(b) {
    b.setAttribute("aria-pressed", String(b.dataset.afLayout === afLayout));
  });
}
function afLayoutIcon(mode) {
  return '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    (mode === "grid" ? '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' : '<path d="M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1"/>') + '</svg>';
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
  var items = provinces.map(function(pr, i) { return { i: i, n: afProvCount(pr), name: afProvName(pr) }; });
  var comparator = new Intl.Collator(lang, { sensitivity: "base" });
  items.sort(function(a, b) { return comparator.compare(a.name, b.name); });
  var title = selectedProvince ? afProvName(selectedProvince) : ({ ps: "ولایتونه", fa: "ولایت‌ها", ur: "صوبے", en: "Provinces" })[lang];
  var all = '<button type="button" data-i="-1" class="' + (selectedProvince === "" ? "on" : "") +
    '" onclick="afPickProv(-1)" aria-pressed="' + (selectedProvince === "") + '">' + esc(u.allProv) + '<small>' + afPlants.length + '</small></button>';
  var cells = items.map(function(x) {
    var selected = selectedProvince === provinces[x.i];
    var cls = (selected ? "on" : "") + (x.n === 0 ? " zero" : "");
    return '<button type="button" data-i="' + x.i + '" class="' + cls.trim() + '" aria-pressed="' + selected +
      '" onclick="afPickProv(' + x.i + ')"><span>' + esc(x.name) + '</span><small>' + x.n + '</small></button>';
  }).join("");
  return '<div class="af-prov-panel"><button type="button" class="af-prov-toggle" id="af-prov-toggle" onclick="afToggleProvs()" aria-controls="af-provs-grid" aria-expanded="' +
    afProvExpanded + '"><span>' + esc(title) + '</span><span class="af-prov-chevron" aria-hidden="true">⌄</span></button>' +
    '<div class="af-provs" id="af-provs-grid"' + (afProvExpanded ? "" : " hidden") + '>' + all + cells + '</div></div>';
}
function afFilterPlants() {
  if (!afPlants) return [];
  // Normalize common Arabic/Persian letter variants in searches across all four languages.
  var normalizeSearch = function(v) {
    return String(v == null ? "" : v).toLowerCase()
      .replace(/[يىې]/g, "ی").replace(/ك/g, "ک")
      .replace(/[\u064B-\u065F\u0670]/g, "").trim();
  };
  var qv = normalizeSearch(afQuery);
  return afPlants.filter(function(p) {
    if (!afProvinceMatches(p, selectedProvince)) return false;
    if (qv) {
      var hay = normalizeSearch([p.name_ps, p.name_fa, p.name_ur, p.name_en, p.scientific_name,
        p.benefits_ps, p.benefits_fa, p.benefits_ur, p.location_ps, p.location_fa, p.location_ur,
        p.category].join(" "));
      if (hay.indexOf(qv) === -1) return false;
    }
    return true;
  });
}

function afRenderCards(list) {
  if (!list.length) return '<div class="empty">' + esc(t().none) + '</div>';
  return list.map(function(p) {
    var name = afField(p, "name"), scientific = p.scientific_name || "";
    var photo = afSource === "fs"
      ? (/^data:image\//.test(p.thumb || "") ? '<img class="af-thumb" alt="" src="' + esc(p.thumb) + '">' : "")
      : '<img class="af-thumb" loading="lazy" alt="" src="' + esc(afImgUrl(p.id, 1)) + '" onerror="this.remove()">';
    return '<button type="button" class="af-card" data-af-id="' + esc(p.id) + '">' +
      '<span class="af-photo" aria-hidden="true">' + ic("leaf") + photo + '</span>' +
      '<span class="af-card-top"><b>' + esc(name) + '</b>' +
      (scientific ? '<i dir="ltr">' + esc(scientific) + '</i>' : '') +
      '<small class="af-loc">' + ic("pin") + esc(afField(p, "location")) + '</small></span></button>';
  }).join("");
}
document.addEventListener("click", function(event) {
  var card = event.target.closest("#af-list .af-card[data-af-id]");
  if (card) afOpenPlant(card.getAttribute("data-af-id"));
});
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
        '<div class="af-links">' + (Array.isArray(p.source_links) ? p.source_links : []).filter(function(lk) { return typeof lk === "string" && /^https:\/\//i.test(lk); }).map(function(lk) {
          var lbl = /powo\.science\.kew\.org/i.test(lk) ? "POWO (Kew)" : /(?:www\.)?gbif\.org/i.test(lk) ? "GBIF" : /(?:www\.)?fao\.org/i.test(lk) ? "FAO" : /archive\.org/i.test(lk) ? "Internet Archive" : (lang === "en" ? "Source" : lang === "fa" ? "منبع" : lang === "ur" ? "ماخذ" : "سرچینه");
          return '<a href="' + esc(lk) + '" target="_blank" rel="noopener">' + lbl + ' ↗</a>';
        }).join("") + '</div></div>' +
        '<div class="note">' + t().disc + '</div>';
    }
  }
  var list = afFilterPlants();
  var labels = {
    ps: ["لست", "کارتونه"], fa: ["فهرست", "کارت‌ها"],
    ur: ["فہرست", "کارڈز"], en: ["List", "Grid"]
  }[lang];
  return '<div class="af-wrap"><div class="af-sticky">' + bar(regionText[lang][0]) +
    '<div class="af-controls"><span class="af-search-icon" aria-hidden="true">' + ic("search") + '</span>' +
    '<input class="af-search" type="search" value="' + esc(afQuery) + '" placeholder="' + esc(u.search) +
    '" aria-label="' + esc(u.search) + '" oninput="afSetQuery(this.value)"></div>' +
    '<div class="af-filter-row">' + afProvChips(u) +
    '<div class="af-layout-mode">' + ["list", "grid"].map(function(k, j) {
      return '<button type="button" data-af-layout="' + k + '" title="' + esc(labels[j]) +
        '" aria-label="' + esc(labels[j]) + '" aria-pressed="' + (afLayout === k) +
        '" onclick="afSetLayout(\'' + k + '\')">' + afLayoutIcon(k) + '</button>';
    }).join("") + '</div></div></div>' +
    '<div class="af-count" id="af-count" aria-live="polite">' + list.length + ' ' + esc(u.found) + '</div>' +
    '<div id="af-list" class="af-results" data-layout="' + afLayout + '">' + afRenderCards(list) + '</div></div>';
};

/* ============================================================
   邏輯與渲染（含中英切換）—— 平常不需要動這個檔
   ============================================================ */
(function () {
  "use strict";
  var S = window.SITE || {};
  var P = window.PROJECTS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var initial = String(S.name || "H").trim().charAt(0);

  /* ---------- 語言 ---------- */
  function readPreference(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function savePreference(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  var LANG_KEY = "pf-lang";
  var lang = document.documentElement.lang === "en" ? "en" : "zh"; // Restored by the head bootstrap before first paint.
  function cleanText(v) { return String(v).replace(/[—–]+/g, ", ").replace(/(20\d\d),\s*(20\d\d)/g, lang === "zh" ? "$1 至 $2" : "$1 to $2"); }
  function t(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "zh" in v))
      return cleanText(v[lang] != null ? v[lang] : (v.en != null ? v.en : v.zh)).replace(/ · /g, " / ").replace(/ ● /g, " / ");
    return v == null ? "" : cleanText(v).replace(/ · /g, " / ").replace(/ ● /g, " / ");
  }
  function tagKey(tg) { return typeof tg === "object" ? tg.en : tg; }
  var UI = {
    en: { view:"View project", featured:"Featured", seeFull:"See full case",
          back:"Back to projects", prev:"Previous project", next:"Next project",
          year:"Year", role:"Role", stack:"Stack", tags:"Tags", details:"Details",
          repo:"Source", demo:"Live", article:"Article", all:"All",
          notFound:"Project not found", notFoundLink:"project list",
          notFoundPre:"Please pick one from the ", notFoundPost:".",
          builtBy:"Computer Vision / Edge AI", copied:"Copied ✓", sep:", " },
    zh: { view:"查看專案", featured:"精選專案", seeFull:"看完整介紹",
          back:"返回專案列表", prev:"上一個專案", next:"下一個專案",
          year:"年份", role:"角色", stack:"技術", tags:"標籤", details:"詳情",
          repo:"原始碼", demo:"線上版本", article:"技術文章", all:"全部",
          notFound:"找不到這個專案", notFoundLink:"專案列表",
          notFoundPre:"請回到 ", notFoundPost:" 重新選擇。",
          builtBy:"電腦視覺 / 邊緣 AI", copied:"已複製 ✓", sep:"、" },
  };
  function u(k) { return UI[lang][k]; }

  /* ---------- 共用：導覽列（僅渲染一次；文字交給 applyI18n） ---------- */
  function renderNav() {
    var host = $("#site-nav"); if (!host) return;
    var page = document.body.getAttribute("data-page") || "home";
    var active = page === "project" ? "projects" : page;
    var links = [
      { p: "home", href: "index.html", en: "Home", zh: "首頁" },
      { p: "about", href: "about.html", en: "About", zh: "關於" },
      { p: "projects", href: "projects.html", en: "Projects", zh: "專案" },
      { p: "contact", href: "index.html#contact", en: "Contact", zh: "聯絡" },
    ];
    host.innerHTML =
      '<nav class="nav"><div class="nav-in">' +
        '<a href="index.html" class="logo" aria-label="Henry Yu home"><span class="mk">' + initial + '</span>' + (S.brand || S.name || "") + '</a>' +
        '<div class="nav-right"><div class="nav-links" id="nav-links">' +
          links.map(function (l) {
            return '<a href="' + l.href + '"' + (l.p === active ? ' class="active" aria-current="page"' : "") +
              ' data-en="' + l.en + '" data-zh="' + l.zh + '">' + l.en + '</a>';
          }).join("") +
        '</div>' +
        '<button type="button" class="icon-btn" id="lang" aria-label="切換語言 / language">中</button>' +
        '<button type="button" class="icon-btn" id="theme" aria-label="切換主題 / theme" title="亮/暗" aria-pressed="false">◐</button>' +
        '<button type="button" class="icon-btn burger" id="burger" aria-controls="nav-links" aria-label="選單 / menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>' +
        '</div></div></nav>';
  }

  /* ---------- 共用：頁尾 ---------- */
  function renderFooter() {
    var host = $("#site-foot"); if (!host) return;
    host.innerHTML =
      '<footer class="site-foot"><div class="wrap foot-in">' +
        '<a href="index.html" class="logo" aria-label="Henry Yu home"><span class="mk">' + initial + '</span>' + (S.brand || "") + '</a>' +
        '<div class="socials">' +
          '<a href="' + (S.github || "#") + '" title="GitHub" aria-label="GitHub" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>' +
          '<a href="' + (S.linkedin || "#") + '" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>' +
          '<a href="mailto:' + (S.email || "") + '" title="Email" aria-label="Email"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>' +
        '</div>' +
        '<span>© ' + new Date().getFullYear() + ' ' + (S.name || "") + ' / ' + u("builtBy") + '</span>' +
      '</div></footer>';
  }

  /* ---------- data-bind（來自 SITE，雙語） ---------- */
  function bindSite() {
    var map = { brand: S.brand, name: S.name, role: S.role, tagline: S.tagline, location: S.location, email: S.email };
    Object.keys(map).forEach(function (k) {
      $$('[data-bind="' + k + '"]').forEach(function (e) { e.textContent = t(map[k]); });
    });
    $$('[data-bind="status"]').forEach(function (e) { e.textContent = t(S.status); });
    $$('[data-href="github"]').forEach(function (e) { e.href = S.github || "#"; });
    $$('[data-href="linkedin"]').forEach(function (e) { e.href = S.linkedin || "#"; });
    $$('[data-href="resume"]').forEach(function (e) { e.href = S.resume || "#"; if (!S.resume || S.resume === "#") { e.setAttribute("aria-disabled", "true"); e.title = lang === "zh" ? "履歷 PDF 尚未提供，請先聯絡我" : "CV PDF not provided; please contact me"; } else { e.removeAttribute("aria-disabled"); } });
    $$('[data-href="email"]').forEach(function (e) { e.href = "mailto:" + (S.email || ""); });
  }

  /* ---------- 工具 ---------- */
  function coverAttrs(p) {
    if (p.cover) {
      var pos = p.coverPos ? ";background-position:" + p.coverPos : "";
      return { cls: "has-img", style: ' style="background-image:url(\'' + p.cover + '\')' + pos + '"', label: "", tag: "" };
    }
    return { cls: (p.accent || "cv1"), style: "", label: t(p.title), tag: t(p.kicker || (p.tags && p.tags[0]) || "") };
  }
  function covTag(c) { return c.tag ? '<span class="cov-tag">' + c.tag + '</span>' : ""; }
  function tagsHtml(p) { return (p.tags || []).map(function (tg) { return "<span>" + t(tg) + "</span>"; }).join(""); }

  var synopses = {
    "itri-smart-kiosk": { en: "An ITRI collaboration connecting vision, voice and multimodal AI in a hands-free kiosk.", zh: "與工研院合作，整合影像、語音與多模態 AI，打造不用動手的服務機台。" },
    "smart-sop": { en: "An on-site vision system that checks manufacturing steps in real time.", zh: "獨立開發現場視覺系統，即時追蹤作業步驟、檢查 SOP。" },
    "label-inspection": { en: "Label detection, barcode decoding and OCR, built end to end.", zh: "從標籤定位、條碼解碼到 OCR 備援，獨立完成檢測系統。" },
    "course-grabber": { en: "A course-registration tool built as a freshman and maintained for classmates.", zh: "從大一的一天開發，到持續維護、讓同學也能使用的選課工具。" }
  };
  function synopsis(p) { return t(synopses[p.id] || p.summary); }

  function cardHtml(p) {
    var heading = document.body.dataset.page === "projects" ? "h2" : "h3";
    var c = coverAttrs(p);
    var keys = (p.tags || []).map(tagKey).join("|");
    return '<a class="pcard spot" href="project.html?id=' + p.id + '" data-tags="' + keys + '">' +
      '<div class="pcover ' + c.cls + '"' + c.style + '>' + covTag(c) + (c.label ? '<span class="lb">' + c.label + '</span>' : "") + '</div>' +
      '<div class="pbody"><div class="ptop"><' + heading + '>' + t(p.title) + '</' + heading + '><span class="year">' + cleanText(p.year || "") + '</span></div>' +
      '<p>' + synopsis(p) + '</p>' +
      '<div class="ptags">' + tagsHtml(p) + '</div>' +
      '<span class="plink">' + u("view") + '</span></div></a>';
  }

  /* ---------- 首頁 ---------- */
  function renderStats() {
    var host = $("#stats"); if (!host) return;
    host.innerHTML = (S.stats || []).map(function (s) {
      return '<article class="cell c-stat" data-reveal><span class="num">' + s.num + (s.suffix || "") + '</span><span class="k">' + t(s.label) + '</span></article>';
    }).join("");
  }
  function renderSkills() {
    var host = $("#skills"); if (!host) return;
    host.innerHTML = (S.skills || []).map(function (g) {
      var core = (g.core || []).map(function (x) { return '<span class="pill core">' + (x === 'HTML / CSS' ? '<abbr title="HyperText Markup Language and Cascading Style Sheets">HTML / CSS</abbr>' : x) + '</span>'; }).join("");
      var more = (g.more || []).map(function (x) { return '<span class="pill">' + x + '</span>'; }).join("");
      return '<article class="scard"><h3>' + t(g.group) + '</h3><div class="pills">' + core + more + '</div></article>';
    }).join("");
  }
  function renderFeatured() {
    var host = $("#featured-grid"); if (!host) return;
    var list = P.filter(function (p) { return p.featured; });
    if (!list.length) list = P.slice(0, 3);
    var big = list[0], rest = list.slice(1, 4), html = "";
    if (big) {
      var c = coverAttrs(big);
      var lead = (big.detail && big.detail.sections && big.detail.sections[0] && big.detail.sections[0].body && big.detail.sections[0].body[0]) || big.summary;
      html += '<a class="featured spot" href="project.html?id=' + big.id + '">' +
        '<div class="cover ' + c.cls + '"' + c.style + '>' + covTag(c) + (c.label ? '<span class="label">' + c.label + '</span>' : "") + '</div>' +
        '<div class="body"><span class="ribbon">' + u("featured") + '</span><h3>' + t(big.title) + '</h3>' +
        '<p>' + synopsis(big) + '</p><div class="ptags">' + tagsHtml(big) + '</div><span class="plink">' + u("seeFull") + '</span></div></a>';
    }
    if (rest.length) html += '<div class="proj-grid">' + rest.map(cardHtml).join("") + '</div>';
    host.innerHTML = html;
  }

  /* ---------- 專案列表頁 ---------- */
  function renderProjectList() {
    var host = $("#all-projects"); if (!host) return;
    host.innerHTML = '<div class="proj-grid">' + P.map(cardHtml).join("") + '</div>';
    var fh = $("#filters"); if (!fh) return;
    var seen = {}, order = [];
    P.forEach(function (p) { (p.tags || []).forEach(function (tg) { var k = tagKey(tg); if (!seen[k]) { seen[k] = tg; order.push(k); } }); });
    fh.innerHTML = '<button type="button" class="fchip on" data-f="*" aria-pressed="true">' + u("all") + '</button>' +
      order.map(function (k) { return '<button type="button" class="fchip" aria-pressed="false" data-f="' + k + '">' + t(seen[k]) + '</button>'; }).join("");
    fh.onclick = function (e) {
      var b = e.target.closest(".fchip"); if (!b) return;
      $$(".fchip", fh).forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("on"); b.setAttribute("aria-pressed", "true");
      var f = b.getAttribute("data-f");
      $$(".pcard", host).forEach(function (card) {
        var ks = card.getAttribute("data-tags").split("|");
        card.style.display = (f === "*" || ks.indexOf(f) > -1) ? "" : "none";
      });
    };
  }

  /* ---------- 專案詳情頁 ---------- */
  function renderProjectDetail() {
    var host = $("#project-detail"); if (!host) return;
    var id = new URLSearchParams(location.search).get("id");
    var idx = P.findIndex(function (p) { return p.id === id; });
    var p = P[idx];
    if (!p) {
      host.innerHTML = '<div class="page-head"><h1>' + u("notFound") + '</h1><p>' + u("notFoundPre") +
        '<a href="projects.html" style="color:var(--accent)">' + u("notFoundLink") + '</a>' + u("notFoundPost") + '</p></div>';
      return;
    }
    document.title = t(p.title) + " — " + (S.name || "");
    var c = coverAttrs(p), d = p.detail || {};
    var sections = (d.sections || []).map(function (s) {
      var b = (s.body || []).map(function (x) { return "<p>" + t(x) + "</p>"; }).join("");
      var l = (s.list && s.list.length) ? "<ul>" + s.list.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul>" : "";
      return "<h2>" + t(s.h) + "</h2>" + b + l;
    }).join("");
    var gallery = (d.gallery && d.gallery.length)
      ? '<div class="gallery">' + d.gallery.map(function (g) { return '<img src="' + g + '" alt="' + t(p.title) + '">'; }).join("") + '</div>' : "";
    var lk = p.links || {};
    var linkBtns =
      (lk.demo ? '<a class="btn btn-primary" href="' + lk.demo + '" target="_blank" rel="noopener">' + u("demo") + '</a>' : "") +
      (lk.repo ? '<a class="btn btn-ghost" href="' + lk.repo + '" target="_blank" rel="noopener">' + u("repo") + '</a>' : "") +
      (lk.article ? '<a class="btn btn-ghost" href="' + lk.article + '" target="_blank" rel="noopener">' + u("article") + '</a>' : "");
    var prev = P[idx - 1], next = P[idx + 1];
    var pager = '<div class="pager">' +
      (prev ? '<a href="project.html?id=' + prev.id + '"><div class="dir">' + u("prev") + '</div><div class="t">' + t(prev.title) + '</div></a>' : "<span></span>") +
      (next ? '<a class="next" href="project.html?id=' + next.id + '"><div class="dir">' + u("next") + '</div><div class="t">' + t(next.title) + '</div></a>' : "<span></span>") +
      '</div>';
    host.innerHTML =
      '<div class="detail-hero"><a class="back" href="projects.html">' + u("back") + '</a>' +
        '<h1>' + t(p.title) + '</h1>' +
        '</div>' +
      '<div role="img" aria-label="' + t(p.title) + '" class="detail-cover ' + c.cls + '"' + c.style + '>' + covTag(c) + (c.label ? '<span class="label">' + c.label + '</span>' : "") + '</div>' +
      '<div class="detail-grid"><div class="detail-prose">' +
        '<p class="lead-line">' + t(p.summary) + '</p>' + sections + gallery + pager +
      '</div><aside class="detail-side">' +
        '<h2 class="side-head">' + u("details") + '</h2><dl>' +
        '<dt>' + u("year") + '</dt><dd>' + cleanText(p.year || "") + '</dd>' +
        '<dt>' + u("role") + '</dt><dd>' + t(p.role) + '</dd>' +
        '<dt>' + u("stack") + '</dt><dd>' + t(p.stack || "") + '</dd>' +
        '<dt>' + u("tags") + '</dt><dd>' + (p.tags || []).map(t).join(u("sep")) + '</dd></dl>' +
        linkBtns +
      '</aside></div>';
  }

  /* ---------- 靜態文字 i18n + 語言鈕 ---------- */
  function applyI18n() {
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-Hant");
    $$("[data-en]").forEach(function (e) {
      var v = lang === "en" ? e.getAttribute("data-en") : e.getAttribute("data-zh");
      if (v != null) e.textContent = cleanText(v);
    });
    $$("[data-block]").forEach(function (b) { b.hidden = b.getAttribute("data-block") !== lang; });
    var lb = $("#lang");
    if (lb) { lb.textContent = lang === "en" ? "中" : "EN"; lb.title = lang === "en" ? "切換為中文" : "Switch to English"; }
  }

  /* ---------- 互動 ---------- */
  function attachSpot() {
    $$(".spot").forEach(function (c) {
      if (c._spot) return; c._spot = 1;
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--mx", (e.clientX - r.left) + "px");
        c.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }
  function renderDynamic() {
    bindSite(); renderFooter();
    renderStats(); renderSkills(); renderFeatured();
    renderProjectList(); renderProjectDetail();
  }
  function applyLang() {
    var note = $("#resume-status"); if (note) note.textContent = "";
    // 切換期間關掉逐項浮入動畫，讓整頁交叉淡入更乾淨
    document.documentElement.classList.add("no-reveal-anim");
    renderDynamic(); applyI18n();
    $$("[data-reveal]").forEach(function (e) { e.classList.add("in"); });
    attachSpot();
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l; savePreference(LANG_KEY, l);
    applyLang();
    document.documentElement.classList.remove("no-reveal-anim");
  }

  function initUI() {
    document.addEventListener("click", function (event) {
      var resume = event.target.closest('[data-href="resume"]');
      if (!resume || (S.resume && S.resume !== "#")) return;
      event.preventDefault();
      var note = document.getElementById("resume-status");
      if (!note) { note = document.createElement("p"); note.id = "resume-status"; note.className = "resume-note"; note.setAttribute("role", "status"); resume.parentNode.insertAdjacentElement("afterend", note); }
      note.textContent = lang === "zh" ? "履歷 PDF 尚未提供，歡迎透過 Email 聯絡我。" : "CV PDF not provided yet. Please contact me by email.";
    });
    // 禁止拖曳圖片：阻擋瀏覽器將 <img> 拖出/拖移的預設行為（涵蓋 Firefox 與動態插入的圖片）
    document.addEventListener("dragstart", function (e) {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
    var root = document.documentElement, key = "pf-theme";
    // The head bootstrap applies the saved theme before styles and first paint.
    var themeBtn = $("#theme");
    var requestedTheme = root.getAttribute("data-theme");
    var themeTransition = null, themeTimer = 0;
    if (themeBtn) themeBtn.setAttribute("aria-pressed", root.getAttribute("data-theme") === "dark" ? "true" : "false");
    if (themeBtn) themeBtn.addEventListener("click", function () {
      var next = requestedTheme === "dark" ? "light" : "dark";
      requestedTheme = next;
      var applyTheme = function () {
        if (next !== requestedTheme) return;
        root.setAttribute("data-theme", next);
        root.style.colorScheme = next;
        savePreference(key, next);
        themeBtn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      };
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (themeTransition) themeTransition.skipTransition();
      if (reduce) { applyTheme(); return; }
      if (document.startViewTransition) {
        var transition = document.startViewTransition(applyTheme);
        themeTransition = transition;
        transition.finished.then(function () {
          if (themeTransition === transition) themeTransition = null;
        }, function () {
          applyTheme();
          if (themeTransition === transition) themeTransition = null;
        });
      } else {
        root.classList.add("theme-switching");
        // Establish the current colours before applying the next palette.
        getComputedStyle(root).backgroundColor;
        applyTheme();
        clearTimeout(themeTimer);
        themeTimer = setTimeout(function () { root.classList.remove("theme-switching"); }, 500);
      }
    });
    var langBtn = $("#lang");
    if (langBtn) langBtn.addEventListener("click", function () { setLang(lang === "en" ? "zh" : "en"); });
    var burger = $("#burger"), nl = $(".nav-links");
    if (burger && nl) {
      var closeMenu = function () {
        if (!nl.classList.contains("open")) return;
        nl.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
      };
      burger.addEventListener("click", function () {
        var o = nl.classList.toggle("open"); burger.setAttribute("aria-expanded", o);
      });
      // 點選單裡的連結 → 收起
      $$("a", nl).forEach(function (a) { a.addEventListener("click", closeMenu); });
      // 一觸碰「選單以外」（含開始捲動頁面）就收起；在選單上操作則不收
      document.addEventListener("pointerdown", function (e) {
        if (!nl.contains(e.target) && !burger.contains(e.target)) closeMenu();
      });
      // 按 Esc 收起
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nl.classList.contains("open")) { closeMenu(); burger.focus(); } });
    }
    // 已在首頁時，按 Logo / Home 改為平滑捲到頂端（不重新整理）
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (!a || a.getAttribute("href") !== "index.html") return;
      if (document.body.getAttribute("data-page") !== "home") return;
      e.preventDefault();
      var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      // 清掉殘留的錨點（例如 #contact），讓網址回到乾淨的首頁
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    });
    var prog = $("#progress"), navEl = $("#site-nav");
    var lastScrollY = Math.max(0, window.scrollY);
    var onScroll = function () {
      var h = document.documentElement;
      var y = Math.max(0, Math.min(window.scrollY, h.scrollHeight - h.clientHeight));
      if (prog) prog.style.width = (y / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%";
      if (navEl) {
        var delta = y - lastScrollY;
        var menuOpen = nl && nl.classList.contains("open");
        navEl.classList.toggle("scrolled", y > 6);
        if (y <= navEl.offsetHeight || menuOpen || delta < 0) {
          navEl.classList.remove("nav-hidden");
        } else if (delta > 2) {
          navEl.classList.add("nav-hidden");
        }
      }
      lastScrollY = y;
    };
    if (navEl) navEl.addEventListener("focusin", function () {
      navEl.classList.remove("nav-hidden");
    });
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    var mailbtn = $("#mailbtn"), hint = $("#copyhint");
    if (mailbtn) mailbtn.addEventListener("click", function (ev) {
      var mail = S.email || "";
      if (navigator.clipboard && mail) { ev.preventDefault(); navigator.clipboard.writeText(mail).then(function () {
        if (hint) { var old = hint.textContent; hint.textContent = u("copied"); setTimeout(function () { hint.textContent = old; }, 1600); }
      }).catch(function () { location.href = "mailto:" + mail; }); }
    });
  }
  function initObservers() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      } });
    }, { threshold: .18 });
    $$("[data-reveal]").forEach(function (el) { io.observe(el); });
    attachSpot();
    var map = {}; $$(".nav-links a").forEach(function (a) { var h = a.getAttribute("href"); if (h.indexOf("#") === 0) map[h.slice(1)] = a; });
    if (Object.keys(map).length) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && map[e.target.id]) {
          $$(".nav-links a").forEach(function (a) { a.classList.remove("active"); });
          map[e.target.id].classList.add("active");
        } });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$("section[id]").forEach(function (s) { if (map[s.id]) spy.observe(s); });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderNav(); renderDynamic(); applyI18n();
    document.documentElement.removeAttribute("data-language-pending");
    initUI(); initObservers();
  });
})();

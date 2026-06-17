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
  var LANG_KEY = "pf-lang";
  var lang = localStorage.getItem(LANG_KEY) || "en";   // 預設英文
  function t(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "zh" in v))
      return v[lang] != null ? v[lang] : (v.en != null ? v.en : v.zh);
    return v == null ? "" : v;
  }
  function tagKey(tg) { return typeof tg === "object" ? tg.en : tg; }
  var UI = {
    en: { view:"View project →", featured:"★ Featured", seeFull:"See full case →",
          back:"← Back to projects", prev:"← Previous", next:"Next →",
          year:"Year", role:"Role", stack:"Stack", tags:"Tags",
          repo:"Source ↗", demo:"Live ↗", article:"Article →", all:"All",
          notFound:"Project not found", notFoundLink:"project list",
          notFoundPre:"Please pick one from the ", notFoundPost:".",
          builtBy:"Hand-coded · hosted on GitHub Pages", copied:"Copied ✓", sep:", " },
    zh: { view:"查看專案 →", featured:"★ 精選專案", seeFull:"看完整介紹 →",
          back:"← 返回專案列表", prev:"← 上一個", next:"下一個 →",
          year:"年份", role:"角色", stack:"技術", tags:"標籤",
          repo:"原始碼 ↗", demo:"線上版本 ↗", article:"技術文章 →", all:"全部",
          notFound:"找不到這個專案", notFoundLink:"專案列表",
          notFoundPre:"請回到 ", notFoundPost:" 重新選擇。",
          builtBy:"純手刻 · 以 GitHub Pages 架設", copied:"已複製 ✓", sep:"、" },
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
        '<a href="index.html" class="logo"><span class="mk">' + initial + '</span>' + (S.brand || S.name || "") + '</a>' +
        '<div class="nav-right"><div class="nav-links">' +
          links.map(function (l) {
            return '<a href="' + l.href + '"' + (l.p === active ? ' class="active" aria-current="page"' : "") +
              ' data-en="' + l.en + '" data-zh="' + l.zh + '">' + l.en + '</a>';
          }).join("") +
        '</div>' +
        '<button class="icon-btn" id="lang" aria-label="切換語言 / language">中</button>' +
        '<button class="icon-btn" id="theme" aria-label="切換主題 / theme" title="亮/暗">◐</button>' +
        '<button class="icon-btn burger" id="burger" aria-label="選單 / menu" aria-expanded="false">☰</button>' +
        '</div></div></nav>';
  }

  /* ---------- 共用：頁尾 ---------- */
  function renderFooter() {
    var host = $("#site-foot"); if (!host) return;
    host.innerHTML =
      '<footer class="site-foot"><div class="wrap foot-in">' +
        '<a href="index.html" class="logo"><span class="mk">' + initial + '</span>' + (S.brand || "") + '</a>' +
        '<div class="socials">' +
          '<a href="' + (S.github || "#") + '" title="GitHub" target="_blank" rel="noopener">GH</a>' +
          '<a href="' + (S.linkedin || "#") + '" title="LinkedIn" target="_blank" rel="noopener">in</a>' +
          '<a href="mailto:' + (S.email || "") + '" title="Email">@</a>' +
        '</div>' +
        '<span>© ' + new Date().getFullYear() + ' ' + (S.name || "") + ' · ' + u("builtBy") + '</span>' +
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
    $$('[data-href="resume"]').forEach(function (e) { e.href = S.resume || "#"; });
    $$('[data-href="email"]').forEach(function (e) { e.href = "mailto:" + (S.email || ""); });
  }

  /* ---------- 工具 ---------- */
  function coverAttrs(p) {
    if (p.cover) return { cls: "has-img", style: ' style="background-image:url(\'' + p.cover + '\')"', label: "" };
    return { cls: (p.accent || "cv1"), style: "", label: t(p.title) };
  }
  function tagsHtml(p) { return (p.tags || []).map(function (tg) { return "<span>" + t(tg) + "</span>"; }).join(""); }

  function cardHtml(p) {
    var c = coverAttrs(p);
    var keys = (p.tags || []).map(tagKey).join("|");
    return '<a class="pcard spot" href="project.html?id=' + p.id + '" data-tags="' + keys + '">' +
      '<div class="pcover ' + c.cls + '"' + c.style + '>' + (c.label ? '<span class="lb">' + c.label + '</span>' : "") + '</div>' +
      '<div class="pbody"><div class="ptop"><h3>' + t(p.title) + '</h3><span class="year">' + (p.year || "") + '</span></div>' +
      '<p>' + t(p.summary) + '</p>' +
      '<div class="ptags">' + tagsHtml(p) + '</div>' +
      '<span class="plink">' + u("view") + '</span></div></a>';
  }

  /* ---------- 首頁 ---------- */
  function renderMarquee() {
    var host = $("#marquee"); if (!host) return;
    var inner = (S.marquee || []).map(function (m) { return "<span>" + m + "</span>"; }).join("");
    host.innerHTML = '<div class="track"><div class="item">' + inner + '</div><div class="item">' + inner + '</div></div>';
  }
  function renderStats() {
    var host = $("#stats"); if (!host) return;
    host.innerHTML = (S.stats || []).map(function (s) {
      return '<article class="cell c-stat spot" data-reveal><span class="num" data-count="' + s.num + '" data-suffix="' + (s.suffix || "") + '">0</span><span class="k">' + t(s.label) + '</span></article>';
    }).join("");
  }
  function renderSkills() {
    var host = $("#skills"); if (!host) return;
    host.innerHTML = (S.skills || []).map(function (g) {
      var core = (g.core || []).map(function (x) { return '<span class="pill core">' + x + '</span>'; }).join("");
      var more = (g.more || []).map(function (x) { return '<span class="pill">' + x + '</span>'; }).join("");
      return '<article class="scard"><h3>' + t(g.group) + ' <span class="n">// ' + g.en + '</span></h3><div class="pills">' + core + more + '</div></article>';
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
        '<div class="cover ' + c.cls + '"' + c.style + '>' + (c.label ? '<span class="label">' + c.label + '</span>' : "") + '</div>' +
        '<div class="body"><span class="ribbon">' + u("featured") + '</span><h3>' + t(big.title) + '</h3>' +
        '<p>' + t(lead) + '</p><div class="ptags">' + tagsHtml(big) + '</div><span class="plink">' + u("seeFull") + '</span></div></a>';
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
    fh.innerHTML = '<button class="fchip on" data-f="*">' + u("all") + '</button>' +
      order.map(function (k) { return '<button class="fchip" data-f="' + k + '">' + t(seen[k]) + '</button>'; }).join("");
    fh.onclick = function (e) {
      var b = e.target.closest(".fchip"); if (!b) return;
      $$(".fchip", fh).forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
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
        '<div class="en">' + (p.title.en || "") + '</div><h1>' + t(p.title) + '</h1>' +
        '<div class="detail-meta-row"><span>' + (p.year || "") + '</span><span>' + t(p.role) + '</span><span>' + (p.stack || "") + '</span></div></div>' +
      '<div class="detail-cover ' + c.cls + '"' + c.style + '>' + (c.label ? '<span class="label">' + c.label + '</span>' : "") + '</div>' +
      '<div class="detail-layout"><div class="detail-body">' +
        '<p class="lead-line">' + t(p.summary) + '</p>' + sections + gallery + pager +
      '</div><aside class="detail-side">' +
        '<div class="row"><div class="k">' + u("year") + '</div><div class="v">' + (p.year || "—") + '</div></div>' +
        '<div class="row"><div class="k">' + u("role") + '</div><div class="v">' + t(p.role) + '</div></div>' +
        '<div class="row"><div class="k">' + u("stack") + '</div><div class="v">' + (p.stack || "—") + '</div></div>' +
        '<div class="row"><div class="k">' + u("tags") + '</div><div class="v">' + (p.tags || []).map(t).join(u("sep")) + '</div></div>' +
        linkBtns +
      '</aside></div>';
  }

  /* ---------- 靜態文字 i18n + 語言鈕 ---------- */
  function applyI18n() {
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "zh-Hant");
    $$("[data-en]").forEach(function (e) {
      var v = lang === "en" ? e.getAttribute("data-en") : e.getAttribute("data-zh");
      if (v != null) e.textContent = v;
    });
    $$("[data-block]").forEach(function (b) { b.hidden = b.getAttribute("data-block") !== lang; });
    var lb = $("#lang");
    if (lb) { lb.textContent = lang === "en" ? "中" : "EN"; lb.title = lang === "en" ? "切換為中文" : "Switch to English"; }
  }

  /* ---------- 互動 ---------- */
  function countUp(el) {
    var target = parseFloat(el.dataset.count), suf = el.dataset.suffix || "", t0 = null, dur = 1100;
    function step(ts) { if (!t0) t0 = ts; var pr = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - pr, 3))) + suf;
      if (pr < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
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
    renderMarquee(); renderStats(); renderSkills(); renderFeatured();
    renderProjectList(); renderProjectDetail();
  }
  function fillCounts() {
    $$("[data-count]").forEach(function (el) { el.textContent = el.dataset.count + (el.dataset.suffix || ""); });
  }
  function applyLang() {
    // 切換期間關掉逐項浮入動畫，讓整頁交叉淡入更乾淨
    document.documentElement.classList.add("no-reveal-anim");
    renderDynamic(); applyI18n();
    $$("[data-reveal]").forEach(function (e) { e.classList.add("in"); });
    fillCounts(); attachSpot();
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l; localStorage.setItem(LANG_KEY, l);
    var done = function () { document.documentElement.classList.remove("no-reveal-anim"); };
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) {
      var vt = document.startViewTransition(applyLang);
      vt.finished.then(done, done);
    } else if (!reduce) {
      // 後備：手動淡出 → 換文字 → 淡入
      var b = document.body;
      b.style.transition = "opacity .2s ease"; b.style.opacity = "0";
      setTimeout(function () {
        applyLang();
        requestAnimationFrame(function () { b.style.opacity = "1"; setTimeout(done, 240); });
      }, 200);
    } else {
      applyLang(); done();
    }
  }

  function initUI() {
    var root = document.documentElement, key = "pf-theme";
    var saved = localStorage.getItem(key);
    if (saved) root.setAttribute("data-theme", saved);
    else if (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) root.setAttribute("data-theme", "light");
    var themeBtn = $("#theme");
    if (themeBtn) themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next); localStorage.setItem(key, next);
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
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
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
    var onScroll = function () {
      var h = document.documentElement;
      if (prog) prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
      if (navEl) navEl.classList.toggle("scrolled", h.scrollTop > 6);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    var mailbtn = $("#mailbtn"), hint = $("#copyhint");
    if (mailbtn) mailbtn.addEventListener("click", function (ev) {
      var mail = S.email || "";
      if (navigator.clipboard && mail) { ev.preventDefault(); navigator.clipboard.writeText(mail).then(function () {
        if (hint) { var old = hint.textContent; hint.textContent = u("copied"); setTimeout(function () { hint.textContent = old; }, 1600); }
      }); }
    });
  }
  function initObservers() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) {
        e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(countUp);
        if (e.target.dataset && e.target.dataset.count) countUp(e.target);
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
    renderNav(); renderDynamic(); applyI18n(); initUI(); initObservers();
  });
})();

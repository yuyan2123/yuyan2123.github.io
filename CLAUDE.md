# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal portfolio website: **static, multi-page, zero-framework, zero-build, zero-dependency** vanilla HTML/CSS/JS. It is meant to be hosted on GitHub Pages by pushing the repo as-is. The site is **bilingual (English default + Traditional Chinese)** with a **dark (default) / light** theme toggle.

There is intentionally no `package.json`, bundler, transpiler, or test framework. Do not introduce one unless explicitly asked.

## Commands

- **Preview locally:** open `index.html` directly in a browser. It works over `file://` because content is provided as plain `<script>` globals (no `fetch`/CORS). Optionally serve statically for a cleaner URL: `python -m http.server` then visit `http://localhost:8000`.
- **Build / lint / test:** none exist. There is no toolchain.
- **Deploy:** push to GitHub and enable Pages on the repo root. Root `index.html` is the entry point; no build step runs.

## Architecture

All four pages are **thin shells** rendered by three shared assets:

- `assets/js/data.js` — **the single content source; edit this to change content.** Exposes `window.SITE` (profile, stats, skills, marquee) and `window.PROJECTS` (array). Translatable fields are bilingual objects `{ en, zh }`; plain strings are language-agnostic (e.g. tech names).
- `assets/js/app.js` — all rendering and behavior. Runs on `DOMContentLoaded`, reads the `data.js` globals, and injects HTML into placeholder elements. Rendered data is trusted and written via `innerHTML`.
- `assets/css/style.css` — all styling for every page. Theming is driven by CSS variables scoped to `html[data-theme="dark"|"light"]`.

Pages: `index.html` (home), `about.html` (long-form, mostly hand-written), `projects.html` (list), `project.html` (a single project loaded via the `?id=` query param). Each page sets `<body data-page="...">` (drives nav active state) and ends with `data.js` then `app.js`.

### Rendering contract (placeholders that `app.js` fills)

- `#site-nav`, `#site-foot` — nav and footer, rendered once for every page.
- `#marquee`, `#stats`, `#skills`, `#featured-grid` — home sections.
- `#all-projects` + `#filters` — projects list with tag filtering.
- `#project-detail` — single project; the `?id=` is matched against `PROJECTS[].id`, sets `document.title`, and builds the prev/next pager from array order.
- `[data-bind="name|role|tagline|status|location|email"]` — text filled from `SITE`.
- `[data-href="github|linkedin|resume|email"]` — hrefs filled from `SITE`.

### i18n (English is the default)

- Locale persists in `localStorage['pf-lang']` (default `en`) and is mirrored onto `<html lang>`.
- Data content: the `t(value)` helper returns `value[lang]` for bilingual objects, otherwise the value as-is.
- Static markup: elements with `data-en` / `data-zh` have their `textContent` swapped by `applyI18n()`. Multi-paragraph prose uses sibling blocks `data-block="en"` / `data-block="zh"` toggled via the `hidden` attribute.
- Fixed UI microcopy (card/pager/detail-sidebar labels, footer tagline, "Copy email", etc.) lives in the `UI` dictionary inside `app.js` — **not** in `data.js`.
- The language switch uses the **View Transitions API** (`document.startViewTransition`) for a cross-fade, with a manual opacity-fade fallback, and is disabled under `prefers-reduced-motion`.

## Conventions and gotchas

- **Add/edit a project:** append or modify an object in `window.PROJECTS` in `data.js`. `featured: true` surfaces it on the home page; it automatically appears in the list and gets a detail page at `project.html?id=<id>`. `cover: ""` falls back to a gradient class (`accent: cv1`–`cv5`); a non-empty `cover` is used as a background-image path.
- **Translation coverage:** any visible text that does not come from `data.js` must carry `data-en`/`data-zh` (or a `data-block` pair) or it will not switch languages.
- **Sticky nav depends on two things — keep both:** `body` must use `overflow-x: clip` (NOT `overflow-x: hidden`, which breaks `position: sticky`), and the sticky element is the wrapper `#site-nav`, not the inner `nav.nav`.
- **Section spacing on `.wrap` elements:** use `padding-top`/`padding-bottom` longhand (or include the horizontal value). The `padding: <y> 0` shorthand zeroes `.wrap`'s horizontal padding and makes content hug the screen edges.
- **Scroll reveal:** elements with `[data-reveal]` fade in via `IntersectionObserver`. During a language switch they are forced visible immediately (`.no-reveal-anim`) so the cross-fade stays clean.
- **Replacing the photo:** swap the placeholder `<div class="avatar">…</div>` block in `index.html` / `about.html` for an `<img class="avatar" …>`. Images belong in `assets/img/`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Grundejerforeningen Borrehøj (a Danish homeowners association). No build system, no package manager, no frameworks — pure HTML5, CSS, and jQuery.

**Deployed via GitHub Pages** at `www.grundejerforeningen-borrehøj.dk` (CNAME configured).

## Development

No build or install steps. To preview locally, open any HTML file in a browser or use a local HTTP server:

```bash
python -m http.server 8000
```

## Architecture

- **Language**: Danish (`lang="da"`) — all content, month names in JS, and UI text are in Danish
- **Single stylesheet**: `css/style.css` — all pages share this one file
- **Single script**: `js/main.js` — jQuery-based, handles mobile nav, event date checking, copyright year
- **jQuery 3.7.1** loaded from CDN (cdnjs.cloudflare.com)
- **Images**: WebP format in `images/`
- **Documents**: PDFs in `dokumenter/`

### Smart Homepage (`index.html`)

`index.html` is NOT a content page. It fetches `aktiviteter.html`, parses the event date, and redirects:
- Upcoming event → `aktiviteter.html`
- Past event → `kontakt.html`

### Event Date System

Events on `aktiviteter.html` use a date-checking system in `main.js`:
- Parses Danish date strings matching `DD. monthname YYYY` format
- Adds `.passed` class to `.event-date` (triggers CSS `line-through`)
- Shows hidden `.event-passed` message
- Handles multiple events via `.each()` on `.event-date` elements

### Page Template

All pages follow the same HTML structure: `<header class="site-header">` (banner + nav) → `<main class="site-content">` → `<div class="content-area">` → `<article>` with `.entry-header`/`.entry-content` → `<footer class="site-footer">`. The nav, header, and footer are duplicated across files (no templating system).

### Navigation

Active page is marked with `class="active"` on its nav link. The Historie menu is a dropdown (`.has-dropdown` with nested `.dropdown` ul). Navigation is duplicated in every HTML file — changes must be applied to all pages.

## Adding New Events

Add a new `<article>` inside `.content-area` in `aktiviteter.html`. Place it **before** existing articles so the newest event appears first. Use this structure:

```html
<article>
    <header class="entry-header">
        <h2 class="entry-title">Event Title</h2>
        <div class="entry-meta">
            <span class="icon">&#128197;</span>
            <span class="event-date">Dagsnavn den DD. måned YYYY kl. HH:MM</span>
            <span class="event-passed" style="display: none;">– Denne begivenhed har fundet sted</span>
        </div>
    </header>
    <div class="entry-content">
        <p>Event description...</p>
    </div>
</article>
```

Key points:
- The `.event-date` text **must** contain `DD. monthname YYYY` (e.g. `25. marts 2026`) — `main.js` parses this to detect past events. Danish month names only (januar, februar, marts, april, maj, juni, juli, august, september, oktober, november, december).
- The `.event-passed` span must have `style="display: none;"` — JS shows it automatically when the date passes.
- Past events are automatically crossed out (line-through on date, "har fundet sted" message shown). No manual changes needed.
- Articles are visually separated by a border (`article + article` CSS rule).
- Place any linked documents (PDFs) in `dokumenter/` and link with `href="dokumenter/filename.pdf"`.

## Conventions

- **CSS naming**: BEM-like (`.site-header`, `.entry-content`, `.event-date`, `.board-member`)
- **State classes**: `.active` (nav/menu), `.passed` (past events)
- **Responsive breakpoints**: 768px (tablet/mobile nav), 480px (small mobile)
- **SEO**: Every page includes Open Graph tags, canonical URLs, and Schema.org JSON-LD structured data
- **Color palette**: `#2a7ae2` (blue links), `#333` (text/footer bg), `#f5f5f5` (page bg), `#ddd`/`#eee` (borders)

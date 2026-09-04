# 🗺️ Joe Jackson Ticket Museum — Roadmap & Project Plan

## 📌 Overview
An interactive digital museum and historical archive dedicated to Joe Jackson's live concert history (1973–2026), ticket stubs, venue metadata, line-ups, setlists, bootleg recordings, and tour memorabilia.

---

## 🚀 Active Feature Backlog & Next Priorities (Up Next)

### 1. `Viewer.js` Refactoring (Time-Machine & Related Media)
- [ ] **Time-Machine Navigation**:
  - Add `Prev Show` / `Next Show` controls within the modal viewer to allow seamless browsing through concerts chronologically (or within the active filter scope) without closing the lightbox.
- [ ] **Related Media Bar (Link-Based)**:
  - Keep the viewer clean while aggregating all concert context:
    - Display non-intrusive action badges for linked resources: `🖼️ Posters`, `📰 Articles / Reviews`, `🎵 Setlist.fm`, and `🎬 Bootlegs / Videos`.
    - Clicking a category switches the active scan view or opens the external/archival link without cluttering the main modal.

### 2. Public "Help Us Find" / Missing Scans Dashboard
- [ ] **Expose Missing Scans Filter to Public**:
  - Adapt the existing Admin filter for missing scans into a public quick-filter button (e.g., `🔍 Help Us Find` / `Missing Scans`).
- [ ] **Direct Contribution Bridge**:
  - Enhance `MISSING ITEM` cards with a direct call-to-action button (*"Were you at this show? Contribute a scan"*), pre-filling the show ID into the `+ CONTRIBUTE YOUR ITEM` form.

### 3. Editor Enhancements & Admin Refactoring (`edit_ticket_new.html`)
- [ ] **Field Management**:
  - Add missing columns into `edit_ticket_new.html` (e.g., public donor toggle `y/n`, structured `DONOR / SOURCE` line).
  - Clean up legacy tools: Remove deprecated Watermark tool, "Select Scan File for Record", and legacy "Missing Scans Check".
  - Enforce mandatory field controls (strictly require `Year` at minimum).
- [ ] **Context-Aware Form Fields**:
  - Dynamically show/hide non-relevant input fields based on selected `KATEGORIE` (e.g., hide concert setlist, venue, and line-up fields when editing tour-wide items like Passes or Tour Books).

---

## 🐛 Bug Fixes & Refactoring Tasks

- [ ] **iOS Layout & Visibility Issues**:
  - *Bug:* Logoff button remains visible even when logged off (specifically on iOS devices).
  - *Bug:* Tour search dropdown list remains visible to public users on iOS.
- [ ] **Search & Filter Tweaks**:
  - *Query Behavior:* Evaluate if search query matching against Tour Names causes confusion during global search, and refine scoping if necessary.
- [ ] **Mobile CSS & Styling**:
  - General responsive design touch-ups for mobile viewports (`styles.css`).
- [ ] **Code Refactoring**:
  - Plan framework/build refactoring according to `REFACTOR_PLAN.md` (Vite build pipeline).

---

## 📋 Donors & Sources Policy
- Keep a unified, simple `DONOR / SOURCE` text field in the database.
- Display donor credits in item details as: `Scan courtesy of: [Name / Handle / Anonymous]`.
- For items with multiple scans from different contributors, store sources as comma-separated values matching the image index order.

---

## ✅ Completed Features & Recent Milestones

- [x] **Multi-Scan Count Badge**: Display visual count badges (`📷 2`, `🖼️ 3`) on grid cards when multiple scans exist in `SOUBOR_SKEN`.
- [x] **Setlist.fm Integration**: Auto-fetch existing setlists, sync song titles, link Setlist.fm URLs, and allow editing empty setlists.
- [x] **Audio/Video Bootleg Support**: Linked audio bootlegs and YouTube live recordings with indicator badges (`🎵`, `🎥`).
- [x] **Line-Ups & Band Members**: Historical band line-up integration per tour/show.
- [x] **Light / Dark Mode**: Theme switcher toggle implemented.
- [x] **Logo & Branding**: Redesigned ticket-style logo.
- [x] **Pagination & Search Scope**: Page state persistence retained within current search queries.
- [x] **Search Usability**: Auto-focus search input on page reload for quick typing.
- [x] **Admin Authentication**: Fixed admin mode login/logout state management.
- [x] **Public Scope Launch**: Initial public release with Tickets and Passes browsing enabled.

---

## ⏳ Pre-Launch Checklist (`joejackson.band`)

- [ ] **Domain & DNS Configuration**:
  - Add `CNAME` file to GitHub Pages repository.
  - Configure A / CNAME DNS records with domain registrar for `joejackson.band`.
- [ ] **Repository Privacy & Hosting**:
  - Activate GitHub Pro subscription ($4/mo) to keep repository code private while deploying public GitHub Pages.
- [ ] **SEO & Search Indexing**:
  - Deploy `robots.txt` (strictly blocking crawler access to `/edit_ticket_new.html`).
  - Generate `sitemap.xml` for core pages (`/`, `/stats.html`, `/ticket_form.html`).
- [ ] **Social Sharing Assets & Meta**:
  - Verify physical deployment of `favicon.svg` and `favicon.ico` in repo root.
  - Create high-res `og-image.jpg` (1200×630px) for social media previews (OpenGraph).
- [ ] **Error Handling**:
  - Verify graceful image fallback handlers when `SOUBOR_SKEN` file paths fail or return 404.
- [ ] **Support Email**:
  - Activate and verify `archive@joejackson.band` inbox for contribution handling and DMCA requests.
- [ ] **Golden Circle Onboarding (Why-How-What Framework)**:
  - **WHY (Hero Header):** Frame the site around preserving concert memories and live history (*"Preserving 45+ years of live music history..."*).
  - **HOW (Community Call):** Emphasize crowdsourced archiving and data cross-referencing with setlists/audio.
  - **WHAT (UI Navigation):** Clear call-to-actions for search, filtering, and the `Help Us Find` missing scans workflow.

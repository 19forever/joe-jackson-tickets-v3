# 🗺️ Joe Jackson Ticket Museum — Roadmap & Project Plan

## Corrections 
- CHECK: log in/out Admin mode is not working properly - test it!
  - when refactored Admin mode buttons, loading data is longer - check
- Q: how to handle Contributors/Donors?
  - get rid of completely?
  - if keep - show them or not?
  - maintaining Rolf´s info?
  - what about ebay/internet source?
  - what about anonymouses / nicks?
  - what about NULL or multiple source
    - because there more images for one show, but just one Donor Line
    - maybe like images - comma separated with the same order like images
- Q: added Support Band field or just text into NOTES
- Q: get rid of Ticket button with it´s number (all buttons showe up when admin mode)
- Q: is searching by cities (countries) necessary? what other search shortcuts would be useful?
- NEW FEATURE: check setlist.fm for existing setlist and fill-in URL and songs
- DONE: not working Fetch from Setlist.fm
- DONE: new ticket-like logo
- DONE: paging is holding the last page within search scope
- DONE: focus into search line after reloading - quick quesry writing works
- Q: when rafactoring? see ReEFACTOR_PLAN.MD (Vite)
- LAUNCH: don´t forget to make archive@joejackson.band address alive

## New Ideas
- DELETE SCAN: Nástroj v Editoru (Rychlý odkaz na smazání): Přímo do edit_ticket_new.html lze případně přidat malé tlačítko "Otevřít soubor na GitHubu", které vás po kliknutí přesměruje přímo na konkrétní stranu daného obrázku na GitHubu, kde už jen kliknete na ikonu koše a potvrzujete smazání. Nebude potřeba žádný token a ušetříte hledání.
- MAIN PAGE: small icon with number of images within item
- MAIN UX: add switch for dark / light modes
- Consert of the Day:
  - if there are more shows on this date, let it scroll right to left like in TV headlines?
  - get rid of "view anniversary show"?

## Overview
An interactive digital museum and archive dedicated to Joe Jackson's live concert tour history (1978–2026), ticket stubs, venue metadata, setlists, and memorabilia.

---

## 💡 Active Feature Backlog & New Ideas (Up Next)

### 1. Multi-Scan Count Badge on Concert Cards
- [ ] **Multi-Scan Indicator**:
  - Automatically evaluate `SOUBOR_SKEN` string length. If multiple scans exist (`comma-separated > 1`), display a subtle thumbnail badge (e.g. `📷 2` or `🖼️ 3`) to inform visitors that front/back sides or additional program pages are available inside the detail viewer.

### 2. Setlist.fm Cross-Reference & Date Verification Badges
- [ ] **Passive Community Nudge**:
  - Display a subtle link on item detail cards with 0 songs: *"Know this setlist? Add it on Setlist.fm or contribute a program scan."*
- [ ] **Verification Filter**:
  - Add quick filter checkboxes in Museum View and Admin Editor to easily isolate unverified shows or shows with missing setlist songs.

### 3. Theme Switcher (Light / Dark / Auto Mode)
- [ ] **Světlý a tmavý režim (`index.html` / `styles.css`)**:
  - Přidání přepínače motivu vedle přepínače fontů v hlavičce.
  - Vytvoření světlé varianty CSS proměnných (`:root` / `.theme-light`) pro čtení na přímém slunci.
  - Detekce systémového nastavení uživatele (`prefers-color-scheme: dark`).
  - Ukládání preferovaného režimu do `localStorage` (`jj_selected_theme`).
     
 ### 4. Launching schedule
- [ ] **When and what content to publish**:
- [ ] **joejackson.band connect**:
  - in GitHub settings
  - DNS setting in domain editor (github pages)
  - to set repository into Private
  - S tarifem GitHub Pro ($4/měsíc) získáte možnost mít kód v soukromém (Private) repozitáři a zároveň z něj přes GitHub Pages publikovat veřejně přístupné stránky pro návštěvníky.
  - 
---

## ⏳ Pending Client Approval & Pre-Launch Tasks

### Launch & SEO Essentials
- [x] **Legal & Copyright Footer Integration**
  - Implement non-commercial archival disclaimer and DMCA takedown contact in website footer.
- [ ] **Search Engine Indexing & Bot Directives**
  - Create `robots.txt` (blocking `/edit_ticket_new.html` from search crawlers).
  - Generate `sitemap.xml` covering main pages (`/`, `/stats.html`, `/ticket_form.html`).
- [ ] **Social Media Sharing & Asset Audit**
  - Verify physical existence of `favicon.svg` and `favicon.ico` in repo root.
  - Create high-resolution `og-image.jpg` (1200×630px) for rich previews on social networks (Facebook, WhatsApp, X).
- [ ] **Custom Domain Deployment (`joejackson.band`)**
  - Add `CNAME` file to GitHub Pages repository.
  - Configure A/CNAME DNS records with domain registrar.
- [ ] **Broken Asset Fallback**
  - Verify graceful UI image placeholder display when `SOUBOR_SKEN` paths fail to load.

---

## 🔮 Post-Launch Enhancements & Future Upgrades
- [ ] **Context-Aware Admin Editor Form Fields (`edit_ticket_new.html`)**
  - Dynamically show/hide non-relevant input fields based on selected `KATEGORIE` (e.g., hide concert setlist, date, and venue inputs when editing tour-wide items like Passes or Tour Books).
- [ ] **Community & Fan Interactivity Engine (Supabase / Cloudflare D1 Backend)**
  - **Setlist.fm Import:** Sync user attendance via Setlist.fm public API (`/user/{userId}/attended`) to automatically display attendance badges.
  - **Personal Concert Statuses:** User interactive badges per show (*"I Was There"*, *"I Own Ticket"*, *"Ticket Lost/Traded"*, *"I Have Audio Recording"*).
  - **Concert Memories & Stories:** Micro-forum section allowing registered fans to share personal concert anecdotes per date.
  - **Data Correction & Bootleg Submissions:** Quick-action reporting tool for missing setlists or rare audio recording details.
  - **Personal Concert Passport:** Generatable summary card displaying personal attendance stats across tours, countries, and venues.

---



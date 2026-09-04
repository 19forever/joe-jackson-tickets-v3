# 🗺️ Joe Jackson Ticket Museum — Roadmap & Project Plan

## WHY - HOW - WHAT
- WHY
  - "Live music is fleeting, but the memories shouldn't be. We are building a permanent digital monument to Joe Jackson's 45+ years on stage — preserved by fans, for fans."
- HOW
 - "By cross-referencing physical stubs with setlists, bootleg audio, and community contributions, we connect every show from 1978 to today."
 - "Got a stub in a shoe box? Help us map the complete tour history." (Neříkáš „Pošli sken“, ale „Pomoz nám dokončit mapu“).
- WHAT
 - "No records found for this query. Explore 50+ tours, filter by city, or click 'Help Us Find' to see what's still missing."

## Corrections 
- Error/feature: remember sort param when coming back from edit in other categories but Tickets
- Q: articles
  - new category?
  - different approach
- New Feature: edit_ticket_new.html
  - adding other columns into edit html (donor public y/n, etc.)
  - get rid of Watermark tool
  - get rid of Select Scan File for Record
  - get rid of Missing Scans Check
  - add control of mandatory fields (only Year actually)
- Error. Q: Search button searching within Tour names too (confusing?)
- Error: Logoff button visible even when I am logged-off (only on iOS)
- Error: Tour search list visible for public (only on iOS)
- 
- Nice to have: better mobile styles.css
- 
- Q: how to handle Contributors/Donors?
  - get rid of completely?
  - if keep - show them or not?
  - maintaining Rolf´s info?
  - what about ebay/internet source?
  - what about anonymouses / nicks?
  - what about NULL or multiple source
    - because there more images for one show, but just one Donor Line
    - maybe like images - comma separated with the same order like images
- Q: Reviews as a unique category?
- Q: added Support Band field or just text into NOTES
- DONE: get rid of Ticket button with it´s number (all buttons showe up when admin mode)
  - when Tickets and Passes then it stay like this
- Q: is searching by cities (countries) necessary? what other search shortcuts would be useful?
- Q: when rafactoring? see REFACTOR_PLAN.MD (Vite)
- 
- NEW FEATURE - DONE: check setlist.fm for existing setlist and fill-in URL and songs
- NEW FEATURE - DONE: light mode / dark mode
- 
- DONE: Tour list is not working even for admin
- DONE: Tickets and Passes available for public (initial release)
- DONE: Get rid of watermarking if ticket_form.html
- DONE: Supabase set-up policies = table not-public - set restrictions
- DONE: not working Fetch from Setlist.fm
- DONE: new ticket-like logo
- DONE: paging is holding the last page within search scope
- DONE: focus into search line after reloading - quick quesry writing works
- DONE: Repaire - log in/out Admin mode is not working properly - test it!
  - when refactored Admin mode buttons, loading data is longer - check
- LAUNCH: don´t forget to make archive@joejackson.band address alive

## New Ideas
- DELETE SCAN: Nástroj v Editoru (Rychlý odkaz na smazání): Přímo do edit_ticket_new.html lze případně přidat malé tlačítko "Otevřít soubor na GitHubu", které vás po kliknutí přesměruje přímo na konkrétní stranu daného obrázku na GitHubu, kde už jen kliknete na ikonu koše a potvrzujete smazání. Nebude potřeba žádný token a ušetříte hledání.
- MAIN PAGE: small icon with number of images within item
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
     
 ### 3. Launching schedule
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



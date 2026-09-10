## 🗺️ Project Roadmap

### 🟢 Completed (Phase 1 – Core Architecture & Supabase Migration)
- [x] **Supabase DB Integration:** Full migration from static JSON/local data to Supabase database.
- [x] **Secure Admin Mode:** Authentication flow via Supabase Auth for database editing and direct image uploads.
- [x] **Donor & Privacy Control:** Integrated contributor tracking with consent flag (`CONTRIBUTOR_CONSENT`) for granular public anonymity ("Anonymous").
- [x] **Setlist.fm & Media Integration:** Live setlist auto-fetching proxy via Cloudflare Worker and embedded YouTube / Archive.org media player.
- [x] **Unassigned Scans Inbox:** Direct GitHub API scanner to detect and map newly uploaded image files in `/scans/` to database records.
- [x] **UX & View Engine:** Custom Viewer.js integration, responsive Grid/List views, date/location auto-complete, and "On This Day" anniversary banner.

---

### 🟡 Short-term Goals (Phase 2 – Content & UX Refinements)
- [ ] **Data Quality & Enrichment:** Standardize legacy venue names, complete missing setlist links, and audit unassigned scan items.
- [ ] **Public Search Enhancements:** Add quick filters for missing setlists, missing scans, or specific decades.
- [ ] **Mobile Experience Polish:** Optimize swipe gestures in modal viewers and touch targets for card action buttons.

---

### 🔵 Long-term Goals (Phase 3 – Admin Settings & CMS Overhaul)
> *Architecture transformation to turn the museum into a fully configurable Content Management System (CMS).*

- [ ] **Global App Configuration (`app_settings`):**
  - Public visibility toggles for individual categories (e.g., hide *T-shirts* or *Videos* until content is ready).
  - Web defaults configuration (default view mode, sort order, items per page, and feature toggles).
- [ ] **Master Data Management (Centralized Lookups):**
  - Dedicated admin UI for managing **Tours** and **Band Lineups** to prevent typos and duplicate records.
  - Dynamic category and subcategory editor (add/edit custom categories without updating frontend JS maps).
- [ ] **Relational Database Schema:**
  - Transition string-based references (`TOUR_ID`, `LINEUP`) to true foreign keys (`FK`) in Supabase for full data integrity.

Tato analýza staví na repozitáři **Joe Jackson Memorabilia Museum**. Projekt kombinuje statický webový frontend (HTML/vanilla JS s použitím databáze Supabase) s vývojovým scaffoldingem v Reactu/Vite/Tailwind.

Níže je přehled nálezů rozdělený podle architektury, code smells, duplicit, složitosti, bezpečnosti a výkonu.

---

### 1. Části vhodné k refaktorování & Architektonický dluh

* **Dvojitá architektura v repozitáři (React vs. Vanilla JS)**
* **Problém:** V projektu vedle sebe existuje moderní setup React + Vite (`src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `package.json`) a zároveň kompletní produkční aplikace napsaná v čistém HTML a vanillovém JavaScriptu (`app.js`, `index.html`, `about.html`, `edit_ticket_new.html`). Sousední soubory Reactu jsou prázdné nebo minimální.


* **Proč refaktorovat:** Tento stav zmatou vývojáře, zanáší do projektu zbytečné závislosti v `node_modules` a znemožňuje využívat výhody sestavování (bundling, minifikace, module importy).
* **Doporučení:** Rozhodnout se pro jeden směr – buď plně migrovat logiku z `app.js` do React komponent (jak naznačuje `ROADMAP.MD`), nebo odstranit React/Vite soubory a ponechat aplikaci jako čistě statický web.




* **Gigantické soubory bez modulariace (Monolitické skripty)**
* **Problém:** Soubor `app.js` má přes 1200 řádků a `edit_ticket_new.html` obsahuje přes 1500 řádků smíchaného HTML, CSS a složité logiky. Logika v `edit_ticket_new.html` řeší vše od přihlašování přes Supabase Auth, načítání z databáze, validace, nahrávání na Cloudflare Worker/GitHub API až po vyhledávání na Setlist.fm.


* **Proč refaktorovat:** Porušení principu jediné zodpovědnosti (SRP). Kód je nepřehledný, extrémně náchylný k zanášení chyb při úpravách a nelze jej rozumně automaticky testovat.
* **Doporučení:** Rozdělit skripty do samostatných ES modulů (`auth-service.js`, `setlist-service.js`, `ui-renderers.js`, `date-utils.js`).



---

### 2. Code Smells & Příliš složité části

* **Špagetová logika manipulace s DOMem v `app.js` a `edit_ticket_new.html**`
* **Problém:** Vytváření složitých UI struktur stavěním dlouhých HTML řetězců (string interpolation) a jejich ruční vkládání přes `innerHTML`.


* **Příklad:** Funkce `renderTickets` v `app.js` nebo skenování složek v `edit_ticket_new.html` skládá desítky řádků HTML v reálném čase. Vzniká tak nepřehledný mix stylů, událostí (`onclick="event.stopPropagation();..."`) a dat.




* **Složitá manuální parserovací logika datumu (`parseDateCandidates`)**
* **Problém:** Funkce `parseDateCandidates` v `app.js` obsahuje dlouhé bloky regulárních výrazů a podmínkových větví pro rozpoznávání tvarů datumu v různých jazycích (angličtina, čeština).


* **Doporučení:** Nahradit nebo zjednodušit standardní knihovnou (např. `date-fns` nebo nativním `Intl` rozhraním browseru), případně držet data v databázi striktně v ISO formátu `YYYY-MM-DD` a zpracovávat pouze ten.


* **Nedostatečná abstraktní vrstva pro LocalStorage / SessionStorage**
* **Problém:** V `app.js` jsou rozeseté pomocné funkce jako `safeGetStorage`, `safeSetStorage`, `safeGetSession`, které střídavě kontrolují existenci `StorageService` a záložní `localStorage`. Tytéž fallback podmínky se neustále opakují v `about.html` i `index.html`.





---

### 3. Duplicity v kódu

* **Duplikovaný kód pro detekci Admin režimu a odhlášení**
* Kontrola `isAdmin()` / `checkIsAdmin()` / `isAdminModeActive()` a funkce `lockAdminSession()` jsou zkopírovány s drobnými obměnami na několika místech: v `app.js`, v inline skriptu v `index.html`, v `about.html` a v `edit_ticket_new.html`.


* *Doporučení:* Vyčlenit do jednoho sdíleného souboru (např. `auth.js`).


* **Duplicitní UI prvky a HTML šablony**
* Zhlagické bloky jako hlavička, patička ("Legal Disclaimer"), oknové modály (`#noteModal`, `#setlistExitModal`) či přepínače témat se doslova opakují napříč `index.html`, `about.html`, `impressum.html` a `edit_ticket_new.html`. Při jakékoliv změně v patičce je nutné upravit všechny HTML soubory ručně.




* **Parsování a formátování lokace a setlistu**
* Funkce `formatLocationText`, `formatDisplayDate` a čtení počtu skladeb (`getSetlistSongCount`) se nachází s mírnými odchylkami jak v aplikaci pro návštěvníky (`app.js`), tak v admin editoru (`edit_ticket_new.html`).





---

### 4. Bezpečnostní rizika (Security Vulnerabilities)

* **Riziko DOM XSS (Cross-Site Scripting)**
* **Závažnost:** **Vysoká**
* **Problém:** Aplikace na mnoha místech bere neosetřená data z databáze nebo textových polí a přímým přiřazením přes `innerHTML` je vykresluje do stránky.


* **Příklad:** V `openNoteModal` (soubor `app.js`) se provádí pouze základní nahrazení `<` a `>` pomocí `.replace()`, ale následně se kód vkládá do `bodyEl.innerHTML`. Pokud by se do databáze v poli `NOTE` nebo `CONTRIBUTOR` dostal škodlivý skript, spustí se v prohlížeči uživatele/admina.


* **Řešení:** Používat `textContent` pro čistý text, nebo sanitizační knihovnu (např. `DOMPurify`) před vložením do `innerHTML`.


* **Autentizace a autorizace závislá na klintské vrstvě (Bypass Admin Módu)**
* **Závažnost:** **Střední až Vysoká**
* **Problém:** Funkce v `app.js` spoléhá na hodnotu v `localStorage` (`jj_admin_mode === 'true'`) nebo URL parametr `?admin=1`. Jakýkoliv běžný uživatel si může v konzoli nastavit `localStorage.setItem('jj_admin_mode', 'true')` a zpřístupnit si admin ovládací prvky v UI.


* **Řešení:** Zabezpečení musí ležet výhradně na databázových pravidlech (Supabase RLS – Row Level Security). V RLS pravidlech Supabase musí být operace `INSERT`, `UPDATE` a `DELETE` povoleny výhradně pro roli `authenticated`.




* **Absence Content Security Policy (CSP)**
* Web načítá skripty a styly z mnoha externích CDN (jsDelivr, cdnjs, Google Fonts) bez kontroly integrity (SRI - Subresource Integrity).





---

### 5. Výkonnostní úzká hrdla (Performance Bottlenecks)

* **Načítání kompletní databáze najednou na klientovi (Client-side Pagination)**
* **Problém:** V `app.js` i `edit_ticket_new.html` se při startu provádí dotaz `supabaseClient.from('tickets').select('*')`. Všechny záznamy z databáze se stáhnou do pole `allTickets` v paměti prohlížeče a filtrace/stránkování probíhá až na klientovi.


* **Dopad:** S rostoucím počtem lístků a skenů v databázi bude úvodní načtení stránky pomalé, spotřebuje velké množství dat na mobilních zařízeních a zatíží RAM prohlížeče.
* **Řešení:** Přechod na **Server-side pagination & filtering** přímo pomocí Supabase dotazů (použití `.range(start, end)`, `.ilike()`, `.eq()`).


* **Opakované náročné operace filtrace a řazení v poli**
* Při každém úderu do klávesy ve vyhledávání (`handleSearchInput`) se znova prochází a filtruje celé pole v paměti a regenerují se HTML tabulky/karty. Chybí zde **debounce** efekt pro vyhledávací pole.




* **Načítání velkého množství externích skriptů v `<head>**`
* Každý HTML soubor načítá Supabase JS, Viewer.js, Marked.js a Google Fonts z externích CDN blokujícím způsobem před vykreslením obsahu.





---

### Souhrnná doporučení pro další rozvoj

1. **Priorita 1 (Bezpečnost & RLS):** Ověřit, že Supabase RLS striktně blokuje zápis pro neanonymní uživatele, a ošetřit vkládání uživatelského obsahu přes DOMPurify.


2. **Priorita 2 (Refaktoring):** Sjednotit admin/auth logiku do jednoho sdíleného JS modulu a odstranit duplicitní kód.


3. **Priorita 3 (Výkon):** Převést vyhledávání a stránkování přímo na Supabase dotazy (server-side filtering) místo stahování celé databáze najednou.

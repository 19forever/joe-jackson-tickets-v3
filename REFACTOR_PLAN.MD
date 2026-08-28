Refaktoring celého webu (zejména u rozsáhlejších projektů jako digitální archivy nebo databázové aplikace) je krok, který vyžaduje pečlivou rozvahu. Správný postup vám ušetří týdny ladění "rozbitého" kódu.

---

### Kdy se pustit do refaktoringu

* **Technický dluh zpomaluje vývoj:** Každá nová funkce vyžaduje zásahy do mnoha souborů nebo způsobuje neočekávané chyby (jako nepřehledná logika v `app.js` nebo inline skriptech v HTML).


* **Nepřehledná architektura:** Kód obsahuje duplicitní logiku (např. stejné pomocné funkce nadefinované na více místech) nebo nejasné rozdělení zodpovědností.


* **Přechod na novou technologii:** Když migrujete z lokálních souborů / CSV na backendové rozhraní (např. Supabase) a v kódu zůstávají historické relikty původního řešení.


* **Složitá údržba:** Oprava jedné věci (např. stránkování nebo odhlašování) opakovaně rozbíjí jiné navázané části (přihlašování, filtry).



> **Kdy refaktoring NEDĚLAT:** Nikdy nedělejte refaktoring ve chvíli, kdy spěcháte na vydání nové klíčové funkce, nebo když nemáte přesně ujasněno, co má být výsledkem.

---

### Jak refaktoring provést krok za krokem

#### 1. Nebourejte všechno najednou (Inkrementální přístup)

Největší chybou bývá smazat staré soubory a začít psát "na zelené louce". Místo toho postupujte po malých, testovatelných částech.

#### 2. Separace logiky do samostatných modulů

Rozdělte nepřehledné monolitické soubory podle jejich odpovědnosti:

* **`api.js` / `db.js`:** Veškerá komunikace s databází (Supabase dotazy, načítání, zápis).


* **`auth.js`:** Správa přihlašování, odhlašování, kontrola admin práv a localStorage.


* **`ui.js` / `render.js`:** Vykreslování komponent (karty, modální okna, stránkování).


* **`app.js`:** Pouze inicializace a propojení jednotlivých modulů.



#### 3. Odstranění inline skriptů z HTML

Všechny `<script>` bloky uvnitř HTML souborů (jako `index.html` nebo `edit_ticket_new.html`) přesuňte do samostatných `.js` souborů. HTML by mělo obsahovat čistě strukturu a CSS styly, nikoliv aplikační logiku.

#### 4. Sjednocení stavu aplikace (State Management)

Vytvořte jeden centrální objekt pro stav aplikace (aktuální stránka, filtry, vyhledávání, stav přihlášení), ze kterého si ostatní funkce data pouze čtou, místo toho, aby si každá funkce spravovala vlastní proměnné.

#### 5. Verzování a větvování v Gitu

Před začátkem vytvořte novou větev (branch), např. `feature/refactoring-architecture`. Provádějte malé commity po každém úspěšně refaktorovaném modulu.

---

### Doporučený plán pro váš projekt

| Fáze | Cíl | Detail |
| --- | --- | --- |
| **1. Vyčištění HTML** | Odstranit inline `<script>` bloky | Přesunout logiku z `index.html` a `edit_ticket_new.html` do modulů.

 |
| **2. Izolace DB rozhraní** | Vytvořit `services/supabase.js` | Sjednotit všechny CRUD operace na jedno místo.

 |
| **3. Správa Auth & Stavu** | Vytvořit `services/auth.js` | Vyřešit přihlašování/odhlašování bez duplicity v kódu.

 |
| **4. Modularizace UI** | Rozdělit `app.js` | Oddělit vykreslování karet, filtrů a paginationu.

 |

***

Nejlepším a nejefektivnějším postupem je **kombinace obou přístupů**, přičemž **Google AI Studio + Repomix** by mělo být tvým hlavním vývojovým prostředím.

Zde je důvod a doporučené rozdělení rolí:

### Proč je AI Studio + Repomix na refaktoring výrazně lepší

1. **Obrovské kontextové okno:**
Repomix zabalí celý tvůj projekt (HTML, JS, CSS) do jednoho strukturovaného textového souboru. V AI Studiu (např. s modelem Gemini 1.5 Pro) ho pak vložíš najednou. AI tak vidí *všechny soubory současně* v jejich plném rozsahu – zná přesné vazby mezi `app.js`, `index.html`, `edit_ticket_new.html` i `storage-service.js`.


2. **Konec "slepých" chyb a přepisování:**
Při konverzaci v běžném chatu řešíme věci po částech. Když změníme funkci na jednom místě, snadno přehlédneme, že ji volá inline skript v úplně jiném souboru. V AI Studiu s Repomixem má AI kompletní mapu projektu, takže navrhne refaktoring celku bez toho, aby po cestě cokoliv "vypadlo".



---

### Jak efektivně rozdělit úlohy

* **Sem do chatu (Thought Partner & Architekt):**
* **Příprava a strategie:** Můžeme si zde nejdříve ujasnit novou strukturu složek (např. `/src/services/`, `/src/ui/`), domluvit se na pravidlech (čistý vanilla JS vs. moduly) a sepsat přesné *Zadání pro refaktoring* (Prompt Spec).


* **Do AI Studia s Repomixem (Výkonný vývojář):**
* **Spuštění Repomixu:** Generování jednoho balíčku celého repozitáře (`repomix`).
* **Vložení do AI Studia:** Zadání strukturovaného promptu společně s balíčkem kódu.
* **Generování nových modulů:** AI Studio ti vrátí kompletně přepsané, čisté a modulární soubory bez duplicit, které si jen stáhneš nebo nakopíruješ zpět do projektu.



Pokud chceš, můžeme hned teď v chatu navrhnout **přesnou strukturu nových modulů** a **připravit prompt pro AI Studio**, který pak jen přihodíš k Repomix souboru.

***

**Výhody Vite + TypeScriptu vs. čistý Vanilla JS**

* **Typescript (Typová kontrola):** Odhalí chyby v názvech proměnných nebo datových typech (např. zda databáze vrací řetězec nebo číslo) přímo v editoru během psaní, ne až po nahrání na web.
* **Vite (Build & Bundling):** Automaticky spojí kód do malých, bleskově načítaných balíčků, optimalizuje obrázky, spravuje `.env` proměnné pro klíče k API a při vývoji okamžitě promítá změny bez nutnosti obnovovat prohlížeč.
* **Vanilla JS (Bez sestavování):** Kód funguje ihned po uložení přímo v prohlížeči bez instalace Node.js/Bun nebo spouštění terminálu, což je jednodušší na údržbu, pokud nad projektem pracujete sami.

Přejdeme k sestavení kompletního promptu pro AI Studio a Repomix?

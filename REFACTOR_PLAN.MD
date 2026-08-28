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

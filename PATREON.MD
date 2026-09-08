Zde je kompletní návod a doporučení pro založení a nastavení Patreonu v přehledném **Markdown** formátu. Můžeš si jej uložit přímo do dokumentace projektu.

---

# 🎨 Patreon Setup Guide — Joe Jackson Memorabilia Museum

Tento dokument obsahuje doporučenou strukturu, texty a nastavení pro spuštění Patreonu pro nekomerční fanouškovský archiv `joejackson.band`.

---

## 🚀 1. Základní Profil (Basic Info)

* **Creator Name:** `Joe Jackson Memorabilia Museum`
* **Custom URL:** `[patreon.com/joejacksonmuseum](https://patreon.com/joejacksonmuseum)` *(případně `joejacksonband`)*
* **Category:** `Podcasts & Music` nebo `Community / Archiving`
* **Primary Language:** `English`

---

## 🖼️ 2. Vizuální Podklady (Branding)

* **Avatar (Profilový obrázek):**
* Použít ikonu oranžového lístku s textem `JJ` z loga webu.


* **Cover Photo (Banner v záhlaví):**
* Rozměr: `1600 × 400 px`
* Obsah: Vkusná koláž z dochovaných lístků, pasů (1979–2026) a koncertní fotografie Joe Jacksona.



---

## 📝 3. Popis Profilu (Profile Text)

### **Tagline (Anotace pod názvem):**

> *Preserving over 45 years of Joe Jackson's live concert history and stage memories.*

### **About Section (Hlavní text):**

```markdown
Welcome! The **Joe Jackson Memorabilia Museum** is a non-commercial, community-driven digital archive preserving concert ticket stubs, venue metadata, setlists, and rare memorabilia from 1978 to the present day.

### 💛 Why Patreon?
Exploring the museum will **always remain 100% free for everyone**. However, keeping high-resolution image servers fast, maintaining our custom domain (`joejackson.band`), and database hosting incurs monthly running costs.

By becoming a Patron, you directly cover these infrastructure expenses and keep this live music monument alive for fans worldwide!

```

---

## 🎯 4. Veřejné Cíle (Goals)

Definice transparentních cílů pro komunitu:

1. **Goal 1: $15 / month — Infrastructure & Domain Covered**
> *"Covers monthly Cloudflare, Supabase database, and domain renewal fees to keep the archive fast and reliable."*


2. **Goal 2: $35 / month — Ultra-High-Res Expansion**
> *"Allows us to store ultra-high-resolution tour program scans, vintage posters, and rare bootleg audio files."*



---

## 🎫 5. Členské Úrovně (Tiers)

Jelikož veškerý obsah muzea zůstává veřejný, odměny jsou postaveny na **uznání, komunitě a poděkování**.

### **Tier 1: Concertgoer — $3 / month**

* **Motto:** *Thank you for keeping the archive online!*
* **Odměny (Benefits):**
* Vaše jméno/nick uvedené v sekci *Supporters* na stránce `About` (`about.html`).
* Přístup k vývojářskému blogu na Patreonu (zákulisní aktualizace z vývoje archivu).



---

### **Tier 2: Front Row Patron — $7 / month**

* **Motto:** *A core supporter helping us expand the collection.*
* **Odměny (Benefits):**
* Vše z úrovně **Concertgoer**.
* Zvýrazněný odznak dárce v sekci *Supporters*.
* Možnost přednostního zpracování vašeho zaslaného lístku nebo doplnění chybějících dat z koncertu, kterého jste se zúčastnili.
* *(Volitelně)* E-mailový přesměrovač/alias s doménou (např. `yourname@joejackson.band`).



---

## ⚖️ 6. Právní Pokyny & Ochrana Značky

* **Nekomerční status:** Na Patreonu uplatňujeme výhradně model darů na pokrytí infrastruktury (*Infrastructure Grant / Non-profit Hosting Support*).
* **Žádný Paywall:** Nikdy nedávat naskenované lístky, programy ani audio záznamy za placenou zeď na Patreonu.
* **E-mailové aliasy:** U Tieru 2 nabízet pouze **Cloudflare Email Routing** (přesměrování na soukromý e-mail), nikdy ne plnohodnotné schránky. Zakázat aliasy jako `admin@`, `official@` nebo `joe@`.

---

## 🔗 7. Propojení s Kódem Webových Stránek

Po spuštění účtu nahraď testovací odkaz v souboru `about.html`:

```html
<a href="https://patreon.com/tve-patreon-jmeno" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="btn-contribute" 
   style="background: var(--bg-panel); color: var(--accent-yellow); border: 1px solid var(--accent-yellow); font-weight: 700;">
  🧡 Consider Support
</a>

```

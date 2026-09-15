/**
 * Date Utilities
 * Pomocné funkce pro parsování, převod a formátování datových řetězců.
 */

/**
 * Zkusí naparsovat neznámý datový vstup (řetězec nebo Objekt Date) 
 * a vrátí platný objekt Date, nebo null při selhání.
 * @param {string|Date} dateVal - Datum ke zpracování.
 * @return {Date|null} Platný objekt Date nebo null.
 */
function parseDateCandidates(dateVal) {
  if (!dateVal) return null;
  if (dateVal instanceof Date && !isNaN(dateVal.getTime())) {
    return dateVal;
  }

  const str = String(dateVal).trim();
  if (!str) return null;

  // 1. Standardní ISO parsování
  let d = new Date(str);
  if (!isNaN(d.getTime())) return d;

  // 2. Parsování českého formátu DD.MM.YYYY
  const czMatch = str.match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})$/);
  if (czMatch) {
    const day = parseInt(czMatch[1], 10);
    const month = parseInt(czMatch[2], 10) - 1;
    const year = parseInt(czMatch[3], 10);
    d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  return null;
}

/**
 * Převede datum na formátovaný řetězec v českém formátu (např. "15. 9. 2026").
 * @param {string|Date} dateVal - Datum k zobrazení.
 * @param {string} fallbackText - Hodnota, která se vrátí v případě neplatného data.
 * @return {string} Formátovaný řetězec data.
 */
function formatDisplayDate(dateVal, fallbackText = '') {
  const d = parseDateCandidates(dateVal);
  if (!d) return fallbackText;

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}. ${month}. ${year}`;
}

// Export do globálního okna (pro klasické skripty bez ES modulů)
window.parseDateCandidates = parseDateCandidates;
window.formatDisplayDate = formatDisplayDate;

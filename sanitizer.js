/**
 * Sanitizer Utilities
 * Pomocné funkce pro ošetření HTML řetězců před vykreslením do DOMu.
 */

/**
 * Převede nebezpečné HTML znaky na bezpečné HTML entity.
 * @param {string} str - Vstupní text k ošetření.
 * @return {string} Bezpečný text pro vložení do innerHTML.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Ošetří HTML znaky a zároveň zachová zalomení řádků (převede \n na <br>).
 * @param {string} str - Vstupní víceřádkový text.
 * @return {string} Bezpečný text s HTML zalomením řádků.
 */
function escapeHtmlWithBreaks(str) {
  if (str === null || str === undefined) return '';
  return escapeHtml(str).replace(/\r?\n/g, '<br>');
}

// Export do globálního okna (pro klasické skripty bez ES modulů)
window.escapeHtml = escapeHtml;
window.escapeHtmlWithBreaks = escapeHtmlWithBreaks;

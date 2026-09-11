// Pomocné funkce pro ochranu před DOM XSS (Striktní Sanitizace včetně uvozovek)
function escapeHtml(text) {
  if (!text && text !== 0) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlWithBreaks(text) {
  if (!text && text !== 0) return '';
  const escaped = escapeHtml(text);
  return escaped.replace(/\\n/g, '<br>').replace(/\r?\n/g, '<br>');
}

function isValidValue(val) {
  if (!val) return false;
  const clean = String(val).trim().toLowerCase();
  return clean !== '' && clean !== 'není k dispozici' && clean !== 'n/a' && clean !== 'undefined' && clean !== 'null' && clean !== 'missing' && clean !== 'missing_item.svg';
}

function getScanCount(scanField) {
  if (!scanField || typeof scanField !== 'string') return 0;
  return scanField.split(',')
    .map(f => f.trim())
    .filter(f => f.length > 0 && f.toLowerCase() !== 'missing_item.svg').length;
}

function getSetlistSongCount(setlistStr) {
  if (!isValidValue(setlistStr)) return 0;
  return setlistStr
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !(s.startsWith('[') && s.endsWith(']'))).length;
}

function formatDisplayDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '';
  const parts = dateStr.trim().split('-');
  if (parts.length !== 3) return dateStr;

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (isNaN(day) || monthIdx < 0 || monthIdx > 11) return dateStr;

  let suffix = "th";
  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${day}${suffix} ${months[monthIdx]} ${year}`;
}

function formatLocationText(t) {
  if (!t) return '';
  let locationParts = [];
  if (isValidValue(t.MESTO)) locationParts.push(t.MESTO);
  if (isValidValue(t.STAT)) locationParts.push(t.STAT);
  
  let locStr = locationParts.join(', ');
  if (isValidValue(t.VENUE)) {
    locStr += locStr ? ` - ${t.VENUE}` : t.VENUE;
  }
  if (!locStr && isValidValue(t.TOUR_NAME)) {
    locStr = t.TOUR_NAME;
  }
  return locStr;
}

function safeGetStorage(key, defaultVal = null) {
  if (typeof StorageService !== 'undefined') {
    return StorageService.get(key, defaultVal);
  }
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function safeSetStorage(key, val) {
  if (typeof StorageService !== 'undefined') {
    StorageService.set(key, val);
    return;
  }
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
}

function safeRemoveStorage(key) {
  if (typeof StorageService !== 'undefined') {
    StorageService.remove(key);
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

function safeGetSession(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeSetSession(key, val) {
  try {
    sessionStorage.setItem(key, val);
  } catch (e) {}
}

function safeRemoveSession(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {}
}

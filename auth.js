// Shared Helper to check if user is in Admin mode
function checkIsAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  const storedPat = safeGetStorage('gh_token') || safeGetStorage('jj_github_pat');
  const adminParam = urlParams.get('admin') === '1';
  const adminFlag = safeGetStorage('jj_admin_mode') === 'true';
  const hasPat = !!(storedPat && storedPat.trim().length > 0);
  return adminParam || adminFlag || hasPat;
}

// Shared Global Lock Admin helper to clear sessions and return to public user mode
window.lockAdminSession = function() {
  if (typeof supabaseClient !== 'undefined' && supabaseClient.auth) {
    supabaseClient.auth.signOut();
  }

  if (typeof StorageService !== 'undefined') {
    StorageService.setGitHubConfig({ token: '' });
    StorageService.remove('jj_admin_mode');
  } else {
    safeRemoveStorage('jj_github_pat');
    safeRemoveStorage('gh_token');
    safeRemoveStorage('jj_admin_mode');
  }
  safeRemoveSession('jj_admin_mode');

  localStorage.removeItem('sb-access-token');
  localStorage.removeItem('sb-refresh-token');

  const url = new URL(window.location.href);
  if (url.searchParams.has('admin')) {
    url.searchParams.delete('admin');
    window.location.href = url.pathname;
  } else {
    window.location.href = 'index.html';
  }
};

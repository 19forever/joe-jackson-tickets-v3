/**
 * Cloudflare Worker – GitHub Scans Uploader
 * Repozitář: 19forever/joe-jackson-tickets-v3
 * Složka: /scans/
 */

const GITHUB_REPO_OWNER = '19forever';
const GITHUB_REPO_NAME = 'joe-jackson-tickets-v3';
const GITHUB_TARGET_FOLDER = 'scans';

// CORS hlavičky pro povolené domény
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // V produkci nahraď za 'https://jj-archive.net'
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request, env) {
    // 1. Ošetření CORS preflight dotazů (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    try {
      // 2. Načtení dat z požadavku (FormData nebo JSON)
      const contentType = request.headers.get('content-type') || '';
      let fileBuffer, fileName, fileMime;

      if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('Attachment');

        if (!file || typeof file === 'string') {
          return new Response(JSON.stringify({ error: 'Chybí soubor v příloze.' }), {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }

        fileBuffer = await file.arrayBuffer();
        fileName = formData.get('fileName') || file.name || `scan_${Date.now()}.webp`;
        fileMime = file.type || 'image/webp';
      } else if (contentType.includes('application/json')) {
        const json = await request.json();
        if (!json.base64Data) {
          return new Response(JSON.stringify({ error: 'Chybí base64Data.' }), {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }

        // Odstranění data:image/...;base64, pokud je přítomno
        const base64Clean = json.base64Data.replace(/^data:image\/\w+;base64,/, '');
        fileBuffer = Uint8Array.from(atob(base64Clean), c => c.charCodeAt(0)).buffer;
        fileName = json.fileName || `scan_${Date.now()}.webp`;
      } else {
        return new Response(JSON.stringify({ error: 'Unsupported Content-Type' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // Sanitize násobení/mezer v názvu souboru
      const safeFileName = fileName.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9._-]/g, '');
      const filePath = `${GITHUB_TARGET_FOLDER}/${safeFileName}`;

      // Prevod ArrayBuffer do Base64 pro GitHub API
      const base64Content = arrayBufferToBase64(fileBuffer);

      // 3. Kontrola GitHub PAT tokenu v prostředí Cloudflare Workeru
      const githubToken = env.GITHUB_PAT;
      if (!githubToken) {
        return new Response(JSON.stringify({ error: 'GITHUB_PAT neni nastaven v Cloudflare Workeru.' }), {
          status: 500,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // 4. Volání GitHub REST API (PUT /repos/{owner}/{repo}/contents/{path})
      const githubUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;
      
      const ghResponse = await fetch(githubUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'Cloudflare-Worker-Uploader',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `upload(scan): auto-add ${safeFileName} via website upload`,
          content: base64Content,
        }),
      });

      const ghData = await ghResponse.json();

      if (!ghResponse.ok) {
        console.error('GitHub API Error:', ghData);
        return new Response(JSON.stringify({ 
          error: 'Chyba při ukládání na GitHub API.', 
          details: ghData.message || ghData 
        }), {
          status: ghResponse.status,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      // 5. Úspěšná odpověď
      return new Response(JSON.stringify({
        success: true,
        fileName: safeFileName,
        path: filePath,
        downloadUrl: ghData.content?.download_url,
        htmlUrl: ghData.content?.html_url,
      }), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });

    } catch (err) {
      console.error('Worker Exception:', err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  }
};

// Pomocná funkce pro převod ArrayBuffer -> Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

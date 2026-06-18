/**
 * fix-paths.mjs — convierte rutas absolutas a relativas para file:// protocol
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, dirname } from "node:path";

const OUT_DIR = join(process.cwd(), "out");

async function getAllHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await getAllHtmlFiles(full)));
    else if (e.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function prefix(htmlPath) {
  const rel = relative(OUT_DIR, dirname(htmlPath));
  if (!rel || rel === ".") return ".";
  return Array(rel.split(/[\\/]/).length).fill("..").join("/");
}

async function main() {
  const files = await getAllHtmlFiles(OUT_DIR);
  console.log(`Fixing ${files.length} HTML files...`);
  for (const f of files) {
    let c = await readFile(f, "utf-8");
    const p = prefix(f);
    c = c.replace(/(["'(=])\/_next\//g, `$1${p}/_next/`);
    const routes = ["noticias","juegos","reviews","videos","comunidad","mi-radar","buscar","perfil","onboarding","notificaciones","design-system"];
    c = c.replace(new RegExp(`(href=["'])/(?=(${routes.join("|")}))`, "g"), `$1${p}/`);
    c = c.replace(/href=["']\/["']/g, `href="${p === "." ? "./index.html" : p + "/index.html"}"`);
    c = c.replace(/(["'(=])\/favicon/g, `$1${p}/favicon`);

    const headScript = `
<script>
  if (window.location.protocol === 'file:') {
    var style = document.createElement('style');
    style.id = 'lu-file-protocol-fix';
    style.innerHTML = '#lu-preloader { display: none !important; } body { overflow: auto !important; }';
    document.head.appendChild(style);
  }
</script>
`;
    c = c.replace("<head>", `<head>${headScript}`);

    const fallbackScript = `
<script>
  (function() {
    setTimeout(function() {
      var loader = document.getElementById('lu-preloader');
      if (loader && !loader.classList.contains('-translate-y-full') && loader.style.transform !== 'translateY(-100%)') {
        var percentEl = document.getElementById('lu-preloader-percent');
        var barEl = document.getElementById('lu-preloader-bar');
        var msgEl = document.getElementById('lu-preloader-message');
        var messages = [
          "SYSTEM INIT: LEVELUP V1.0.0",
          "SCANNING GAMING DATABASE...",
          "SYNCING PLATFORM METRICS...",
          "INITIALIZING RADAR SYSTEM...",
          "LOADING COMPLETED"
        ];
        var p = 0;
        var interval = setInterval(function() {
          p += 2;
          if (p > 100) p = 100;
          if (percentEl) {
            percentEl.innerHTML = (p < 10 ? '00' : p < 100 ? '0' : '') + p + '<span class="text-brand">%</span>';
          }
          if (barEl) {
            barEl.style.width = p + '%';
          }
          if (msgEl) {
            var msgIdx = Math.min(Math.floor((p / 100) * messages.length), messages.length - 1);
            msgEl.innerHTML = '<span class="inline-block h-2 w-2 animate-pulsedot bg-brand mr-2 rounded-full"></span>' + messages[msgIdx];
          }
          if (p >= 100) {
            clearInterval(interval);
            loader.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
            loader.style.transform = 'translateY(-100%)';
            document.body.style.overflow = '';
            setTimeout(function() { loader.style.display = 'none'; }, 800);
          }
        }, 15);
      }
    }, 150);
  })();
</script>
`;
    c = c.replace("</body>", `${fallbackScript}</body>`);

    await writeFile(f, c, "utf-8");
  }
  console.log("Done fixing paths");
}

main();

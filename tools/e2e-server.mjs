import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env['PORT'] ?? 4200);
const root = fileURLToPath(new URL('../dist/tonys-workbench/browser', import.meta.url));
const indexPath = join(root, 'index.html');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml']
]);

const server = createServer((request, response) => {
  const requestPath = new URL(request.url ?? '/', `http://127.0.0.1:${port}`).pathname;
  const normalizedPath = normalize(decodeURIComponent(requestPath)).replace(/^(\.\.[/\\])+/, '');
  const filePath = join(root, normalizedPath === '/' ? 'index.html' : normalizedPath);
  const assetPath = existsSync(filePath) && statSync(filePath).isFile() ? filePath : indexPath;
  const contentType = contentTypes.get(extname(assetPath)) ?? 'application/octet-stream';

  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': contentType
  });

  createReadStream(assetPath).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`E2E server listening on http://127.0.0.1:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0);
    });
  });
}

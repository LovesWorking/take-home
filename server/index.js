// Mock product API. Zero dependencies: Node's built-in http module serves
// products.json so both apps fetch data the same way they would from a real backend.
//
//   GET /api/products      ->  Product[]
//   GET /api/products/:id  ->  Product
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

const PORT = Number(process.env.PORT ?? 4000);
const LATENCY_MS = 300; // small delay so loading states are visible in the apps

const products = JSON.parse(await readFile(new URL('./products.json', import.meta.url), 'utf8'));

createServer((req, res) => {
  // Allow the web app (different origin/port) to call this API from the browser.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/api/products') {
    setTimeout(() => res.end(JSON.stringify(products)), LATENCY_MS);
    return;
  }

  const detail = req.method === 'GET' && req.url?.match(/^\/api\/products\/([^/]+)$/);
  const product = detail && products.find((p) => p.id === decodeURIComponent(detail[1]));
  if (product) {
    setTimeout(() => res.end(JSON.stringify(product)), LATENCY_MS);
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not found' }));
}).listen(PORT, () => {
  console.log(`Product API listening on http://localhost:${PORT}/api/products`);
});

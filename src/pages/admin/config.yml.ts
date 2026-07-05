import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  const configPath = path.resolve('public/config.yml');
  const body = fs.readFileSync(configPath, 'utf-8');
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/yaml; charset=utf-8' },
  });
}

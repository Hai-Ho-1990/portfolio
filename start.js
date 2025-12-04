#!/usr/bin/env node
import path from 'path';
import { existsSync } from 'fs';

function findServer() {
  const cwd = process.cwd();
  // search current and up to 4 parent directories
  for (let i = 0; i < 5; i++) {
    const checkPath = path.join(cwd, ...Array(i).fill('..'), 'dist', 'server.js');
    const normalized = path.resolve(checkPath);
    if (existsSync(normalized)) return normalized;
  }
  return null;
}

const serverPath = findServer();
if (!serverPath) {
  console.error('Could not locate dist/server.js. Searched up from', process.cwd());
  process.exit(1);
}

(async () => {
  try {
    await import(serverPath);
  } catch (err) {
    console.error('Failed to import server:', err);
    process.exit(1);
  }
})();

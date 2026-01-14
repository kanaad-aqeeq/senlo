#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function readPortFromFile(file) {
  try {
    if (!fs.existsSync(file)) return null;
    const content = fs.readFileSync(file, 'utf8');
    const m = content.match(/^\s*PORT\s*=\s*(?:'([^']*)'|"([^"]*)"|([^#\r\n]*))/m);
    if (m) return (m[1] || m[2] || m[3] || '').trim();
  } catch (e) {}
  return null;
}

const cwd = process.cwd();
const candidates = [
  path.resolve(cwd, '..', '..', '.env.local'),
  path.resolve(cwd, '..', '..', '.env'),
  path.resolve(cwd, '.env.local'),
  path.resolve(cwd, '.env'),
];

for (const f of candidates) {
  if (!process.env.PORT) {
    const p = readPortFromFile(f);
    if (p) process.env.PORT = p;
  }
}

// Try to use local next binary first, fallback to npx if not found
const localNext = path.resolve(cwd, 'node_modules', '.bin', `next${process.platform === 'win32' ? '.cmd' : ''}`);
let child;
if (fs.existsSync(localNext)) {
  // use shell true to avoid ENOENT/EINVAL when executing scripts on Windows
  child = spawn(`${localNext} dev`, { stdio: 'inherit', env: process.env, cwd, shell: true });
} else {
  child = spawn('npx next dev', { stdio: 'inherit', env: process.env, cwd, shell: true });
}

child.on('exit', (code) => process.exit(code));
child.on('error', (err) => { console.error(err); process.exit(1); });

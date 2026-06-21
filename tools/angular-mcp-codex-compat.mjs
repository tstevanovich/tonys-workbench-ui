import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const angularCliPath = resolve(workspaceRoot, 'node_modules/@angular/cli/bin/ng.js');

const child = spawn(process.execPath, [angularCliPath, 'mcp'], {
  cwd: workspaceRoot,
  env: process.env,
  stdio: ['pipe', 'pipe', 'pipe'],
  windowsHide: true
});

process.stdin.pipe(child.stdin);
child.stderr.pipe(process.stderr);

const output = createInterface({
  input: child.stdout,
  crlfDelay: Infinity
});

output.on('line', (line) => {
  process.stdout.write(`${sanitizeProtocolLine(line)}\n`);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error.message);
  process.exit(1);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

function sanitizeProtocolLine(line) {
  try {
    const message = JSON.parse(line);
    stripContentAnnotations(message?.result);

    return JSON.stringify(message);
  } catch {
    return line;
  }
}

function stripContentAnnotations(result) {
  if (!Array.isArray(result?.content)) {
    return;
  }

  for (const item of result.content) {
    if (item && typeof item === 'object') {
      delete item.annotations;
    }
  }
}

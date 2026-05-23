import { spawn } from 'node:child_process';
import { request } from 'node:http';
import { join } from 'node:path';

const port = Number(process.env['PORT'] ?? 4200);
const server = spawn(process.execPath, ['tools/e2e-server.mjs'], {
  stdio: ['ignore', 'inherit', 'inherit']
});

const waitForServer = async () => {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    const ready = await new Promise((resolve) => {
      const check = request(
        {
          hostname: '127.0.0.1',
          port,
          path: '/',
          timeout: 1_000
        },
        (response) => {
          response.resume();
          resolve(response.statusCode === 200);
        }
      );

      check.on('error', () => resolve(false));
      check.on('timeout', () => {
        check.destroy();
        resolve(false);
      });
      check.end();
    });

    if (ready) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`E2E server did not become available on port ${port}.`);
};

try {
  await waitForServer();

  const cli = join('node_modules', '@playwright', 'test', 'cli.js');
  const result = spawn(process.execPath, [cli, 'test', ...process.argv.slice(2)], {
    stdio: 'inherit'
  });

  result.on('exit', (code) => {
    server.kill();
    process.exit(code ?? 1);
  });
} catch (error) {
  server.kill();
  console.error(error);
  process.exit(1);
}

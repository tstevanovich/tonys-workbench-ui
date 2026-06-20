import 'dotenv/config';

import { createServer } from 'node:http';

import { createApp } from './app.js';
import { loadServerConfig } from './config.js';

const config = loadServerConfig();
const app = createApp();
const server = createServer(app);

server.listen(config.port, () => {
  console.log(`Tony's Workbench server listening on port ${config.port}`);
});

function shutdown(signal: NodeJS.Signals) {
  console.log(`Received ${signal}; shutting down Tony's Workbench server.`);

  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

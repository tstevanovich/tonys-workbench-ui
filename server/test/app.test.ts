import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { type AppDependencies, createApp } from '../src/app.js';
import { type DataAccessStatus } from '../src/features/system/data-access-status.repository.js';

const dataAccessStatus: DataAccessStatus = {
  apiEdge: 'node-server',
  databaseAccess: 'direct-sql-server',
  routePattern: 'routes-handlers-repositories',
  sqlOwner: 'node-server'
};

const appDependencies: AppDependencies = {
  system: {
    readDataAccessStatus: async () => dataAccessStatus
  }
};

describe('createApp', () => {
  it('returns health status', async () => {
    const response = await request(createApp(appDependencies)).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok'
    });
  });

  it('documents Node.js ownership for SQL-backed API routes', async () => {
    const response = await request(createApp(appDependencies)).get(
      '/api/system/data-access/status'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(dataAccessStatus);
  });

  it('returns a safe API 404 response', async () => {
    const response = await request(createApp(appDependencies)).get('/api/unknown');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: 'api_route_not_found',
      message: 'The requested API route is not available.'
    });
  });

  it('serves the built Angular shell for browser routes', async () => {
    const clientStaticPath = mkdtempSync(join(tmpdir(), 'tonys-workbench-client-'));
    writeFileSync(join(clientStaticPath, 'index.html'), '<app-root></app-root>');

    try {
      const response = await request(
        createApp({
          ...appDependencies,
          clientStaticPath
        })
      ).get('/workspace');

      expect(response.status).toBe(200);
      expect(response.text).toContain('<app-root></app-root>');
    } finally {
      rmSync(clientStaticPath, { force: true, recursive: true });
    }
  });
});

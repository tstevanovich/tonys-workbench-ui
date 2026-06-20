import { type Request, type Response, Router } from 'express';

import {
  type DataAccessStatus,
  readDataAccessStatus,
  type SqlQueryExecutor
} from './data-access-status.repository.js';

export interface SystemRoutesDependencies {
  readDataAccessStatus?: () => Promise<DataAccessStatus>;
  getSqlPool?: () => Promise<SqlQueryExecutor>;
}

export function createSystemRouter(dependencies: SystemRoutesDependencies = {}) {
  const router = Router();

  router.get('/data-access/status', async (_request: Request, response: Response) => {
    const sqlPool = dependencies.getSqlPool;
    const status = dependencies.readDataAccessStatus
      ? await dependencies.readDataAccessStatus()
      : await readDataAccessStatus(await requireSqlPool(sqlPool));

    response.status(200).json(status);
  });

  return router;
}

async function requireSqlPool(getSqlPool: SystemRoutesDependencies['getSqlPool']) {
  if (!getSqlPool) {
    throw new Error('SQL Server pool dependency is not configured.');
  }

  return getSqlPool();
}

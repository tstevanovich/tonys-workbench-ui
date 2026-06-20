import mssql, { type config as MssqlConfig, type ConnectionPool } from 'mssql';

import { type SqlServerConfig } from '../config.js';

let sqlPoolPromise: Promise<ConnectionPool> | undefined;

export function createSqlServerConfig(config: SqlServerConfig): MssqlConfig {
  return {
    database: config.database,
    password: config.password,
    pool: config.pool,
    port: config.port,
    server: config.host,
    user: config.user,
    options: {
      encrypt: config.encrypt,
      trustServerCertificate: config.trustServerCertificate
    }
  };
}

export function getSqlPool(config: SqlServerConfig): Promise<ConnectionPool> {
  sqlPoolPromise ??= new mssql.ConnectionPool(createSqlServerConfig(config)).connect();

  return sqlPoolPromise;
}

export async function closeSqlPool() {
  if (!sqlPoolPromise) {
    return;
  }

  const pool = await sqlPoolPromise;
  sqlPoolPromise = undefined;
  await pool.close();
}

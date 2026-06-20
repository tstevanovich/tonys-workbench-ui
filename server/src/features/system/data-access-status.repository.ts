export interface DataAccessStatus {
  apiEdge: 'node-server';
  databaseAccess: 'direct-sql-server';
  routePattern: 'routes-handlers-repositories';
  sqlOwner: 'node-server';
}

export interface SqlQueryExecutor {
  query<T>(command: string): Promise<{
    recordset: T[];
  }>;
}

type DataAccessStatusRow = DataAccessStatus;

export async function readDataAccessStatus(sql: SqlQueryExecutor): Promise<DataAccessStatus> {
  const result = await sql.query<DataAccessStatusRow>(`
    select
      cast('node-server' as varchar(64)) as apiEdge,
      cast('direct-sql-server' as varchar(64)) as databaseAccess,
      cast('routes-handlers-repositories' as varchar(64)) as routePattern,
      cast('node-server' as varchar(64)) as sqlOwner
  `);

  return result.recordset[0] ?? defaultDataAccessStatus;
}

export const defaultDataAccessStatus: DataAccessStatus = {
  apiEdge: 'node-server',
  databaseAccess: 'direct-sql-server',
  routePattern: 'routes-handlers-repositories',
  sqlOwner: 'node-server'
};

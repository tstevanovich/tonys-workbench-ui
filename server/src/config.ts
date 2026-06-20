import { z } from 'zod';

const serverConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),
  CLIENT_DEV_SERVER_URL: z.url().optional(),
  SQL_SERVER_HOST: z.string().min(1).default('localhost'),
  SQL_SERVER_PORT: z.coerce.number().int().positive().max(65535).default(1433),
  SQL_SERVER_DATABASE: z.string().min(1).default('TonysWorkbench'),
  SQL_SERVER_USER: z.string().optional(),
  SQL_SERVER_PASSWORD: z.string().optional(),
  SQL_SERVER_ENCRYPT: z.enum(['true', 'false']).default('true'),
  SQL_SERVER_TRUST_CERTIFICATE: z.enum(['true', 'false']).default('true'),
  SQL_SERVER_POOL_MIN: z.coerce.number().int().min(0).default(0),
  SQL_SERVER_POOL_MAX: z.coerce.number().int().positive().default(10)
});

export interface SqlServerConfig {
  database: string;
  encrypt: boolean;
  host: string;
  password?: string;
  pool: {
    max: number;
    min: number;
  };
  port: number;
  trustServerCertificate: boolean;
  user?: string;
}

export interface ServerConfig {
  clientDevServerUrl?: string;
  database: SqlServerConfig;
  environment: 'development' | 'test' | 'production';
  port: number;
}

export function loadServerConfig(environment: NodeJS.ProcessEnv = process.env): ServerConfig {
  const config = serverConfigSchema.parse(environment);

  return {
    clientDevServerUrl: config.CLIENT_DEV_SERVER_URL,
    database: {
      database: config.SQL_SERVER_DATABASE,
      encrypt: config.SQL_SERVER_ENCRYPT === 'true',
      host: config.SQL_SERVER_HOST,
      password: config.SQL_SERVER_PASSWORD,
      pool: {
        max: config.SQL_SERVER_POOL_MAX,
        min: config.SQL_SERVER_POOL_MIN
      },
      port: config.SQL_SERVER_PORT,
      trustServerCertificate: config.SQL_SERVER_TRUST_CERTIFICATE === 'true',
      user: config.SQL_SERVER_USER
    },
    environment: config.NODE_ENV,
    port: config.PORT
  };
}

import { existsSync } from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import express, { type ErrorRequestHandler, type Request, type Response } from 'express';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { type Options as PinoHttpOptions, pinoHttp } from 'pino-http';

import { loadServerConfig } from './config.js';
import { getSqlPool } from './database/sql-server.js';
import {
  createSystemRouter,
  type SystemRoutesDependencies
} from './features/system/system.routes.js';

export interface AppDependencies {
  clientStaticPath?: false | string;
  system?: SystemRoutesDependencies;
}

export function createApp(dependencies: AppDependencies = {}) {
  const config = loadServerConfig();
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '1mb' }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(pinoHttp(createHttpLoggerOptions(config.environment)));
  }

  app.get('/health', (_request: Request, response: Response) => {
    response.status(200).json({
      status: 'ok'
    });
  });

  app.use(
    '/api/system',
    createSystemRouter({
      getSqlPool: () => getSqlPool(config.database),
      ...dependencies.system
    })
  );

  app.use('/api', (_request: Request, response: Response) => {
    response.status(404).json({
      code: 'api_route_not_found',
      message: 'The requested API route is not available.'
    });
  });

  if (config.clientDevServerUrl) {
    app.use(
      createProxyMiddleware({
        changeOrigin: true,
        target: config.clientDevServerUrl,
        ws: true
      })
    );
  } else {
    const clientStaticPath =
      dependencies.clientStaticPath === false
        ? undefined
        : (dependencies.clientStaticPath ?? resolveClientStaticPath());

    if (clientStaticPath && existsSync(join(clientStaticPath, 'index.html'))) {
      app.use(express.static(clientStaticPath, { index: false }));
      app.get(/^\/(?!api(?:\/|$)).*/, (_request: Request, response: Response) => {
        response.sendFile('index.html', { root: clientStaticPath });
      });
    }
  }

  app.use(errorHandler);

  return app;
}

const errorHandler: ErrorRequestHandler = (_error, _request, response, _next) => {
  response.status(500).json({
    code: 'internal_server_error',
    message: 'Unexpected server error.'
  });
};

function resolveClientStaticPath() {
  return fileURLToPath(
    new URL('../../client/dist/tonys-workbench-client/browser', import.meta.url)
  );
}

function createHttpLoggerOptions(
  environment: 'development' | 'test' | 'production'
): PinoHttpOptions<IncomingMessage, ServerResponse> {
  if (environment !== 'development') {
    return {};
  }

  return {
    customLogLevel: (request, response, error) => {
      if (error || response.statusCode >= 500) {
        return 'error';
      }

      if (response.statusCode >= 400) {
        return 'warn';
      }

      return isDevelopmentAppRequest(request) ? 'info' : 'silent';
    },
    customSuccessObject: (request, response, value) => ({
      method: request.method,
      url: request.url,
      statusCode: response.statusCode,
      responseTime: value.responseTime
    }),
    customErrorObject: (request, response, error, value) => ({
      error,
      method: request.method,
      url: request.url,
      statusCode: response.statusCode,
      responseTime: value.responseTime
    })
  };
}

function isDevelopmentAppRequest(request: IncomingMessage) {
  const url = request.url ?? '';

  return url === '/health' || url.startsWith('/api/');
}

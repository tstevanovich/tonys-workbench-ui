# 0007 Node.js Server Owns SQL-Backed API Routes

## Status

Accepted

## Context

The earlier architecture routed browser calls through a Node.js Backend-for-Frontend and then treated Java/Spring Boot services as the normal place for API implementation, REST service calls, and database-facing domain APIs. New workplace evidence changes that boundary: Angular should call Node.js API URLs, and the Node.js API code should use direct SQL Server data access for application data by default.

Tony's Workbench needs the repo documentation and server workspace to reflect that the Node.js server in `tonys-workbench-ui/server` is the web/API edge and the default SQL-backed API owner.

## Decision

Use the Node.js server in `tonys-workbench-ui/server` as the default runtime for browser-facing API routes and SQL Server-backed data access:

- Angular calls same-origin `/api/...` routes exposed by the Node.js server.
- The Node.js server owns request validation, response shaping, safe error mapping, server-side auth mediation, runtime configuration, SQL Server connection pooling, and SQL-backed data access.
- SQL lives in repositories/query modules, not directly inside Express route handlers.
- Route handlers call handlers/use cases, handlers call repositories/query modules, and repositories/query modules call SQL Server.
- Java/Spring Boot is no longer the default API or data-access path.
- Java services remain available for durable domain services, transaction boundaries, persistence workflows, event streaming, background work, and capabilities that need a separate backend service lifecycle.
- Browser-facing OpenAPI contracts live with the UI/server repository. Service-facing contracts for optional Java services live with the services repository only when those services exist.

## Consequences

The UI repository now owns more backend behavior than a thin BFF. Server code needs real TypeScript, linting, route tests, repository tests, dependency scanning, structured logging, health checks, SQL Server configuration, and deployment packaging.

Java guidance stays in the docs as an optional domain-service pattern, but docs should stop implying that every API or database workflow flows through Java. When a new feature needs data, start by designing the Angular-to-Node route, the Node DTO/mapper, and the SQL Server repository/query module. Add Java only when the use case needs durable backend ownership beyond the Node web/API edge.

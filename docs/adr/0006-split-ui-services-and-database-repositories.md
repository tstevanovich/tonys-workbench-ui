# 0006 Split UI, Services, And Database Repositories

## Status

Accepted

## Context

Tony's Workbench is growing from one Angular-focused repository into a multi-repository application model. The enterprise reference pattern keeps the browser application and Node.js web/API server together, keeps optional Java services in their own service repositories, and keeps database-owned schema assets in their own repository.

The documentation experience should remain centralized in the UI app for now so the project has one source of guidance while the split is introduced. The long-term direction is to move editable documentation content into database-backed markdown storage when the database layer is mature enough to own versioned, permissioned, reviewed content.

## Decision

Split Tony's Workbench into three repositories:

- `tonys-workbench-ui` owns the Angular client and Node.js web/API server.
- `tonys-workbench-services` owns Java/Spring Boot services only when a feature needs a separate durable domain, persistence, eventing, or background-work boundary.
- `tonys-workbench-database` owns SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.

Within `tonys-workbench-ui`:

- `client/` owns the Angular application, browser routes, UI state, documentation rendering, generated browser-facing API clients, and web assets.
- `server/` owns the Node.js web/API server, same-origin `/api/...` routes, browser request validation, response shaping, safe error mapping, token mediation, SQL Server connection configuration, and SQL-backed repository/query modules.

Contract ownership follows the runtime boundary:

- Browser-facing OpenAPI contracts live with the UI/server repository.
- Java service OpenAPI contracts live with the services repository only for optional Java services that actually exist.
- Database migration contracts and changelog ownership live with the database repository.

## Consequences

The UI repository becomes the central documentation host and web/API edge workspace. Java and database work should be created in sibling repositories only when a feature needs those ownership boundaries instead of adding them under this repository.

The architecture gains clearer ownership and closer alignment with enterprise microservice delivery. Cross-repo changes will need coordinated contracts, documentation updates, CI checks, and release notes so the UI, services, and database layers evolve together without hiding dependencies.

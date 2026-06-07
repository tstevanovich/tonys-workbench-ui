# 0006 Split UI, Services, And Database Repositories

## Status

Accepted

## Context

Tony's Workbench is growing from one Angular-focused repository into a multi-repository application model. The enterprise reference pattern keeps the browser application and Node.js Backend-for-Frontend together, keeps Java microservices in their own service repositories, and keeps database-owned schema assets in their own repository.

The documentation experience should remain centralized in the UI app for now so the project has one source of guidance while the split is introduced. The long-term direction is to move editable documentation content into database-backed markdown storage when the database layer is mature enough to own versioned, permissioned, reviewed content.

## Decision

Split Tony's Workbench into three repositories:

- `tonys-workbench-ui` owns the Angular client and Node.js Backend-for-Frontend.
- `tonys-workbench-services` owns Java/Spring Boot microservices that the BFF calls.
- `tonys-workbench-database` owns SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.

Within `tonys-workbench-ui`:

- `client/` owns the Angular application, browser routes, UI state, documentation rendering, generated browser-facing API clients, and web assets.
- `server/` owns the future Node.js BFF module, same-origin `/api/...` routes, browser request validation, response shaping, safe error mapping, token mediation, and calls to Java services.

Contract ownership follows the runtime boundary:

- Browser-facing OpenAPI contracts live with the UI/BFF repository.
- Java service OpenAPI contracts live with the services repository.
- Database migration contracts and changelog ownership live with the database repository.

## Consequences

The UI repository becomes the central documentation host and web-edge workspace rather than the place where every layer is implemented. Java and database work should be created in sibling repositories instead of being added under this repository.

The architecture gains clearer ownership and closer alignment with enterprise microservice delivery. Cross-repo changes will need coordinated contracts, documentation updates, CI checks, and release notes so the UI, services, and database layers evolve together without hiding dependencies.

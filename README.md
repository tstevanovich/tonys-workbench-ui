# Tony's Workbench UI

Tony's Workbench is a personal workspace for living documentation, planning, AI workflows, code assistance, side projects, career material, and tool integrations.

This repository contains the UI tier:

- `client/` contains the Angular application and in-app documentation experience.
- `server/` is reserved for the Node.js Backend-for-Frontend that will expose same-origin `/api/...` routes for the Angular client.

Sibling repositories own the other layers:

- `tonys-workbench-services` owns Java/Spring Boot microservices.
- `tonys-workbench-database` owns SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.

The project is evolving toward an enterprise-aligned full-stack architecture with Angular, a Node.js Backend-for-Frontend layer, Java/Spring Boot domain services, SQL Server, OIDC/OAuth, OpenShift, GitHub Actions, deployment workflow integration, and portable observability.

## Prerequisites

- Node.js 24
- npm 11

The expected Node.js version is also captured in `.nvmrc`.

## Installation

Install all workspace dependencies from the repository root:

```bash
npm install
```

## Development Server

To start the Angular development server from the repository root, run:

```bash
npm start
```

Once the server is running, open `http://localhost:4200/`. The application reloads whenever you modify client files.

## Code Scaffolding

Angular CLI scaffolding runs inside the `client` workspace:

```bash
npm --workspace client run ng -- generate component component-name
```

For a complete list of available schematics, run:

```bash
npm --workspace client run ng -- generate --help
```

## Building

To build the UI project, run:

```bash
npm run build
```

This compiles the Angular client and stores build artifacts in `client/dist/`.

## Node.js BFF

The `server/` workspace is currently a placeholder for the future Node.js Backend-for-Frontend. It exists so repository structure, scripts, and documentation already reflect the target UI-tier shape while the Angular client continues to evolve.

## Running Unit Tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, run:

```bash
npm run test:unit
```

## Running End-To-End Tests

For Playwright end-to-end testing, run:

```bash
npm run test:e2e
```

## Formatting and Linting

Run the client lint checks from the repository root:

```bash
npm run lint
npm run lint:client:styles
```

Format the repository with Prettier:

```bash
npm run format
```

## Validation

Run the local quality gate from the repository root:

```bash
npm run check
```

Run the CI-oriented quality gate, including the npm security audit:

```bash
npm run check:ci
```

## Documentation

Documentation and ADRs currently live in this UI repository under `docs/` and in the Angular documentation experience. They describe the intended architecture for the UI, services, and database repositories until documentation ownership moves to the database repository later.

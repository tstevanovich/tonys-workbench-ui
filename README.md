# Tony's Workbench UI

Tony's Workbench is a personal workspace for living documentation, planning, AI workflows, code assistance, side projects, career material, and tool integrations.

This repository contains the UI tier:

- `client/` contains the Angular application and in-app documentation experience.
- `server/` contains the Node.js server that exposes same-origin `/api/...` routes for the Angular client and owns SQL Server-backed data access.

Sibling repositories own the other layers:

- `tonys-workbench-services` owns Java/Spring Boot services only when a durable domain, persistence, eventing, or background-work boundary is needed.
- `tonys-workbench-database` owns SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.

The project is evolving toward an enterprise-aligned full-stack architecture with Angular, a Node.js web/API server, SQL Server-backed data access, optional Java/Spring Boot domain services, OIDC/OAuth, OpenShift, GitHub Actions, deployment workflow integration, and portable observability.

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

To start the local full-stack development server from the repository root, run:

```bash
npm run dev
```

Once the server is running, open `http://localhost:8080/`. The Node.js server listens on port 8080, serves `/api/...` itself, and proxies Angular application requests to the Angular dev server. The application reloads whenever you modify client files.

To run only the Angular development server, use:

```bash
npm run start:client
```

After building, `npm start` runs the compiled Node.js server on `http://localhost:8080/` and serves the built Angular app from `client/dist/`.

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

This cleans generated output, builds the Node.js server into `server/dist/`, and builds the Angular client into `client/dist/`.

The client build writes footer build metadata before bundling. `npm run build:local` marks the app as `local`; `npm run build` marks the app as `prod`. This repository promotes directly from local verification to production release rather than modeling separate dev, SIT, or UAT environments.

## Node.js Server

The `server/` workspace is the Node.js API edge for the Angular application. It exposes browser-facing same-origin `/api/...` routes, validates requests, maps safe errors, shapes frontend responses, mediates server-side auth details, and uses SQL Server repositories/query modules for application data.

Run the server workspace checks directly when working on server code:

```bash
npm --workspace server run check
```

## Running Unit Tests

To execute the client and server test suites, run:

```bash
npm test
```

For only the Angular unit tests, run `npm run test:unit`.

## Running End-To-End Tests

For Playwright end-to-end testing, run:

```bash
npm run test:e2e
```

## Formatting and Linting

Run workspace lint checks from the repository root:

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

# 0001 Modern Angular Stack

## Status

Accepted

## Context

This project is intended to be a reusable model for personal and enterprise Angular applications. The stack must work with npm-installed packages and avoid required system-level installs in managed development environments.

## Decision

Use Angular 21+, standalone components, signals, Angular Material/CDK, SCSS with native CSS capabilities, npm, Vitest with the V8 coverage provider, Playwright, NgRx SignalStore, TanStack Query for Angular, Zod, ECharts, ExcelJS, pdfmake, and docx.

## Consequences

The project stays close to the Angular platform while adding focused libraries for server state, feature state, validation, charting, document generation, testing, and quality checks.

# 0004 Durable Architecture Planning Model

## Status

Accepted

## Context

Tony's Workbench is both a real application and a planning model for future work. The UI repository should help define standards that can guide this project and sibling repositories the owner may work with later. Architecture, documentation, components, BFF code, Java services, database assets, deployment assets, and quality gates should be planned before implementation grows around them.

## Decision

Treat this repository as the source of truth for the project architecture and for reusable development rules.

Maintain durable documentation for:

- Angular application architecture and component patterns in `tonys-workbench-ui/client`.
- Shared UI and reusable component boundaries.
- Node.js BFF package and module structure in `tonys-workbench-ui/server`.
- Java/Spring Boot service package and module structure in `tonys-workbench-services`.
- Database repository ownership, migrations, seed data, local development data, and documentation in `tonys-workbench-database`.
- Deployment layout for Docker Compose, Helm, OpenShift, GitHub Actions, and future enterprise deployment references.
- Quality gates for frontend, backend, database, security, accessibility, and deployment checks.
- ADRs for changes that affect stack, architecture, deployment, auth, database, or governance.

## Consequences

Architecture documentation is not a cleanup task after implementation. It is part of the work. Future agents should update in-app documentation and ADRs when they add or change structural rules so the UI repository stays useful as the current documentation host and as a reusable reference model for the sibling services and database repositories.

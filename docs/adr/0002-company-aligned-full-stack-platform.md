# 0002 Company-Aligned Full-Stack Platform

## Status

Accepted

## Context

This project should help build skills that transfer to corporate work. The known corporate platform direction is Angular, Java/Spring, SQL Server, Ping OIDC/OAuth, EPLX CI/CD, OpenShift Container Platform, runtime configuration services, and AppDynamics.

## Decision

Use the company-aligned platform as the target architecture:

- Angular for the web application.
- Spring Boot for the backend API.
- SQL Server for relational persistence.
- Ping OIDC/OAuth for authentication and authorization.
- OpenShift Container Platform as the enterprise runtime target.
- EPLX as the corporate CI/CD reference model.
- GitHub Actions as the personal repository CI/CD implementation.
- AppDynamics as the enterprise observability target.
- Runtime configuration loaded through a typed external config pattern.

## Consequences

The project will be heavier than a frontend-only or serverless stack, but the learning overlap with work is much higher. Local development should use Docker Compose first, then add OpenShift-style manifests once the backend and database exist.

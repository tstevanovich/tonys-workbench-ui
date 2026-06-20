# 0002 Enterprise-Aligned Full-Stack Platform

## Status

Accepted

## Context

This project should build skills that transfer to enterprise application work. The platform direction is Angular, a Node.js web/API server that owns SQL Server-backed REST APIs, optional Java/Spring Boot domain services, Gradle, SQL Server, OIDC/OAuth, deployment workflow integration, OpenShift Container Platform, Helm charts, runtime configuration services, Elastic-compatible observability, OpenTelemetry-compatible instrumentation, and Java APM agent instrumentation. The Java side should be enterprise-aligned and configurable when a feature needs a separate service boundary.

The repository model is split by ownership: `tonys-workbench-ui` contains the Angular client and Node.js server, `tonys-workbench-services` contains optional Java/Spring Boot services, and `tonys-workbench-database` contains database-owned schema and data assets.

## Decision

Use the enterprise-aligned platform as the architecture baseline:

- Angular for the web application.
- Node.js for the web/API layer that sits between Angular and SQL Server-backed application data.
- Keep Angular code in `client/` and Node.js server code in `server/` inside `tonys-workbench-ui`.
- Keep Java/Spring Boot services in `tonys-workbench-services` only when a feature needs a durable service boundary.
- Keep SQL Server schema, Liquibase migrations, seed/reference data, and database docs in `tonys-workbench-database`.
- Express or another approved Node HTTP framework for server routes.
- `mssql` with the `tedious` driver for SQL Server access from the Node.js server.
- Keep SQL in repositories/query modules instead of Express route handlers.
- Java 25 LTS for optional domain services.
- Spring Boot for optional domain APIs and service APIs behind the Node.js server when Java is justified.
- Cloud-native, 12-factor application design for the Node.js server and optional Java services.
- Clean Architecture and Domain-Driven Design for Java service structure.
- Gradle and the Gradle Wrapper for Java build automation.
- Maven repositories, Artifactory, or private dependency repositories may still appear inside Gradle builds; that does not mean Maven is the project build tool.
- SQL Server for relational persistence.
- Keep SQL Server schema, migrations, and seed/reference data in the database repository.
- Spring Data JPA and Hibernate only for optional Java services that own relational persistence.
- OIDC/OAuth for authentication and authorization.
- Kafka for event streaming when asynchronous events, pub/sub messaging, stream processing, or service decoupling are needed.
- OpenShift Container Platform as the enterprise runtime target.
- Helm charts and environment-specific values for OpenShift deployments.
- Deployment workflow integration for promoted environments.
- GitHub Actions as the personal repository CI/CD implementation.
- Elastic-compatible observability for Java service logs and diagnostics.
- OpenTelemetry-compatible instrumentation for portable traces, metrics, and logs.
- Java APM agent instrumentation where the runtime platform requires application performance monitoring.
- Runtime configuration loaded through a typed external config pattern.
- Spring RestClient, Spring HTTP Interface, WebClient, or Apache HttpClient 5 only for Java-owned outbound calls that remain inside optional Java services.
- Caffeine for bounded short-lived user details caching when repeated identity lookups need local caching.
- Managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.
- JUnit Jupiter, Mockito core, and Mockito JUnit Jupiter for Java service tests.
- Karate for API, smoke, and BDD-style Java service tests, with Cucumber-compatible JSON only as a report format.
- SLF4J with Logback and structured logging for backend logging.
- Feature-specific libraries such as file generation, S3 clients, mail support, schedulers, and specialized caches should be added only when a feature needs them.

## Consequences

The project will be heavier than a frontend-only or serverless stack, but the learning overlap with enterprise systems is much higher. Local development should use Docker Compose first, then add OpenShift-style Helm/deployment manifests once the backend and database exist. This project now uses separate UI, services, and database repositories; a separate deployment repository remains a future option if deployment ownership becomes large, access-controlled, or maintained on a different lifecycle.

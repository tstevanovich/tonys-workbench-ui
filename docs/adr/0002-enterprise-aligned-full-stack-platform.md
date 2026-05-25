# 0002 Enterprise-Aligned Full-Stack Platform

## Status

Accepted

## Context

This project should build skills that transfer to enterprise application work. The platform direction is Angular, Java/Spring Boot, Gradle, SQL Server, OIDC/OAuth, deployment workflow integration, OpenShift Container Platform, Helm charts, runtime configuration services, Elastic-compatible observability, OpenTelemetry-compatible instrumentation, and Java APM agent instrumentation. The Java side should be enterprise-aligned and configurable rather than a perfect clone of any one service.

## Decision

Use the enterprise-aligned platform as the architecture baseline:

- Angular for the web application.
- Java 25 LTS for backend services.
- Spring Boot for the backend API.
- Cloud-native, 12-factor application design for backend services.
- Clean Architecture and Domain-Driven Design for Java service structure.
- Gradle and the Gradle Wrapper for Java build automation.
- Maven repositories, Artifactory, or private dependency repositories may still appear inside Gradle builds; that does not mean Maven is the project build tool.
- SQL Server for relational persistence.
- Spring Data JPA and Hibernate for persistence mapping when relational domain modeling is needed.
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
- Spring RestClient for normal synchronous outbound HTTP calls, Spring HTTP Interface for typed clients, WebClient for reactive calls, and Apache HttpClient 5 only when a low-level Apache transport is needed.
- Caffeine for bounded short-lived user details caching when repeated identity lookups need local caching.
- Managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.
- JUnit Jupiter, Mockito core, and Mockito JUnit Jupiter for backend tests.
- Karate for API, smoke, and BDD-style backend tests, with Cucumber-compatible JSON only as a report format.
- SLF4J with Logback and structured logging for backend logging.
- Feature-specific libraries such as file generation, S3 clients, mail support, schedulers, and specialized caches should be added only when a feature needs them.

## Consequences

The project will be heavier than a frontend-only or serverless stack, but the learning overlap with enterprise systems is much higher. Local development should use Docker Compose first, then add OpenShift-style Helm/deployment manifests once the backend and database exist. This project can keep CD assets in the same repo while it is a personal learning project, but the app-repo plus app-cd-repo split remains documented as an enterprise delivery pattern.

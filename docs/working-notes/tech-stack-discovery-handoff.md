# Tech Stack Discovery Handoff

This note preserves the current working context for continuing tech stack documentation in a new chat.

## Collaboration Rule

Do not make new tech stack decisions without discussing them with Tony first.

Use these states:

| State     | Meaning                                                                                                  |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Confirmed | Tony explicitly chose it, repo evidence proves it, or enterprise reference guidance clearly supports it. |
| Candidate | Worth discussing, but not selected yet.                                                                  |
| Unknown   | Needs more evidence from docs, repos, or Tony.                                                           |

Do not quietly turn candidates into confirmed choices.

## Current Documentation Target

The main page being refined is:

`src/app/features/documentation/content/standards/modern-tech-stack.ts`

This page should read as a stack inventory:

| Column      | Purpose                                            |
| ----------- | -------------------------------------------------- |
| Role        | What problem the technology solves.                |
| Choice      | The selected software, library, tool, or platform. |
| Description | Short practical explanation.                       |

Avoid turning this page into folder structure guidance, coding standards, or architecture rules. Those belong in other docs.

## Latest Continuation Notes

- Removed unconfirmed candidates from the Modern Tech Stack inventory so they remain discussion topics instead of selected standards.
- Candidates kept out of the stack inventory for now: MSW, Sentry, Testcontainers SQL Server, Spotless, Checkstyle, SpotBugs, OWASP Dependency-Check, MapStruct, angular-auth-oidc-client, and ACL authorization.
- Kept confirmed installed frontend/documentation/tooling libraries in the inventory when they are already present in `package.json`.
- Kept confirmed backend and database direction from Tony's choices and captured evidence: Java 25 LTS, Spring Boot latest stable public release, Spring Security, Gradle/Wrapper, OpenAPI/springdoc-openapi, Spring Data JPA, Hibernate, Hibernate Validator, Jackson, HikariCP, Tomcat, SLF4J, Logback, Actuator, Micrometer, OpenTelemetry, JUnit Jupiter, Mockito, Karate, SQL Server, Microsoft JDBC Driver, Liquibase, and SQL Server container runtime.
- New `build.gradle` screenshot evidence from a team microservice shows framework Gradle convention plugins, an OpenAPI plugin, Lombok, structured Logback support, OAuth2 resource-server support, Spring authorization support, framework web support, Elastic support, SQL Server support, config-service client support, Spring Boot Test, Mockito, JUnit Jupiter, JaCoCo, Sonar, PIT/Pitest, Maven publication of `bootJar`, and Artifactory publishing.
- Updated Modern Tech Stack with public equivalents for the confirmed baseline: Gradle convention plugins, OpenAPI Generator Gradle plugin, structured Logback logging, Lombok, OAuth client credentials, enterprise API gateway, bearer token usage, scope/role/claim authorization, Spring Boot Test, JaCoCo, PIT, Sonar-compatible quality analysis, Maven publication, and Artifactory-compatible artifact repository.
- Keep app-specific dependencies out of the reusable stack inventory unless a pattern repeats across services: Apache POI, Apache Commons Lang, Commons Collections, Commons BeanUtils, app data-model jars, app commons jars, and feature-specific Elasticsearch use.
- Apache HttpClient 4.5 appeared in the service build, but the modernized standard is Spring RestClient for normal synchronous calls, Spring HTTP Interface for typed clients, WebClient for reactive calls, and Apache HttpClient 5 only when a low-level Apache transport is needed.
- New `application.yaml` screenshot evidence shows externalized SQL Server datasource values, HikariCP settings, `ddl-auto: none`, SQL Server Hibernate dialect, Actuator `info`/`health` endpoints with liveness and readiness groups, app and component identifiers, OAuth client credential token configuration, Spring Security OAuth2 resource-server configuration with issuer URI and JWK set URI, Spring WebClient configuration, Resilience4j retry configuration, and optional Elastic APM settings.
- Updated Modern Tech Stack with public equivalents from the application configuration: Spring WebClient for outbound service calls, Resilience4j Retry for transient failure handling, Liquibase-managed schema ownership over Hibernate DDL generation, OIDC issuer/JWK token validation metadata, and externalized OAuth client credentials.
- Java 25 LTS is confirmed for modern standards. Existing services can still require Java 17 or Java 21 until their Gradle wrapper and build plugins support Java 25.
- Kafka is confirmed as the modern event-streaming standard when a service needs asynchronous events, pub/sub messaging, stream processing, or service decoupling. It is not required for every service.
- Karate remains the API/BDD testing standard. `outputCucumberJson(true)` means Karate emits Cucumber-compatible JSON for reporting; it does not make Cucumber the default test framework.
- Mockito should use modern `mockito-core` and `mockito-junit-jupiter`; do not use legacy `mockito-all`.
- Caffeine is confirmed for bounded short-lived user details caching where repeated identity lookups need local caching.
- Managed keystore and truststore resolution is confirmed for outbound mTLS, Kafka TLS, and certificate-secured integrations. Keep proprietary resolver/library names out of public docs.
- Java services should be documented as cloud-native, 12-factor applications using Clean Architecture and Domain-Driven Design.
- New architecture direction from work discovery: Angular should call a Node.js Backend-for-Frontend through same-origin `/api/...` routes, and the BFF should call Java services. Java remains the domain/service layer rather than being replaced by Node.
- Do not adopt `spring.main.allow-circular-references: true` as a reusable standard. Treat it as compatibility debt in that service unless a modern framework guide says otherwise.
- Multiple named datasources, named service URLs, and app-specific synchronization settings are evidence of supported patterns, but they are not universal stack choices.

## Global Writing Direction

- Write as a chosen standard, not as a temporary repo snapshot.
- Avoid wording that exposes organization-specific framing in public-facing docs.
- Avoid proprietary product names in public-facing repo docs unless Tony explicitly approves them.
- If reference docs use a framework or library that cannot be used in personal projects, identify the closest public/open equivalent before adding it to the stack.
- Use latest stable public versions as the policy unless Tony chooses a fixed version.

## Confirmed Frontend Choices

| Role                     | Choice                                     |
| ------------------------ | ------------------------------------------ |
| Core frontend framework  | Angular 21+                                |
| Frontend language        | TypeScript                                 |
| Browser app model        | Angular SPA                                |
| Component model          | Standalone components                      |
| Routing                  | Angular Router                             |
| Production forms         | Angular Reactive Forms                     |
| Forms migration path     | Angular Signal Forms once production-ready |
| Local reactivity         | Angular Signals                            |
| Observable interop       | RxJS                                       |
| UI component library     | Angular Material                           |
| Low-level UI toolkit     | Angular CDK                                |
| Styling language         | SCSS                                       |
| Runtime design tokens    | CSS custom properties                      |
| Layout primitives        | CSS Grid and Flexbox                       |
| Component responsiveness | Container queries                          |
| Viewport responsiveness  | Media queries                              |
| Icons                    | Material Symbols through MatIcon fontIcon  |

## Confirmed Frontend Data/API Standard

Read operations:

```text
Component
-> SignalStore (UI state only)
-> TanStack Query (server state)
-> OpenAPI generated BFF client
-> HttpClient
-> Node.js BFF /api endpoint
-> Java service API

Response
-> Zod validation
-> Mapper
-> UI/domain model
-> TanStack Query cache
-> Component/UI
```

Write operations:

```text
Component
-> SignalStore (UI state only)
-> TanStack Mutation
-> OpenAPI generated BFF client
-> HttpClient
-> Node.js BFF /api endpoint
-> Java service API

Response
-> Zod validation
-> Mapper
-> Query invalidation/refetch
-> Updated cache/UI
```

Ownership:

| Concern                     | Owner                        |
| --------------------------- | ---------------------------- |
| External async/server data  | TanStack Query and Mutations |
| UI/client state             | SignalStore                  |
| External data safety        | Zod                          |
| Browser transport/contracts | OpenAPI-generated BFF client |
| Web edge                    | Node.js Backend-for-Frontend |
| Domain services             | Java Spring Boot APIs        |
| Rendering                   | Angular components           |

SignalStore owns UI state such as selected row, filters, pagination, dialog state, wizard state, layout state, and UI selections.

SignalStore does not own server cache, HTTP loading state, retry logic, or API persistence.

## Confirmed BFF Direction

| Role               | Choice                                                                    |
| ------------------ | ------------------------------------------------------------------------- |
| Runtime            | Node.js 24 LTS                                                            |
| Language           | TypeScript                                                                |
| HTTP framework     | Express latest stable public release                                      |
| Browser API routes | Same-origin `/api/...` endpoints                                          |
| Runtime validation | Zod                                                                       |
| Outbound HTTP      | Node.js fetch by default                                                  |
| Boundary ownership | Token mediation, response shaping, request validation, safe error mapping |

Do not install Express or BFF dependencies in this repo until a `bff/` module is actually implemented.

## Confirmed Java Services Direction

| Role                          | Choice                                       |
| ----------------------------- | -------------------------------------------- |
| Java service language         | Java 25 LTS                                  |
| Java service framework        | Spring Boot latest stable public release     |
| Java service security         | Spring Security latest stable public release |
| Build tool                    | Gradle                                       |
| Build runner                  | Gradle Wrapper                               |
| Java dependency source        | Maven Central                                |
| Gradle plugin source          | Gradle Plugin Portal                         |
| API contract                  | OpenAPI                                      |
| API documentation             | springdoc-openapi                            |
| Persistence abstraction       | Spring Data JPA                              |
| ORM                           | Hibernate                                    |
| Bean validation               | Hibernate Validator                          |
| JSON serialization            | Jackson                                      |
| Connection pool               | HikariCP                                     |
| Embedded servlet container    | Apache Tomcat                                |
| Logging facade                | SLF4J                                        |
| Logging implementation        | Logback                                      |
| Health/metrics                | Spring Boot Actuator                         |
| Observability instrumentation | Micrometer and OpenTelemetry                 |
| Synchronous HTTP client       | Spring RestClient                            |
| Typed HTTP clients            | Spring HTTP Interface                        |
| Reactive HTTP client          | Spring WebClient                             |
| Event streaming               | Apache Kafka and Spring for Apache Kafka     |
| Resilience                    | Resilience4j Retry                           |
| Unit testing                  | JUnit Jupiter                                |
| Mocking                       | Mockito core and Mockito JUnit Jupiter       |
| API/BDD testing               | Karate                                       |
| BDD report format             | Cucumber-compatible JSON                     |
| Mutation testing              | PIT/Pitest                                   |

Tony prefers Karate over adding both Karate and Cucumber because Karate appeared in repo evidence.

## Confirmed Database Direction

| Role                             | Choice                                                            |
| -------------------------------- | ----------------------------------------------------------------- |
| Primary relational database      | SQL Server                                                        |
| Schema migration/version control | Liquibase                                                         |
| Java database driver             | Microsoft JDBC Driver for SQL Server                              |
| Local database runtime           | SQL Server container                                              |
| Schema ownership                 | Liquibase-managed schema with Hibernate DDL generation disabled   |
| Database tests                   | Testcontainers SQL Server is a candidate; confirm before locking. |

Tony confirmed the reference environment uses Liquibase with SQL Server.

## Corporate Documentation Evidence Captured So Far

The user is reviewing DevX/framework pages by taking photos. Do not ask for proprietary source code. Use sanitized summaries and photos only.

Captured pages:

| Page                         | Useful signals                                                                                                                                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frameworks overview          | Internal platform provides prescriptive Java, JavaScript, C#/.NET, and Python frameworks. Useful as context only.                                                                                                                 |
| Capabilities page            | Shows capability categories: API docs, auth, BDD, config service, distributed locks, tracing, build/release integration, feature flags, health checks, logging, mutation testing, resiliency, TDD.                                |
| NFR Integration              | Shows required NFR categories: accessibility, alerting, auditability, availability, error handling, monitoring, performance, recoverability.                                                                                      |
| Java microservices framework | Strong evidence that the Java backend shape is a Spring Boot REST microservice with OpenAPI, Clean Architecture, Gradle, Actuator, Resilience4j, JUnit, Mockito, Karate, Cucumber-compatible report output, PIT, Tomcat/Undertow. |

Proprietary names were visible in the screenshots for auth, logging, error handling, config, and framework-provided modules. Treat them as evidence of capability categories. Do not add those names to the public tech stack.

## Public Equivalents To Prefer

| Platform capability category  | Public/open equivalent direction                                                |
| ----------------------------- | ------------------------------------------------------------------------------- |
| Auth framework                | Spring Security OAuth2 Resource Server, OIDC/OAuth compatible identity provider |
| Logging wrapper               | SLF4J + Logback + structured logging                                            |
| Config service                | Typed external config, Spring config patterns, environment configuration        |
| Error standard                | Spring exception handling, RFC 7807/problem details, traceable error IDs        |
| Tracing/monitoring configs    | Micrometer + OpenTelemetry-compatible observability backend                     |
| Internal framework BOM/plugin | Gradle Wrapper + Maven Central + managed dependency versions                    |

## Open Questions To Continue Discussing

| Topic                        | Question                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Java version policy          | Tony chose latest Java LTS for modern standards. Use Java 25 LTS, while allowing older service repos to run on the LTS their Gradle wrapper and plugins support.          |
| Spring versions              | Use latest stable public releases by policy. Do not pin to private release-note dates.                                                                                    |
| Spring Boot 4 adoption       | Check public stability when backend work begins; use latest stable public release at that time.                                                                           |
| API mocking                  | Discuss options before choosing. Candidates include MSW for frontend and Karate/WireMock/MockMvc/Testcontainers depending on backend use case.                            |
| Frontend error monitoring    | Sentry was mentioned as an option but not confirmed. Need discussion.                                                                                                     |
| Frontend observability       | Java service observability uses Elastic-compatible tooling plus portable OpenTelemetry and Java APM agent instrumentation. Frontend monitoring is still undecided.        |
| Deployment packaging         | Tony wants one default personal packaging standard. Need discussion before finalizing.                                                                                    |
| Backend lint/static analysis | Candidate tools include Spotless, Checkstyle, SpotBugs, and OWASP Dependency-Check. Need evidence/discussion before locking.                                              |
| Database repo conventions    | Need more info from database repo: changelog format, folder structure, rollback conventions, seed/reference data, stored procedures/views/functions, environment scripts. |

## Pages Worth Capturing Next

High priority:

- Java microservices getting started/project structure.
- Java microservices dependency/BOM/plugin page.
- Java testing page.
- Java logging page.
- Java config/secrets page.
- Java resiliency page.
- Java error handling page.
- JavaScript framework page.
- CD/deployment repo page.
- Database repo docs or folder screenshots.
- NFR detail pages for observability, monitoring, alerting, auditability, availability, performance, and accessibility.
- Parameter tampering page.
- Onion/Clean Architecture page.

## Java Library Inspection Checklist

When reviewing framework or starter library documentation, capture the capability and public equivalent, not proprietary names.

For each library, look for:

| What To Find        | Useful Signals                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose             | What problem it solves: auth, authorization, logging, error handling, config, SQL Server, Kafka, TLS, caching, testing, observability, deployment.  |
| Public dependencies | Look for Maven coordinates or transitive dependencies such as Spring Security, Logback, Jackson, Hibernate, Liquibase, Kafka, Resilience4j.         |
| Spring beans        | Bean names, auto-configuration classes, `@ConfigurationProperties`, filters, interceptors, clients, factories, and conditionals.                    |
| Runtime config      | Properties in `application.yaml`, Helm values, config maps, secrets, env vars, feature toggles, URLs, TTLs, retry counts, and timeouts.             |
| Integration points  | Servlet filters, WebClient/RestClient customizers, Kafka factories, datasource builders, SSL context providers, health indicators, metrics binders. |
| Opt-in behavior     | Whether the feature activates by dependency alone, by annotation, by property, by profile, by bean, or by deployment configuration.                 |
| Version policy      | Keep the same public software family but modernize to latest stable public versions for Tony's Workbench.                                           |

Questions worth answering:

- Does it wrap a standard Spring feature or introduce a custom programming model?
- Does application code import the library directly, or is it mostly auto-configuration?
- Is it required for every service, or only for services using a capability such as Kafka, mTLS, or Elastic?
- Does it add a local coding pattern we should document, or only deployment/runtime behavior?
- Does it rely on a Java agent, environment variable, mounted file, Kubernetes secret, or external config service?

## Current Validation Commands

Use Windows npm command shims:

```powershell
npm.cmd run check
npm.cmd run build
```

`npm run check` currently includes lint, stylelint, Prettier check, unit tests, dependency-cruiser, and knip.

## Repo Notes

- Current repo path: `C:\projects\tonys-workbench`
- The old folder name `ai-agent` may appear only in older memory/context and should not be reintroduced.
- The docs route is lazy-loaded and currently has a dedicated `Documentation Home` page.
- The Modern Tech Stack page is intentionally large and table-driven.

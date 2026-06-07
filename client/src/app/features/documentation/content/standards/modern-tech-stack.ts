import { type DocumentationArticle } from '../../documentation.model';

export const ModernTechStackArticle: DocumentationArticle = {
  id: 'modern-tech-stack',
  title: 'Modern Tech Stack',
  summary:
    "The software, library, platform, and tooling choices for Tony's Workbench applications.",
  sections: [
    {
      heading: 'Purpose',
      body: "This page is the stack inventory for the Tony's Workbench repository family. It lists the chosen technologies, the role each technology plays, and a short reason for the choice. Architecture rules, folder placement, error handling patterns, and workflow standards live in the other documentation pages."
    },
    {
      heading: 'Repository Ownership',
      markdown: `
| Role | Repository | Description |
| --- | --- | --- |
| UI and web edge | tonys-workbench-ui | Contains \`client/\` for Angular and \`server/\` for the Node.js BFF. |
| Java microservices | tonys-workbench-services | Contains Spring Boot services called by the BFF. |
| Database ownership | tonys-workbench-database | Contains SQL Server schema, Liquibase migrations, seed/reference data, and database documentation. |
| Current documentation host | tonys-workbench-ui | In-app docs stay in the UI app until database-backed markdown storage is implemented. |
`
    },
    {
      heading: 'Core Front End Stack',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Core frontend framework | Angular 21+ | Primary framework for browser applications, routing, components, dependency injection, forms, and UI composition. |
| Frontend language | TypeScript | Typed application language used by Angular, build tooling, tests, generated API clients, and documentation article modules. |
| Browser application model | Angular SPA | Standard browser application model for authenticated workspace tools and private applications. |
| Component model | Angular standalone components | Modern Angular component model used instead of NgModule-centered structure. |
| Routing | Angular Router | Owns application routes, lazy route loading, nested routes, route data, redirects, and component input binding. |
| Production forms | Angular Reactive Forms | Standard for production forms because typed reactive forms are explicit, testable, and scalable for complex screens. |
| Signal-native forms | Angular Signal Forms | Selected migration path once Angular marks the API production-ready. |
| Local reactivity | Angular Signals | Default primitive for local component state and derived UI values. |
| Observable interop | RxJS | Used where Angular APIs expose observable streams, such as router events and HTTP integration points. |
| Browser platform package | Angular platform-browser | Angular browser bootstrap and DOM integration layer. |
| Common Angular utilities | Angular common | Shared Angular browser utilities, directives, pipes, and platform services. |
`
    },
    {
      heading: 'UI, Styling, And Icons',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| UI component library | Angular Material | Primary enterprise-friendly UI component system for accessible Angular controls. |
| Low-level UI toolkit | Angular CDK | Lower-level Angular utilities for accessibility, overlays, layout helpers, and custom UI behavior. |
| Design system baseline | Material 3 | Theme, color role, typography, density, and component token model used by Angular Material. |
| Styling language | SCSS | Main stylesheet language for component styles and global style organization. |
| Runtime design tokens | CSS custom properties | Used for theme-aware values, shell constants, component customization, and runtime-friendly styling. |
| Page layout primitive | CSS Grid | Default technology for shells, page layouts, dashboards, and two-dimensional layouts. |
| Component alignment primitive | Flexbox | Default technology for toolbars, action rows, inline controls, and one-dimensional alignment. |
| Component responsiveness | Container queries | Preferred for components that react to their own available space. |
| Viewport responsiveness | Media queries | Used for screen-level behavior such as compact shell and navigation layouts. |
| Icon package | Material Symbols | Self-hosted icon font package installed through npm. |
| Icon rendering | Angular Material MatIcon font icons | Material Symbols are used through normal mat-icon fontIcon ligatures. |
`
    },
    {
      heading: 'API And Data Flow Standard',
      markdown: `
| Layer | Responsibility | Technology |
| --- | --- | --- |
| UI rendering | Display data | Angular components |
| UI and screen state | Filters, tabs, dialogs, pagination, selections | Angular Signals and NgRx SignalStore |
| Server state | Loading, cache, retries, stale data | TanStack Query |
| Data mutations | Save, update, delete, upload, command actions | TanStack Mutations |
| Browser API transport | Same-origin HTTP communication | OpenAPI generated BFF client plus Angular HttpClient |
| Web edge | Browser-facing API routes | Node.js Backend-for-Frontend |
| Domain services | Business APIs and persistence workflows | Java 25 LTS and Spring Boot |
| Runtime validation | Validate external data | Zod |
| Data transformation | DTO to UI model | Mapper functions |
| Shared business logic | Reusable workflows | Angular services |
`
    },
    {
      heading: 'Front End Data Libraries',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Feature state library | NgRx SignalStore | Screen and workflow state that belongs to the browser client. |
| Server state library | TanStack Query for Angular | API fetching, caching, invalidation, retry behavior, loading states, and server mutations. |
| Runtime validation library | Zod | Validation for API responses, imported files, AI output, local storage, user-provided JSON, and external runtime boundaries. |
| HTTP client | Angular HttpClient | Browser-to-BFF HTTP transport used by generated clients and app-level API infrastructure. |
| API contract generator | OpenAPI Generator | Generates Angular API clients and transport types from BFF OpenAPI contracts. |
`
    },
    {
      heading: 'Backend For Frontend Stack',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| BFF runtime | Node.js 24 LTS | Current production LTS line for the web-edge server runtime. |
| BFF language | TypeScript | Typed server-side JavaScript for BFF routes, middleware, validation, and service clients. |
| BFF framework | Express latest stable public release | Minimal Node HTTP framework for browser-facing /api routes when the server module is implemented. |
| BFF route contracts | OpenAPI | Browser-facing API contracts that can differ from downstream Java service contracts. |
| BFF validation | Zod | Runtime validation for browser requests, downstream responses, config, and boundary data. |
| BFF HTTP client | Node.js fetch | Built-in HTTP client for outbound service calls unless a feature needs a specialized transport. |
| BFF security baseline | Express production hardening | Security headers, request limits, safe error responses, trusted proxy configuration, and dependency scanning. |
| BFF observability | Structured logs and OpenTelemetry-compatible instrumentation | Correlation IDs, request logs, dependency timing, error mapping, and portable traces. |
`
    },
    {
      heading: 'Markdown, Documentation, And Code Blocks',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Markdown rendering library | ngx-markdown | Angular integration layer for rendering markdown inside documentation, prompts, and chat-style content. |
| Markdown parser ecosystem | marked | Markdown parsing dependency used by the markdown rendering stack. |
| Syntax highlighting library | PrismJS | Used for fenced code block highlighting. |
| Prism language registry | Local languages.ts file | Central place to import supported Prism languages as more code fence languages are needed. |
| Markdown UI wrapper | Shared MarkdownRenderer component | Reusable Angular component that renders markdown and adds copy controls to code blocks. |
| Documentation content format | Markdown | Preferred format for long docs, prompts, generated examples, and editable documentation content. |
| In-app docs storage | Lazy TypeScript article modules | Documentation pages load as route-level article chunks. |
| Persistent docs storage | SQL Server-backed markdown | Future storage model in tonys-workbench-database for editable, permissioned, reviewed, versioned, and user-authored documentation. |
`
    },
    {
      heading: 'Charts And Generated Documents',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Charting library | ECharts | Primary charting engine for simple charts, dashboards, and advanced data visualization. |
| Angular chart wrapper | ngx-echarts | Angular integration wrapper for ECharts lifecycle and component use. |
| Excel generation | ExcelJS | Workbook creation, worksheets, styling, formulas, and spreadsheet exports. |
| PDF generation | pdfmake | Data-driven PDF generation where layout control matters. |
| Word document generation | docx | Word document generation, reports, and document workflow outputs. |
`
    },
    {
      heading: 'Java Services Stack',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Java service language | Java 25 LTS | Standard Java language/runtime baseline for domain services. |
| Java service framework | Spring Boot latest stable public release | API framework for domain endpoints, validation, auth enforcement, transactions, integrations, jobs, and observability hooks behind the BFF. |
| Java service security | Spring Security latest stable public release | Token validation, authorization enforcement, resource protection, and method security. |
| Java build tool | Gradle | Standard Java build automation tool for Java services. |
| Gradle distribution | Gradle Wrapper | Repository-pinned Gradle execution for local machines and CI. |
| Java dependency source | Maven Central | Standard public repository for Java dependencies. |
| Gradle plugin source | Gradle Plugin Portal | Standard public repository for Gradle plugins. |
| Java build conventions | Gradle convention plugins | Shared Gradle plugins encapsulate Java, Spring Boot, coverage, quality, API generation, and mutation-testing defaults. |
| API documentation | springdoc-openapi | Generates OpenAPI documentation from Spring Boot APIs. |
| API contract publishing | OpenAPI | Contract used by generated BFF/service clients and backend API documentation. |
| API model generation | OpenAPI Generator Gradle plugin | Generates Java service API models and definitions from OpenAPI specifications. |
| Persistence abstraction | Spring Data JPA | Repository and data access abstraction for relational persistence. |
| ORM | Hibernate | JPA implementation for relational entity mapping. |
| Bean validation | Hibernate Validator | Bean Validation implementation for request, DTO, and domain validation. |
| JSON serialization | Jackson | Standard JSON serialization and deserialization stack for Spring Boot APIs. |
| Database connection pool | HikariCP | Standard high-performance JDBC connection pool used by Spring Boot. |
| Embedded servlet container | Apache Tomcat | Standard embedded web container for Spring Boot services. |
| Backend logging facade | SLF4J | Logging facade used by Java service code. |
| Backend logging implementation | Logback | Logging backend paired with SLF4J. |
| Structured backend logging | Logback structured logging | Standardized application, security, correlation, and operational logging through Logback-compatible configuration. |
| Sensitive log masking | logback-spring.xml masking rules | Central Logback configuration masks sensitive fields before logs leave the service. |
| Backend metrics and health | Spring Boot Actuator | Health checks, metrics endpoints, readiness, liveness, and operational metadata. |
| Backend observability | Micrometer | Metrics instrumentation layer used by Spring Boot and observability integrations. |
| Telemetry standard | OpenTelemetry | Vendor-neutral telemetry format for traces, metrics, and logs. |
| Java service observability backend | Elastic-compatible observability | Backend services can send logs, metrics, and operational diagnostics to an Elastic-compatible observability stack. |
| Java APM agent instrumentation | Java monitoring agent | Runtime instrumentation can be attached through a Java agent without hard-coding the application to one vendor API. |
| Synchronous outbound HTTP client | Spring RestClient | Modern Spring client for blocking REST calls in Spring MVC services. |
| Typed outbound HTTP clients | Spring HTTP Interface | Declarative Java interfaces for typed service clients backed by RestClient or WebClient. |
| Reactive outbound HTTP client | Spring WebClient | Backend client for reactive or non-blocking service-to-service HTTP calls, exchange filters, request/response handling, and OAuth-backed outbound calls. |
| Advanced HTTP transport | Apache HttpClient 5 | Low-level HTTP transport option when Apache-specific connection, TLS, or proxy behavior is needed. |
| Service resilience | Resilience4j Retry | Retry policy library for bounded retries around transient IO, database, transaction, and service-call failures. |
| Event streaming | Apache Kafka | Standard event-streaming platform for asynchronous events, pub/sub messaging, stream processing, and service decoupling. |
| Spring Kafka integration | Spring for Apache Kafka | Spring Boot integration for Kafka producers, consumers, listener containers, and externalized Kafka configuration. |
| User details cache | Caffeine | Bounded local cache for short-lived user details, authorities, and identity lookup data. |
| Outbound mTLS keystore management | Managed keystore and truststore resolution | Outbound HTTPS, Kafka, and certificate-secured integrations use managed keystore and truststore material exposed through standard Java SSL primitives. |
| Java boilerplate reduction | Lombok | Reduces Java boilerplate where records, constructors, and explicit code do not provide a cleaner model. |
| Backend unit testing | JUnit Jupiter | Standard Java unit test framework. |
| Backend mocking | Mockito core and Mockito JUnit Jupiter | Modern Mockito setup for Java unit tests and JUnit 5 extension integration. |
| API and BDD testing | Karate | HTTP API, BDD-style, smoke, and integration testing for Java services. |
| BDD report format | Cucumber-compatible JSON | Karate emits Cucumber-compatible JSON when CI, reporting, or test-management tooling needs that format. |
`
    },
    {
      heading: 'Database And Persistence Stack',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Primary relational database | SQL Server | Standard relational database for application persistence. |
| SQL Server JDBC driver | Microsoft JDBC Driver for SQL Server | Java database driver for SQL Server connectivity. |
| Schema migration tool | Liquibase | Database version control for schema changes, repeatable changes, and migration history. |
| Migration format | Liquibase changelog files | Versioned database changes stored in the database repository. |
| Local database runtime | SQL Server container | Local database runtime for Docker Compose and backend development. |
| Backend persistence API | JPA | Java persistence API used through Spring Data JPA and Hibernate. |
| Transaction management | Spring transactions | Service-layer transaction boundaries and rollback behavior. |
| Connection pooling | HikariCP | JDBC connection pooling for Java services. |
| Schema ownership | Liquibase-managed schema | Hibernate schema generation stays disabled so database changes are controlled through versioned migrations. |
| Query performance analysis | SQL Server execution plans | Standard tool for understanding query performance and indexing needs. |
`
    },
    {
      heading: 'Authentication, Security, And Runtime Configuration',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Identity provider standard | OIDC/OAuth 2.0 compatible provider | Authentication provider must support standard OIDC/OAuth flows without tying the stack to a proprietary provider. |
| Auth protocol | OIDC/OAuth 2.0 | Token, scope, login, and protected API access protocol family. |
| Service-to-service auth flow | OAuth 2.0 client credentials | Backend and app-to-app calls use client credentials to obtain access tokens for protected service calls. |
| API ingress security | Enterprise API gateway | Service API calls route through a gateway for token validation, threat checks, quotas, logging, header handling, and forwarding. |
| API bearer token usage | OAuth bearer access tokens | Service calls send access tokens in the Authorization header and rely on gateway and service-side validation. |
| Backend auth enforcement | Spring Security OAuth2 Resource Server | Token validation and API authorization enforcement. |
| Token validation metadata | OIDC issuer URI and JWK set URI | Backend services validate JWTs using configured issuer and signing-key metadata from the identity provider. |
| OAuth client configuration | Externalized client credentials | OAuth client IDs, secrets, and token endpoint URLs are supplied through environment-specific configuration. |
| Backend authorization model | Scope, role, and claim-based authorization | API access decisions should start with token-derived authorities before using more complex resource-level permission models. |
| Runtime configuration style | Typed external config | Environment-specific values loaded through typed runtime configuration. |
| Configuration service pattern | Externalized configuration service | Backend services can load environment-specific settings from a managed configuration source instead of hard-coding operational values. |
| Secret storage | Platform and CI/CD secret stores | Secrets stay outside Angular bundles, committed files, and browser-visible config. |
| JavaScript dependency security | npm audit | Security checks for the npm dependency tree. |
| Browser security baseline | Angular sanitization and CSP-ready code | Angular template safety plus code that can operate under a strict Content Security Policy. |
`
    },
    {
      heading: 'Deployment And Platform',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Split layer repositories | UI repo plus services repo plus database repo | UI/BFF, Java service, and database ownership live in separate repositories. |
| Optional deployment repository | Separate deployment repo | Work environments with independent deployment ownership may use a separate deployment repository. |
| Local full-stack runtime | Docker Compose | Local orchestration for Angular, Node.js BFF, Spring Boot services, SQL Server, and supporting services. |
| Frontend package artifact | Static Angular build | Browser assets emitted by ng build from client/. |
| BFF package artifact | Node.js server package | Node runtime package or container image for browser-facing API routes. |
| Backend package artifact | Spring Boot executable jar | Java service artifact built by Gradle from tonys-workbench-services. |
| Container image build | Docker | Container packaging for BFF, Java services, and deployable app images. |
| Container runtime platform | OpenShift Container Platform | Kubernetes-based runtime platform for hosted application workloads. |
| Kubernetes packaging | Helm | Chart and values packaging for Kubernetes and OpenShift deployments. |
| Personal CI/CD | GitHub Actions | Automation for validation, build, and repository workflows. |
| Deployment orchestration | Deployment workflow integration | Promotion workflow for hosted environments after repository checks and builds complete. |
| Portable service telemetry | OpenTelemetry-compatible tooling | Runtime telemetry and diagnostics should emit portable traces, metrics, and logs. |
`
    },
    {
      heading: 'Testing And Quality Tooling',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| Angular unit test command | ng test | Standard command for Angular unit tests. |
| Frontend unit test runner | Vitest | Test runner package used by the Angular unit-test setup. |
| Frontend DOM test environment | jsdom | Browser-like test environment for component tests without launching a real browser. |
| End-to-end test framework | Playwright | Browser automation framework for routed workflows and real app behavior. |
| Accessibility test engine | axe-core | Accessibility engine used directly and through Playwright integration. |
| Playwright accessibility package | @axe-core/playwright | Playwright integration for automated accessibility checks. |
| TypeScript linting | ESLint | Code-quality linting for TypeScript and Angular code. |
| Angular lint integration | angular-eslint | Angular-specific ESLint builder, parser, and template lint support. |
| TypeScript ESLint tooling | typescript-eslint | TypeScript-aware ESLint rules and parsing. |
| Import sorting | eslint-plugin-simple-import-sort | Automated import ordering. |
| Prettier compatibility | eslint-config-prettier | Prevents formatting rules from fighting Prettier. |
| SCSS linting | Stylelint | Stylesheet linting for SCSS quality and consistency. |
| SCSS lint baseline | stylelint-config-standard-scss | Standard SCSS rule set. |
| SCSS property order | stylelint-order and stylelint-config-recess-order | Property ordering conventions for stylesheets. |
| Frontend formatter | Prettier | Formatting tool for TypeScript, HTML, SCSS, JSON, Markdown, and related files. |
| Frontend architecture checks | dependency-cruiser | Dependency graph and architecture boundary validation. |
| Frontend dead-code checks | knip | Finds unused files, exports, and dependencies. |
| Java test support | Spring Boot Test | Spring testing support for application context, slices, and integration-style backend tests. |
| Java unit tests | JUnit Jupiter | Backend unit test framework. |
| Java mocks | Mockito core and Mockito JUnit Jupiter | Backend mocking library and JUnit 5 extension integration. |
| API and BDD tests | Karate | HTTP API behavior, BDD-style, smoke, and integration tests. |
| API/BDD report output | Cucumber-compatible JSON | Report format emitted by Karate for CI and test-reporting tools without making Cucumber the default test framework. |
| Java code coverage | JaCoCo | Code coverage reporting for backend tests. |
| Java mutation testing | PIT | Mutation testing for checking whether backend tests catch meaningful behavior changes. |
| Java quality analysis | SonarQube-compatible analysis | Static quality, coverage, duplication, and maintainability reporting through Sonar-compatible tooling. |
| Migration checks | Liquibase validation | Database changelog validation in tonys-workbench-database quality gates. |
| Git hook runner | Husky | Git hook management for local automation. |
| Changed-file checks | lint-staged | Runs format and lint tasks against staged files. |
`
    },
    {
      heading: 'Package And Workspace Tooling',
      markdown: `
| Role | Choice | Description |
| --- | --- | --- |
| JavaScript package manager | npm | Package manager for frontend dependencies and workspace scripts. |
| JavaScript package lock | package-lock.json | Reproducible npm dependency resolution. |
| Angular CLI | @angular/cli | Angular workspace command-line tooling. |
| Angular build system | @angular/build | Angular application build, serve, and test builder package. |
| TypeScript compiler | TypeScript 5.9.x | Compiler and language tooling version used by the Angular workspace. |
| Workspace TypeScript SDK | node_modules/typescript/lib | VS Code uses the workspace TypeScript version for consistent diagnostics. |
| Java build runner | Gradle Wrapper | Repository-pinned Java build execution. |
| Java dependency repository | Maven Central | Public Java dependency repository. |
| Gradle plugin repository | Gradle Plugin Portal | Public Gradle plugin repository. |
| Java artifact publishing | Maven publication | Backend services publish executable Spring Boot jar artifacts through Maven-compatible publication metadata from tonys-workbench-services. |
| Artifact repository | Artifactory-compatible Maven repository | Shared binary repository for published Java artifacts and build outputs. |
| Container tooling | Docker and Docker Compose | Local images, local service orchestration, and integration environments. |
| Kubernetes packaging tool | Helm | Deployment chart tooling. |
| UI validation command | npm run check | Runs UI repository linting, stylelint, Prettier check, unit tests, dependency-cruiser, knip, and placeholder server checks. |
| UI CI validation command | npm run check:ci | Runs the local UI validation command plus npm audit. |
| Java service validation command | Gradle check | Runs Java service tests, formatting checks, static analysis, and dependency checks in tonys-workbench-services. |
| Database validation command | Liquibase validation | Runs database changelog validation in tonys-workbench-database once database tooling exists. |
| BFF validation command | npm --workspace server run check | BFF TypeScript, lint, test, audit, and build checks should replace the placeholder server checks when implemented. |
`
    }
  ]
};

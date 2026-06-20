import { type DocumentationArticle } from '../../documentation.model';

export const PlatformGuideArticle: DocumentationArticle = {
  id: 'platform-guide',
  title: 'Platform Guide',
  summary: 'The enterprise-aligned hosting, database, jobs, and backend direction.',
  sections: [
    {
      heading: 'Recommendation',
      bullets: [
        'Use Node.js 24 LTS for the web/API server that serves browser-facing /api routes and owns SQL Server-backed data access.',
        'Use Express or another approved Node HTTP framework for server routes.',
        'Use Java 25 LTS and Spring Boot for optional domain services behind the Node.js server.',
        'Use Gradle and the Gradle Wrapper for Java build automation.',
        'Maven repositories, Artifactory, or private dependency repositories may still appear inside Gradle builds; that does not mean Maven is the project build tool.',
        'Use SQL Server as the primary relational database.',
        'Use `mssql` with the `tedious` driver for Node.js SQL Server access.',
        'Use Spring Data JPA and Hibernate for persistence mapping when relational domain modeling is needed.',
        'Use OIDC/OAuth for authentication and authorization.',
        'Use Kafka as the event-streaming platform when services need asynchronous events, pub/sub messaging, stream processing, or service decoupling.',
        'Use OpenShift Container Platform as the enterprise runtime target.',
        'Use Helm charts and environment-specific values for OpenShift deployments.',
        'Use deployment workflow integration for promoted environments.',
        'Use GitHub Actions for this personal repository.',
        'Use Elastic-compatible observability for Java service logs and diagnostics.',
        'Use OpenTelemetry-compatible instrumentation for portable traces, metrics, and logs.',
        'Use Java APM agent instrumentation where the runtime platform requires application performance monitoring.'
      ]
    },
    {
      heading: 'Node.js Server Responsibilities',
      bullets: [
        'Route Angular requests through same-origin /api endpoints instead of exposing downstream service URLs to the browser.',
        'Keep tokens, client credentials, mTLS material, private headers, and service-to-service details server-side.',
        'Use the Node.js server for SQL Server-backed data access, frontend-specific aggregation, response shaping, request validation, and safe error mapping.',
        'Keep SQL in repositories/query modules instead of Express route handlers.',
        'Avoid blind proxy routes unless they protect a browser boundary or simplify a real frontend contract.'
      ]
    },
    {
      heading: 'Configurable Java Dependencies',
      bullets: [
        'Mirror enterprise patterns without cloning every framework dependency from one service.',
        'Use Java persistence or outbound HTTP clients only for capabilities that remain inside optional Java services.',
        'Use Caffeine for bounded short-lived user details caching when repeated identity lookups need local caching.',
        'Use managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.',
        'Add feature-specific dependencies such as file generation, S3 clients, mail support, schedulers, and specialized caches only when a feature needs them.',
        'Keep Node.js server and Java service modules replaceable so build, auth, persistence, caching, and deployment choices can be adjusted if better reference applications are found.'
      ]
    },
    {
      heading: 'Repository Layout',
      bullets: [
        '`tonys-workbench-ui` contains `client/` for Angular and `server/` for the Node.js web/API server.',
        '`tonys-workbench-services` contains Java/Spring Boot services only when a feature needs a separate durable backend boundary.',
        '`tonys-workbench-database` contains SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.',
        'Enterprise services may also use a separate deployment repo for Helm charts, environment values, workflows, and promotion configuration.',
        'Split into a separate deployment repository later only if deployment configuration becomes large, access-controlled, or maintained on a different lifecycle.'
      ]
    },
    {
      heading: 'Local And Personal Hosting',
      bullets: [
        'Use Docker Compose first for local Angular, Node.js server, optional Spring Boot services, and SQL Server development.',
        'Use OpenShift-style manifests to mirror the enterprise deployment model.',
        'Use Red Hat Developer Sandbox for the closest hosted OpenShift learning environment when available.',
        'Use Azure Container Apps or another container host only as a fallback public demo target.'
      ]
    },
    {
      heading: 'Documentation Storage',
      bullets: [
        "Keep all Tony's Workbench documentation in the UI app for now so the repo family has one current source of guidance.",
        'Use the database later for editable application content, user-authored documentation, permissions, review workflows, or versioned publishing.',
        'When docs move to the database, keep Markdown as the content format and store front matter, category, route slug, version, status, and body in tables.'
      ]
    }
  ]
};

import { type DocumentationArticle } from '../../documentation.model';

export const PlatformGuideArticle: DocumentationArticle = {
  id: 'platform-guide',
  title: 'Platform Guide',
  summary: 'The enterprise-aligned hosting, database, jobs, and backend direction.',
  sections: [
    {
      heading: 'Recommendation',
      bullets: [
        'Use Java 25 LTS and Spring Boot for the backend API.',
        'Use Gradle and the Gradle Wrapper for Java build automation.',
        'Maven repositories, Artifactory, or private dependency repositories may still appear inside Gradle builds; that does not mean Maven is the project build tool.',
        'Use SQL Server as the primary relational database.',
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
      heading: 'Configurable Java Dependencies',
      bullets: [
        'Mirror enterprise patterns without cloning every framework dependency from one service.',
        'Use Spring RestClient for normal synchronous outbound HTTP calls, Spring WebClient for reactive calls, and Apache HttpClient 5 only when a low-level Apache transport is needed.',
        'Use Caffeine for bounded short-lived user details caching when repeated identity lookups need local caching.',
        'Use managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.',
        'Add feature-specific dependencies such as file generation, S3 clients, mail support, schedulers, and specialized caches only when a feature needs them.',
        'Keep backend modules replaceable so build, auth, persistence, caching, and deployment choices can be adjusted if better reference applications are found.'
      ]
    },
    {
      heading: 'Repository Layout',
      bullets: [
        'Enterprise services commonly use an application repo plus a separate deployment repo for Helm charts, environment values, workflows, and promotion configuration.',
        "Keep CD assets in this repo while Tony's Workbench is a personal learning project.",
        'Split into a separate tonys-workbench-cd repo later only if deployment configuration becomes large, access-controlled, or maintained on a different lifecycle.'
      ]
    },
    {
      heading: 'Local And Personal Hosting',
      bullets: [
        'Use Docker Compose first for local Angular, Spring Boot, and SQL Server development.',
        'Use OpenShift-style manifests to mirror the enterprise deployment model.',
        'Use Red Hat Developer Sandbox for the closest hosted OpenShift learning environment when available.',
        'Use Azure Container Apps or another container host only as a fallback public demo target.'
      ]
    },
    {
      heading: 'Documentation Storage',
      bullets: [
        'Use flat Markdown files as the source of truth while the docs are mostly developer/team documentation.',
        'Use the database for editable application content, user-authored content, permissions, review workflows, or versioned publishing.',
        'If docs move to the database later, keep Markdown as the content format and store front matter, category, route slug, version, status, and body in tables.'
      ]
    }
  ]
};

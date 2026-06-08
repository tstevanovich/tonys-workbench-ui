import { type DocumentationArticle } from '../../documentation.model';

export const FullStackArchitectureGuideArticle: DocumentationArticle = {
  id: 'full-stack-architecture-guide',
  title: 'System Architecture Guide',
  summary: 'How the major system layers divide responsibility without duplicating folder rules.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'Keep Angular code in `tonys-workbench-ui/client`.',
        'Use Angular for the web application, user interaction, route composition, accessible UI, client-side workflow state, markdown rendering, and document generation workflows.',
        'Use TanStack Query for server state and NgRx SignalStore for feature workflow state.',
        'Use frontend validation for fast user feedback, but treat BFF and Java service validation as the trusted enforcement layers.',
        'Keep secrets, privileged decisions, and durable business rules out of the frontend bundle.'
      ]
    },
    {
      heading: 'Backend For Frontend',
      bullets: [
        'Keep Node.js BFF code in `tonys-workbench-ui/server`.',
        'Use Node.js for the web-edge Backend-for-Frontend layer between Angular and Java services.',
        'Expose same-origin /api routes for Angular services to call.',
        'Use the BFF for session-aware request handling, token mediation, response shaping, request validation, frontend-specific aggregation, and user-safe error mapping.',
        'Keep downstream service URLs, client credentials, mTLS material, private headers, and service-to-service token handling out of the browser.',
        'Use TypeScript and the current Node.js LTS line when the BFF module is added.',
        'Use Express or another approved Node HTTP framework for route handling when a server module is added.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Keep Java services in the sibling `tonys-workbench-services` repository.',
        'Use Java 25 LTS and Spring Boot for domain APIs, durable authorization enforcement, transactions, server-side validation, integrations, background jobs, and observability hooks.',
        'Design Java services as cloud-native, 12-factor applications.',
        'Use Clean Architecture and Domain-Driven Design to keep API contracts, application workflows, domain behavior, integration adapters, and persistence concerns intentionally separated.',
        'Use Gradle for Java build automation and the Gradle Wrapper for repository-pinned execution.',
        'Keep generated API contracts, DTOs, domain models, and persistence entities intentionally separated.',
        'Use Kafka when a service needs asynchronous events, pub/sub messaging, stream processing, or service decoupling.',
        'Add feature-specific dependencies such as file generation, S3, mail, schedulers, or specialized caches only when a feature needs them.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'Keep database-owned schema assets in the sibling `tonys-workbench-database` repository.',
        'Use SQL Server as the primary relational persistence target.',
        'Use the database for editable content, user-authored content, permissions, review workflows, versioned publishing, and durable application records.',
        'Use Liquibase migrations as the source of truth for schema changes once database assets exist.',
        'Keep database decisions tied to backend use cases and documented data ownership, not to frontend component shape.'
      ]
    },
    {
      heading: 'Deployment',
      bullets: [
        'Use Docker Compose first for local full-stack development.',
        'Run the Angular app, Node.js BFF, Java services, SQL Server, and supporting services as separate local processes or containers as the stack grows.',
        'Use OpenShift Container Platform as the enterprise runtime environment.',
        'Use Helm and environment-specific values for OpenShift-style deployments.',
        'Use GitHub Actions for this personal repository while allowing workflows to hand off to deployment orchestration when environments require it.'
      ]
    }
  ]
};

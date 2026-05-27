import { type DocumentationArticle } from '../../documentation.model';

export const ArchitectureOverviewArticle: DocumentationArticle = {
  id: 'architecture-overview',
  title: 'Architecture Overview',
  summary: 'How the frontend, BFF, Java services, and database fit together as one system.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'The Angular app owns browser UI, routing, client-side workflow state, accessibility, form interaction, document rendering, and calls to same-origin BFF APIs.',
        'Frontend features are organized by product capability, with shared UI kept reusable and infrastructure kept intentionally small.',
        'The frontend should not own durable business rules, database permissions, secret handling, or server-only validation.'
      ]
    },
    {
      heading: 'Backend For Frontend',
      bullets: [
        'The Node.js BFF owns browser-facing /api routes, token mediation, session-aware request handling, request validation, response shaping, error mapping, and calls to Java services.',
        'Angular should call the BFF instead of calling Java microservice URLs directly from the browser.',
        'The BFF keeps private service URLs, client credentials, mTLS details, private headers, and service-to-service token handling out of browser code.',
        'The BFF should not become a blind proxy for every service endpoint; use it where it improves security, API ergonomics, or frontend-specific aggregation.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Java 25 LTS Spring Boot services own server-side use cases, durable authorization decisions, validation that must be trusted, transaction boundaries, integrations, background work, and stable domain API contracts.',
        'Backend services follow cloud-native, 12-factor, Clean Architecture, and Domain-Driven Design principles.',
        'Java service code separates API contracts, business behavior, configuration, and integration adapters.',
        'Java services translate between API contracts, domain behavior, and persistence concerns instead of leaking database entities to clients.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'The database owns durable application state, relational integrity, queryable history, permissions data, audit-friendly records, and content that must survive deployments.',
        'Schema changes should be represented through migrations once Java services own durable persistence.',
        'Database design should be documented with ownership, retention, permissions, and audit expectations before important tables become permanent.'
      ]
    },
    {
      heading: 'Planning Rule',
      bullets: [
        'Treat this repository as both an application and a reusable architecture model for future repositories.',
        'Plan documentation, components, BFF modules, Java services, database assets, deployment assets, and quality gates before implementation folders grow around them.',
        'Update in-app documentation and ADRs when architecture, stack, deployment, auth, database, or governance rules change.'
      ]
    }
  ]
};

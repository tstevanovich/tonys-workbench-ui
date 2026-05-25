import { type DocumentationArticle } from '../../documentation.model';

export const ArchitectureOverviewArticle: DocumentationArticle = {
  id: 'architecture-overview',
  title: 'Architecture Overview',
  summary: 'How the frontend, backend, and database fit together as one system.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'The Angular app owns browser UI, routing, client-side workflow state, accessibility, form interaction, document rendering, and calls to backend APIs.',
        'Frontend features are organized by product capability, with shared UI kept reusable and infrastructure kept intentionally small.',
        'The frontend should not own durable business rules, database permissions, secret handling, or server-only validation.'
      ]
    },
    {
      heading: 'Back End',
      bullets: [
        'The Java 25 LTS Spring Boot API owns server-side use cases, authorization decisions, validation that must be trusted, transaction boundaries, integrations, background work, and stable API contracts.',
        'Backend services follow cloud-native, 12-factor, Clean Architecture, and Domain-Driven Design principles.',
        'Backend code separates API contracts, business behavior, configuration, and integration adapters.',
        'The backend translates between API contracts, domain behavior, and persistence concerns instead of leaking database entities to clients.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'The database owns durable application state, relational integrity, queryable history, permissions data, audit-friendly records, and content that must survive deployments.',
        'Schema changes should be represented through migrations once the backend exists.',
        'Database design should be documented with ownership, retention, permissions, and audit expectations before important tables become permanent.'
      ]
    },
    {
      heading: 'Planning Rule',
      bullets: [
        'Treat this repository as both an application and a reusable architecture model for future repositories.',
        'Plan documentation, components, backend modules, database assets, deployment assets, and quality gates before implementation folders grow around them.',
        'Update in-app documentation and ADRs when architecture, stack, deployment, auth, database, or governance rules change.'
      ]
    }
  ]
};

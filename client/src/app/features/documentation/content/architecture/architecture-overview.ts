import { type DocumentationArticle } from '../../documentation.model';

export const ArchitectureOverviewArticle: DocumentationArticle = {
  id: 'architecture-overview',
  title: 'Architecture Overview',
  summary: 'How the frontend, Node.js server, optional Java services, and database fit together.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'The Angular app lives in `tonys-workbench-ui/client`.',
        'The Angular app owns browser UI, routing, client-side workflow state, accessibility, form interaction, document rendering, and calls to same-origin Node.js server APIs.',
        'The UI app is the current documentation host for the UI, Java services, and database repositories.',
        'Frontend features are organized by product capability, with shared UI kept reusable and infrastructure kept intentionally small.',
        'The frontend should not own durable business rules, database permissions, secret handling, or server-only validation.'
      ]
    },
    {
      heading: 'Node.js Server',
      bullets: [
        'The Node.js server lives in `tonys-workbench-ui/server`.',
        'The Node.js server owns browser-facing /api routes, token mediation, session-aware request handling, request validation, response shaping, error mapping, and SQL Server-backed data access.',
        'Angular should call the Node.js server instead of calling downstream service URLs directly from the browser.',
        'The server keeps private service URLs, client credentials, mTLS details, private headers, and service-to-service token handling out of browser code.',
        'Keep SQL in repositories/query modules instead of Express route handlers, and shape routes around browser workflows and clear API contracts.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Java services live in the sibling `tonys-workbench-services` repository only when a feature needs a separate backend service boundary.',
        'Java 25 LTS Spring Boot services can own durable authorization decisions, trusted validation, transaction boundaries, persistence workflows, event streaming, background work, and stable domain API contracts.',
        'Backend services follow cloud-native, 12-factor, Clean Architecture, and Domain-Driven Design principles.',
        'Java service code separates API contracts, business behavior, configuration, and integration adapters when Java is the right boundary.',
        'Java services translate between API contracts, domain behavior, and persistence concerns instead of leaking database entities to clients.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'Database-owned assets live in the sibling `tonys-workbench-database` repository.',
        'The database owns durable application state, relational integrity, queryable history, permissions data, audit-friendly records, and content that must survive deployments.',
        'Schema changes should be represented through Liquibase migrations once database-owned assets exist.',
        'Database design should be documented with ownership, retention, permissions, and audit expectations before important tables become permanent.'
      ]
    },
    {
      heading: 'Planning Rule',
      bullets: [
        'Treat this UI repository as both an application and the current documentation host for the repo family.',
        'Plan documentation, components, Node.js server modules, optional Java services, database assets, deployment assets, and quality gates before implementation folders or sibling repositories grow around them.',
        'Update in-app documentation and ADRs when architecture, stack, deployment, auth, database, or governance rules change.'
      ]
    }
  ]
};

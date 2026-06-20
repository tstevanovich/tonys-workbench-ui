import { type DocumentationArticle } from '../../documentation.model';

export const ApiGuideArticle: DocumentationArticle = {
  id: 'api-guide',
  title: 'API Guide',
  summary:
    'How frontend API access, Node.js SQL-backed APIs, optional Java service contracts, and database persistence are separated.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'OpenAPI clients own endpoint contracts and generated transport types.',
        'Data-access adapters call OpenAPI clients and map transport data into application models.',
        'Zod validates data at trust boundaries.',
        'TanStack Query owns request lifecycle, caching, invalidation, retries, and mutation state.',
        'SignalStore composes server state with screen behavior and user workflow state.',
        'Angular services call same-origin Node.js server endpoints such as /api/recent-restrictions instead of calling SQL Server or downstream service URLs directly.',
        'Chart features should register ngx-echarts and a minimal ECharts core bundle at the route level instead of app-wide.'
      ]
    },
    {
      heading: 'Read Operations',
      markdown: `
\`\`\`text
Component
-> SignalStore (UI state only)
-> TanStack Query (server state)
-> OpenAPI generated server API client
-> HttpClient
-> Node.js server /api endpoint
-> Handler/use case
-> SQL Server repository/query module
-> SQL Server

Response
-> Zod validation
-> Mapper
-> UI/domain model
-> TanStack Query cache
-> Component/UI
\`\`\`
`
    },
    {
      heading: 'Write Operations',
      markdown: `
\`\`\`text
Component
-> SignalStore (UI state only)
-> TanStack Mutation
-> OpenAPI generated server API client
-> HttpClient
-> Node.js server /api endpoint
-> Handler/use case
-> SQL Server repository/query module
-> SQL Server

Response
-> Zod validation
-> Mapper
-> Query invalidation/refetch
-> Updated cache/UI
\`\`\`
`
    },
    {
      heading: 'Node.js Server',
      bullets: [
        'Server routes expose browser-facing contracts and should stay intentionally shaped for Angular workflows.',
        'The Node.js server validates browser input, maps SQL and dependency errors into user-safe responses, and keeps database credentials server-side.',
        'Routes call handlers or use cases, handlers call repositories/query modules, and repositories/query modules call SQL Server.',
        'Do not put raw SQL directly in Express route handlers.',
        'Shape API responses as REST JSON DTOs for Angular instead of leaking table rows or database entities.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Use Java service APIs only when a feature needs a separate durable domain, transaction, persistence, eventing, or background-work boundary.',
        'Controllers expose stable domain/service API contracts and should stay thin.',
        'Request and response DTOs are API contracts and should not be persistence entities.',
        'Application services enforce trusted validation, authorization, use-case flow, and transaction boundaries.',
        'Use OpenAPI generation once the API becomes stable enough for generated Node.js server or service clients.',
        'Use Java only when a feature needs a separate durable domain, transaction, persistence, eventing, or background-work boundary.',
        'CORS policy belongs in the Node.js server, backend, or gateway, not in Angular workarounds.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'Database entities and tables are persistence details and should not leak into frontend API contracts.',
        'Repositories should serve backend use cases rather than mirroring every table as a public API shape.',
        'Schema constraints should protect durable integrity even when frontend validation is bypassed.',
        'Migration history should explain API-visible data changes when contract behavior changes.'
      ]
    },
    {
      heading: 'Integration Rules',
      bullets: [
        'CORS is a server responsibility, not an Angular workaround.',
        'Use local proxy configuration only for local development when the Angular dev server and Node.js server run on different ports.',
        'Production browser calls should prefer same-origin Node.js server routes.',
        'Downstream service APIs should be protected behind gateway, platform, or service-network boundaries instead of being treated as browser-facing endpoints.'
      ]
    }
  ]
};

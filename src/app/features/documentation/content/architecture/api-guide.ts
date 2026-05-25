import { type DocumentationArticle } from '../../documentation.model';

export const ApiGuideArticle: DocumentationArticle = {
  id: 'api-guide',
  title: 'API Guide',
  summary: 'How frontend API access, backend contracts, and database persistence are separated.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'OpenAPI clients own endpoint contracts and generated transport types.',
        'Data-access adapters call OpenAPI clients and map transport data into application models.',
        'Zod validates data at trust boundaries.',
        'TanStack Query owns request lifecycle, caching, invalidation, retries, and mutation state.',
        'SignalStore composes server state with screen behavior and user workflow state.',
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
-> OpenAPI generated client
-> HttpClient
-> Backend API

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
-> OpenAPI generated client
-> HttpClient
-> Backend API

Response
-> Zod validation
-> Mapper
-> Query invalidation/refetch
-> Updated cache/UI
\`\`\`
`
    },
    {
      heading: 'Back End',
      bullets: [
        'Controllers expose stable API contracts and should stay thin.',
        'Request and response DTOs are API contracts and should not be persistence entities.',
        'Application services enforce trusted validation, authorization, use-case flow, and transaction boundaries.',
        'Use OpenAPI generation once the API becomes stable enough for generated clients.',
        'Use Spring RestClient or Spring HTTP Interface for normal typed outbound REST clients.',
        'Use WebClient when reactive or non-blocking outbound behavior is needed.',
        'CORS policy belongs in the backend or gateway, not in Angular workarounds.'
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
        'Use local proxy configuration only for local development.',
        'Production APIs must explicitly allow the deployed application origin.'
      ]
    }
  ]
};

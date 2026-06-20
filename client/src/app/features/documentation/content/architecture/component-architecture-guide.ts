import { type DocumentationArticle } from '../../documentation.model';

export const ComponentArchitectureGuideArticle: DocumentationArticle = {
  id: 'component-architecture-guide',
  title: 'Feature And Component Architecture Guide',
  summary:
    'How feature pieces are composed across frontend, Node.js server, optional Java service, and database layers.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'Routed page components compose data, feature state, page layout, and user workflows.',
        'Feature components live under their feature and may depend on feature models, state, and data-access code.',
        'Shared UI components live under client/src/app/shared/ui and must not depend on feature code.',
        'Shared form components live under client/src/app/shared/forms and own reusable form rendering, validation messages, and control adapters.',
        'Core services may be used by features and shared infrastructure, but shared UI should stay presentation-first.'
      ]
    },
    {
      heading: 'Node.js Server',
      bullets: [
        'Server feature routes own browser-facing request validation, response shaping, error translation, and SQL-backed API behavior for one product capability.',
        'Keep direct SQL in repositories/query modules and call them through route handlers or use cases.',
        'Server code should stay close to frontend workflow needs without duplicating durable business rules that belong in optional domain services.',
        'Shared server middleware owns cross-cutting concerns such as request correlation, session context, auth headers, logging, and security hardening.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Java service feature packages are added only when a capability needs a separate durable service boundary.',
        'Controllers should stay thin and delegate workflow decisions to application services.',
        'Application services define transaction boundaries and coordinate domain logic, repositories, and external integrations.',
        'Domain code owns business rules that should not be duplicated in Angular components.',
        'Persistence code owns database entities, repositories, and mappings.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'A feature owns the tables, migrations, reference data, and data model notes needed for its durable behavior.',
        'Database design should support the backend use cases without forcing frontend-specific screen shapes into the schema.',
        'Important feature data needs documented ownership, lifecycle, retention, permissions, and audit behavior.',
        'Seed data should be scoped to local development, automated tests, or product reference data so environments stay understandable.'
      ]
    },
    {
      heading: 'Shared Frontend Components',
      bullets: [
        'Promote a component to shared only after at least two features need the same behavior or the component is clearly platform-level UI.',
        'Prefer inputs, outputs, content projection, and typed configuration objects over hidden service coupling.',
        'Keep reusable components accessible by default: semantic HTML first, keyboard support, focus states, labels, and live-region behavior when needed.',
        'Use Material components and Material Symbols naturally before creating custom controls or custom icon systems.',
        'Keep Markdown rendering centralized in the shared markdown renderer.',
        'Register Prism languages in the renderer language registration file so future fenced code support has one clear home.',
        'Keep copy-code behavior inside the renderer instead of scattering clipboard logic across documentation, chat, and prompt screens.'
      ]
    }
  ]
};

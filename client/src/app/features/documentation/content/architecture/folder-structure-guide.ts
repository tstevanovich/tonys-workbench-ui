import { type DocumentationArticle } from '../../documentation.model';

export const FolderStructureGuideArticle: DocumentationArticle = {
  id: 'folder-structure-guide',
  title: 'Folder Structure Guide',
  summary: 'Where frontend, backend, database, and deployment assets belong.',
  sections: [
    {
      heading: 'Front End',
      markdown: `
\`\`\`text
client/
  angular.json
  package.json
  src/app/
  core/                       frontend-wide infrastructure
  shared/                     reusable frontend UI, forms, a11y, testing helpers
  features/<feature-name>/    Angular routes, pages, components, state, data access
\`\`\`
`,
      bullets: [
        'Use `client/` for Angular application code, Angular config, client tests, browser assets, and frontend package scripts.',
        'client/src/app/core/auth for authentication, authorization, route guards, and identity services.',
        'client/src/app/core/api for HTTP configuration, OpenAPI clients, interceptors, and request utilities.',
        'client/src/app/core/errors for global error handling and user-safe error mapping.',
        'client/src/app/core/logging for client logging and observability adapters.',
        'client/src/app/shared/ui for reusable standalone presentation components.',
        'client/src/app/shared/forms for form controls, validators, and validation-message helpers.',
        'client/src/app/shared/a11y for accessibility helpers and CDK a11y wrappers.',
        'client/src/app/shared/testing for test builders, render helpers, and reusable mocks.',
        'client/src/app/features/<feature-name> for routes, pages, components, stores, schemas, data-access, and tests for one product area.'
      ]
    },
    {
      heading: 'Backend For Frontend',
      markdown: `
\`\`\`text
server/
  package.json
  src/
    app.ts                    Express app composition
    server.ts                 Node server startup
    routes/                   browser-facing /api route modules
    middleware/               auth, correlation, logging, security, errors
    clients/                  typed clients for Java services and gateways
    schemas/                  Zod request, response, and config schemas
    config/                   typed runtime configuration
    observability/            logs, metrics, traces, health
  test/                       unit and route tests
\`\`\`
`,
      bullets: [
        'Use `server/` for the Node.js Backend-for-Frontend module.',
        'Use the BFF for browser-facing /api routes, response shaping, token mediation, frontend-specific aggregation, and safe error mapping.',
        'Keep BFF routes separate from Angular components and Java domain service packages.',
        'Do not commit private downstream URLs, tokens, mTLS material, or environment-specific secrets in BFF config.'
      ]
    },
    {
      heading: 'Java Services',
      markdown: `
\`\`\`text
tonys-workbench-services/
  services/<service-name>/
  build.gradle
  settings.gradle
  src/main/java/<base-package>/
    api/                      controllers, API DTOs, generated/openapi-facing contracts
    business/                 use cases, transactions, domain behavior
    configuration/            Spring configuration, properties, beans
    integration/              external systems, clients, persistence adapters
  src/main/resources/api/     OpenAPI specifications
  src/test/java/<base-package>/
bdd/                          API and BDD test project
\`\`\`
`,
      bullets: [
        'Create Java/Spring Boot microservices in the sibling `tonys-workbench-services` repository.',
        'Use this enterprise Spring service layout when building Java services.',
        'Keep API contracts, business behavior, configuration, and integration adapters separate.',
        'Keep feature-specific subpackages inside these areas when a bounded context grows large enough to need clearer ownership.',
        'Keep BDD tests in a dedicated bdd/ project when they need their own configuration, dependencies, reports, or runtime profile.'
      ]
    },
    {
      heading: 'Database',
      markdown: `
\`\`\`text
tonys-workbench-database/
  migrations/                 versioned schema changes
  seed/                       local or test seed data
  docs/                       data model notes and diagrams
  local/                      developer-only database helpers
\`\`\`
`,
      bullets: [
        'Create SQL Server and Liquibase-owned assets in the sibling `tonys-workbench-database` repository.',
        'Keep migrations, seed data, documentation, and developer helpers separate.',
        'Do not mix application code, generated output, or UI deployment manifests into database folders.'
      ]
    },
    {
      heading: 'Deployment',
      markdown: `
\`\`\`text
deploy/
  compose/                    local client, server, Java services, and SQL Server composition
  helm/                       Helm charts and values
  openshift/                  OpenShift-specific manifests when needed
.github/workflows/           GitHub Actions for this personal repository
docs/adr/                    architecture decisions
\`\`\`
`,
      bullets: [
        'Create deploy/ when local or platform deployment assets exist for the UI repository.',
        'Keep GitHub Actions workflows in .github/workflows.',
        'Use ADRs to explain major deployment, hosting, auth, database, and architecture decisions.'
      ]
    }
  ]
};

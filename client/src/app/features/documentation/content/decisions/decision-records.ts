import { type DocumentationArticle } from '../../documentation.model';

export const DecisionRecordsArticle: DocumentationArticle = {
  id: 'decision-records',
  title: 'Decision Records',
  summary: 'Architecture decisions that should be captured as the project evolves.',
  sections: [
    {
      heading: 'Current Decisions',
      bullets: [
        "Use Tony's Workbench as the product name.",
        'Use `tonys-workbench-ui` as the repository for the Angular client and Node.js server.',
        'Use `tonys-workbench-services` as the repository for optional Java/Spring Boot services.',
        'Use `tonys-workbench-database` as the repository for SQL Server schema, Liquibase migrations, seed/reference data, and database documentation.',
        'Use Home, Documentation, Planner, AI Studio, Code Lab, Projects, Integrations, Career, and Settings as the first-level workspace navigation.',
        'Use Angular Material/CDK as the UI foundation.',
        'Use Material Symbols for icons. Browse icons at https://fonts.google.com/icons.',
        'Use SCSS plus native CSS capabilities instead of Tailwind, Bootstrap, Bulma, or PicoCSS.',
        'Use NgRx SignalStore for feature state and TanStack Query for server state.',
        'Use ECharts as the only charting library.',
        'Use Angular, Node.js server-owned SQL-backed APIs, optional Java 25 LTS Spring Boot domain services, SQL Server, OIDC/OAuth, Kafka, OpenShift, deployment workflow integration, Elastic-compatible observability, OpenTelemetry-compatible instrumentation, and Java APM agent instrumentation as the enterprise-aligned full-stack baseline.',
        'Route browser API calls through the Node.js server instead of calling downstream service URLs directly from Angular.',
        'Keep browser-facing OpenAPI contracts with the UI/server repository, optional Java service OpenAPI contracts with the services repository, and database migration contracts with the database repository.',
        "Treat this UI repository as the current documentation host for Tony's Workbench and future repositories."
      ]
    },
    {
      heading: 'Future Decisions To Add',
      bullets: [
        'Concrete OIDC/OAuth provider and authorization policy model.',
        'Concrete frontend error monitoring target.',
        'Internationalization strategy.',
        'Concrete SQL repository patterns, Java service package names, background job platform, and scheduled job platform.',
        'Container registry, image tagging, and deployment promotion model.',
        'Whether deployment assets stay with each layer repository or move to a separate deployment repository.',
        'When editable documentation content should move from in-app TypeScript modules into database-backed markdown.'
      ]
    }
  ]
};

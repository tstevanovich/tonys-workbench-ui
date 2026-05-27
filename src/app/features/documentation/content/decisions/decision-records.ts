import { type DocumentationArticle } from '../../documentation.model';

export const DecisionRecordsArticle: DocumentationArticle = {
  id: 'decision-records',
  title: 'Decision Records',
  summary: 'Architecture decisions that should be captured as the project evolves.',
  sections: [
    {
      heading: 'Current Decisions',
      bullets: [
        "Use Tony's Workbench as the product name and tonys-workbench as the repository/package name.",
        'Use Home, Documentation, Planner, AI Studio, Code Lab, Projects, Integrations, Career, and Settings as the first-level workspace navigation.',
        'Use Angular Material/CDK as the UI foundation.',
        'Use Material Symbols for icons. Browse icons at https://fonts.google.com/icons.',
        'Use SCSS plus native CSS capabilities instead of Tailwind, Bootstrap, Bulma, or PicoCSS.',
        'Use NgRx SignalStore for feature state and TanStack Query for server state.',
        'Use ECharts as the only charting library.',
        'Use Angular, Node.js BFF, Java 25 LTS, Spring Boot domain services, SQL Server, OIDC/OAuth, Kafka, OpenShift, deployment workflow integration, Elastic-compatible observability, OpenTelemetry-compatible instrumentation, and Java APM agent instrumentation as the enterprise-aligned full-stack baseline.',
        'Route browser API calls through a Node.js Backend-for-Frontend instead of calling Java microservice URLs directly from Angular.',
        "Treat this repository as a durable architecture and documentation model for Tony's Workbench and future repositories."
      ]
    },
    {
      heading: 'Future Decisions To Add',
      bullets: [
        'Concrete OIDC/OAuth provider and authorization policy model.',
        'Concrete frontend error monitoring target.',
        'Concrete database migration tool and migration ownership model.',
        'Internationalization strategy.',
        'Concrete BFF package layout, Java service package names, background job platform, and scheduled job platform.',
        'Container registry, image tagging, and deployment promotion model.',
        'Whether deployment assets stay in this repository or move to a separate deployment repository.'
      ]
    }
  ]
};

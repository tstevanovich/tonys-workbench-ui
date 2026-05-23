import { type DocumentationArticle, type DocumentationCategory } from './documentation.model';

export const documentationCategories: readonly DocumentationCategory[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    articleIds: ['setup-guide', 'local-development-guide', 'onboarding-guide']
  },
  {
    id: 'architecture',
    label: 'Architecture',
    articleIds: [
      'architecture-overview',
      'folder-structure-guide',
      'api-guide',
      'error-handling-guide'
    ]
  },
  {
    id: 'standards',
    label: 'Standards',
    articleIds: ['modern-tech-stack', 'coding-standards', 'accessibility-guide', 'testing-guide']
  },
  {
    id: 'operations',
    label: 'Operations',
    articleIds: [
      'deployment-guide',
      'platform-guide',
      'security-guide',
      'observability-guide',
      'troubleshooting-guide'
    ]
  },
  {
    id: 'decisions',
    label: 'Decisions',
    articleIds: ['decision-records', 'release-management-guide', 'governance-guide']
  }
];

export const documentationArticles: readonly DocumentationArticle[] = [
  {
    id: 'modern-tech-stack',
    title: 'Modern Tech Stack',
    summary: 'The default stack for personal and corporate Angular applications.',
    sections: [
      {
        heading: 'Foundation',
        bullets: [
          'Angular 21+ with standalone components, strict TypeScript, route-level lazy loading, signals, modern template control flow, and no SSR unless a product requirement calls for it.',
          'npm is the package manager so the stack works in locked-down corporate environments that allow Node modules but not system installs.',
          'Angular Material and CDK are the primary UI layer; Material Symbols are the icon set.'
        ]
      },
      {
        heading: 'CSS Strategy',
        markdown: `
| CSS Type | Technology |
| --- | --- |
| Styling language | SCSS |
| UI component system | Angular Material |
| Dynamic theme values | CSS custom properties |
| Page layout | CSS Grid |
| Component alignment | Flexbox |
| Responsive components | Container queries |
| Responsive screens/devices | Media queries |
| Consistent font sizing | Typography tokens |
| Icons | Material Symbols |
`,
        bullets: [
          'Use SCSS for organization, nesting, partials, and design-token composition.',
          'Use native CSS variables for theme tokens, spacing, layout constants, and component-level customization.',
          'Use CSS Grid for page shells, dashboards, dense forms, and two-dimensional layouts.',
          'Use Flexbox for toolbars, button rows, inline alignment, and one-dimensional component internals.',
          'Use container queries for reusable components that must respond to their own space.',
          'Use media queries only for viewport-level layout changes such as shell/navigation behavior.',
          'Do not add Tailwind, Bootstrap, Bulma, or PicoCSS to Angular Material apps unless a project has a specific compatibility reason.'
        ]
      },
      {
        heading: 'Data And Files',
        bullets: [
          'OpenAPI owns generated transport types.',
          'Data-access adapters map transport types into application models.',
          'TanStack Query owns server-state fetching, caching, invalidation, and mutation behavior.',
          'NgRx SignalStore owns screen and feature behavior that survives beyond a single component.',
          'Components own presentation, local interaction state, and accessible markup.',
          'Zod validates runtime boundaries such as API responses, file imports, AI output, local storage, and user-provided JSON.',
          'ECharts plus ngx-echarts is the single charting stack for simple and advanced charts.',
          'ExcelJS, pdfmake, and docx cover Excel, PDF, and Word document generation.'
        ]
      }
    ]
  },
  {
    id: 'architecture-overview',
    title: 'Architecture Overview',
    summary: 'How features, state, data, UI, and cross-cutting services fit together.',
    sections: [
      {
        heading: 'Core Rule',
        body: 'The application is organized by product capability first, with shared infrastructure kept intentionally small.'
      },
      {
        heading: 'Ownership Boundaries',
        bullets: [
          'Feature folders own routes, page components, feature stores, feature API adapters, feature schemas, and tests.',
          'Core owns singleton infrastructure: auth, logging, error handling, API base clients, app configuration, interceptors, and observability.',
          'Shared owns reusable presentation components, directives, pipes, validators, and utility types that have no feature dependency.',
          'Data-access code translates transport types into application models and is the only layer that should know API endpoint details.'
        ]
      },
      {
        heading: 'State Pattern',
        bullets: [
          'Use component signals for local UI-only state.',
          'Use services with signals for simple shared state.',
          'Use NgRx SignalStore for feature-level state, workflows, derived state, and multi-component behavior.',
          'Use TanStack Query for remote server state instead of duplicating cache state inside SignalStore.'
        ]
      }
    ]
  },
  {
    id: 'folder-structure-guide',
    title: 'Folder Structure Guide',
    summary: 'The exact folder layout to reuse across personal and work projects.',
    sections: [
      {
        heading: 'Recommended Layout',
        bullets: [
          'src/app/core/auth for authentication, authorization, route guards, and identity services.',
          'src/app/core/api for HTTP configuration, OpenAPI clients, interceptors, and request utilities.',
          'src/app/core/errors for global error handling and user-safe error mapping.',
          'src/app/core/logging for client logging and observability adapters.',
          'src/app/shared/ui for reusable standalone presentation components.',
          'src/app/shared/forms for form controls, validators, and validation-message helpers.',
          'src/app/shared/a11y for accessibility helpers and CDK a11y wrappers.',
          'src/app/shared/testing for test builders, render helpers, and reusable mocks.',
          'src/app/features/<feature-name> for routes, pages, components, stores, schemas, data-access, and tests for one product area.'
        ]
      },
      {
        heading: 'Feature Folder Pattern',
        bullets: [
          'feature.routes.ts defines route-level providers and lazy page loading.',
          'pages/ contains routed page components.',
          'components/ contains feature-only components.',
          'data-access/ contains queries, mutations, OpenAPI adapters, and mapping functions.',
          'state/ contains SignalStores and local feature facades.',
          'schemas/ contains Zod schemas and runtime parsing helpers.',
          'models/ contains app-level feature types that are not generated transport types.'
        ]
      }
    ]
  },
  {
    id: 'setup-guide',
    title: 'Setup Guide',
    summary: 'How to get the application ready on a new machine.',
    sections: [
      {
        heading: 'Prerequisites',
        bullets: [
          'Use Node 20.19+, 22.12+, or 24+ for Angular 21 compatibility.',
          'Use npm 11+ for install and scripts.',
          'Use VS Code with Angular Language Service, ESLint, Prettier, Stylelint, and Playwright extensions.'
        ]
      },
      {
        heading: 'Install',
        bullets: ['Run npm install.', 'Run npm run check.', 'Run npm run build.']
      }
    ]
  },
  {
    id: 'local-development-guide',
    title: 'Local Development Guide',
    summary: 'Daily commands and development workflow.',
    sections: [
      {
        heading: 'Commands',
        bullets: [
          'npm start runs the Angular dev server.',
          'npm run test:unit runs Vitest through Angular.',
          'npm run test:e2e runs Playwright.',
          'npm run check runs linting, style linting, formatting, architecture, and dead-code checks.',
          'npm run build verifies the production bundle.'
        ]
      },
      {
        heading: 'Workflow',
        bullets: [
          'Create a small branch per change.',
          'Update the in-app docs or decision records when the stack, architecture, or workflow changes.',
          'Run check and build before pushing.',
          'Let GitHub Actions be the deploy gate.'
        ]
      }
    ]
  },
  {
    id: 'coding-standards',
    title: 'Coding Standards',
    summary: 'Conventions that keep Angular code consistent and maintainable.',
    sections: [
      {
        heading: 'Angular',
        bullets: [
          'Prefer standalone components and route-level lazy loading.',
          'Prefer signals for local reactive state.',
          'Use typed reactive forms for complex forms.',
          'Keep components presentational unless they are routed pages.',
          'Keep API transport types out of templates.'
        ]
      },
      {
        heading: 'CSS',
        bullets: [
          'Use Material design tokens first.',
          'Use CSS variables for app tokens.',
          'Use Grid for page layout and Flexbox for local alignment.',
          'Use container queries for reusable components.',
          'Avoid utility CSS frameworks inside Angular Material applications.'
        ]
      },
      {
        heading: 'Accessibility',
        bullets: [
          'Use semantic HTML before ARIA.',
          'Use ARIA only when native semantics are not enough.',
          'Every form field needs visible labels, clear helper text, and accessible error messaging.',
          'Keyboard, focus, contrast, reduced motion, and screen-reader flows are part of done.'
        ]
      }
    ]
  },
  {
    id: 'api-guide',
    title: 'API Guide',
    summary: 'How transport, validation, caching, and feature state are separated.',
    sections: [
      {
        heading: 'Layering',
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
        heading: 'CORS',
        bullets: [
          'CORS is a server responsibility, not an Angular workaround.',
          'Use local proxy configuration only for local development.',
          'Production APIs must explicitly allow the deployed application origin.'
        ]
      }
    ]
  },
  {
    id: 'testing-guide',
    title: 'Testing Guide',
    summary: 'The testing pyramid for this Angular stack.',
    sections: [
      {
        heading: 'Unit And Component Tests',
        bullets: [
          'Use Vitest and jsdom through Angular unit-test builder.',
          'Test pure mapping, validation, stores, guards, and component behavior close to the code.',
          'Prefer user-visible assertions over implementation details.'
        ]
      },
      {
        heading: 'End To End',
        bullets: [
          'Use Playwright for browser flows, accessibility checks with axe-core, and basic visual coverage.',
          'Run Chromium in CI by default; expand to Firefox and WebKit for browser-sensitive features.',
          'Capture traces on retry so failures are diagnosable.'
        ]
      },
      {
        heading: 'Accessibility',
        bullets: [
          'Use Angular CDK a11y helpers in components.',
          'Use strong Angular ESLint template rules.',
          'Use axe-core in Playwright for automated checks.'
        ]
      }
    ]
  },
  {
    id: 'deployment-guide',
    title: 'Deployment Guide',
    summary: 'How the app is built, checked, and published.',
    sections: [
      {
        heading: 'Recommended Hosting',
        bullets: [
          'Use OpenShift Container Platform as the enterprise runtime target.',
          'Use Docker Compose for local full-stack development before adding OpenShift manifests.',
          'Use GitHub Actions for this personal repository and EPLX as the corporate CI/CD reference model.',
          'Use environment-specific API base URLs and keep secrets out of the frontend bundle.'
        ]
      },
      {
        heading: 'Pipeline',
        bullets: [
          'Install with npm ci.',
          'Run lint, stylelint, format checks, architecture checks, dead-code checks, unit tests, build, Playwright, CodeQL, and npm audit.',
          'Deploy only after quality gates pass.',
          'Run OWASP ZAP baseline against the deployed URL where practical.'
        ]
      }
    ]
  },
  {
    id: 'troubleshooting-guide',
    title: 'Troubleshooting Guide',
    summary: 'Common fixes for local and CI issues.',
    sections: [
      {
        heading: 'Local Issues',
        bullets: [
          'If installs fail, confirm Node and npm versions first.',
          'If Angular tests behave differently than CI, remove local build cache and rerun npm ci.',
          'If Playwright cannot find browsers, run npx playwright install locally where downloads are allowed.'
        ]
      },
      {
        heading: 'CI Issues',
        bullets: [
          'Read the first failing quality gate; later failures often cascade from it.',
          'Use Playwright traces for browser test failures.',
          'Use GitHub Actions artifacts for screenshots, traces, and Lighthouse reports.'
        ]
      }
    ]
  },
  {
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
          'Use Spring Boot, SQL Server, Ping OIDC/OAuth, OpenShift, EPLX, and AppDynamics as the company-aligned full-stack target.'
        ]
      },
      {
        heading: 'Future Decisions To Add',
        bullets: [
          'Authentication and authorization provider.',
          'Logging and observability target.',
          'Internationalization strategy.',
          'Backend, database, background job, and scheduled job platform.',
          'Release management and governance model.'
        ]
      }
    ]
  },
  {
    id: 'onboarding-guide',
    title: 'Onboarding Guide',
    summary: 'A short path for new contributors to become productive.',
    sections: [
      {
        heading: 'First Day',
        bullets: [
          'Read Modern Tech Stack, Architecture Overview, Folder Structure Guide, and Coding Standards.',
          'Run npm install, npm run check, npm run build, and npm start.',
          'Open the documentation route and verify local navigation works.'
        ]
      },
      {
        heading: 'First Change',
        bullets: [
          'Create a feature branch.',
          'Make the smallest useful change.',
          'Add or update tests.',
          'Update docs or decision records when the change affects how the system should be built.'
        ]
      }
    ]
  },
  {
    id: 'accessibility-guide',
    title: 'Accessibility Guide',
    summary: 'How the app targets WCAG-friendly, keyboard-first Angular interfaces.',
    sections: [
      {
        heading: 'Baseline',
        bullets: [
          'Target WCAG 2.2 AA for product work.',
          'Use semantic HTML before ARIA.',
          'Use Angular CDK a11y tools for focus management, live announcements, focus traps, and keyboard-friendly components.',
          'Use Angular ESLint template accessibility rules as a required quality gate.',
          'Use axe-core in Playwright for route-level automated accessibility checks.'
        ]
      },
      {
        heading: 'Forms',
        bullets: [
          'Every form control needs a visible label or a clearly associated accessible name.',
          'Validation messages should be specific, visible, and associated with the field.',
          'Required, invalid, disabled, and loading states must be communicated visually and programmatically.'
        ]
      }
    ]
  },
  {
    id: 'error-handling-guide',
    title: 'Error Handling Guide',
    summary: 'How errors are captured, translated, logged, and shown to users.',
    sections: [
      {
        heading: 'Pattern',
        bullets: [
          'Use a global error handler for unexpected client errors.',
          'Use HTTP interceptors for request correlation and consistent API error mapping.',
          'Show user-safe messages in the UI and keep technical details in logs.',
          'Keep validation errors close to forms and workflow errors close to the action that failed.'
        ]
      }
    ]
  },
  {
    id: 'platform-guide',
    title: 'Platform Guide',
    summary: 'The company-aligned hosting, database, jobs, and backend direction.',
    sections: [
      {
        heading: 'Recommendation',
        bullets: [
          'Use Spring Boot for the backend API.',
          'Use SQL Server as the primary relational database.',
          'Use Ping OIDC/OAuth for authentication and authorization.',
          'Use OpenShift Container Platform as the enterprise runtime target.',
          'Use EPLX as the corporate CI/CD reference and GitHub Actions for this personal repository.',
          'Use AppDynamics as the enterprise observability target.'
        ]
      },
      {
        heading: 'Local And Personal Hosting',
        bullets: [
          'Use Docker Compose first for local Angular, Spring Boot, and SQL Server development.',
          'Use OpenShift-style manifests to mirror the corporate deployment model.',
          'Use Red Hat Developer Sandbox for the closest hosted OpenShift learning environment when available.',
          'Use Azure Container Apps or another container host only as a fallback public demo target.'
        ]
      },
      {
        heading: 'Documentation Storage',
        bullets: [
          'Use flat Markdown files as the source of truth while the docs are mostly developer/team documentation.',
          'Use the database for editable application content, user-authored content, permissions, review workflows, or versioned publishing.',
          'If docs move to the database later, keep Markdown as the content format and store front matter, category, route slug, version, status, and body in tables.'
        ]
      }
    ]
  },
  {
    id: 'security-guide',
    title: 'Security Guide',
    summary: 'Security practices for dependencies, APIs, auth, scans, and deployment gates.',
    sections: [
      {
        heading: 'Quality Gates',
        bullets: [
          'Run npm audit in CI.',
          'Run GitHub CodeQL for JavaScript and TypeScript.',
          'Use dependency review and update automation when available.',
          'Run OWASP ZAP against deployed environments when a stable URL exists.'
        ]
      }
    ]
  },
  {
    id: 'observability-guide',
    title: 'Observability Guide',
    summary: 'How logs, metrics, traces, and frontend errors should be collected.',
    sections: [
      {
        heading: 'Recommendation',
        bullets: [
          'Use an app logging service now so code has one logging API.',
          'Use AppDynamics as the enterprise observability target.',
          'Capture frontend errors, backend request failures, dependency failures, performance metrics, and release versions.'
        ]
      }
    ]
  },
  {
    id: 'release-management-guide',
    title: 'Release Management Guide',
    summary: 'How versions, changelogs, tags, and deployments should be handled.',
    sections: [
      {
        heading: 'Pattern',
        bullets: [
          'Use semantic versioning once the app has real releases.',
          'Use pull requests and required checks for all changes.',
          'Use GitHub releases and tags for production releases.',
          'Keep deployment history visible through GitHub Actions environments.'
        ]
      }
    ]
  },
  {
    id: 'governance-guide',
    title: 'Governance Guide',
    summary: 'How architectural decisions and project standards are controlled over time.',
    sections: [
      {
        heading: 'Governance Model',
        bullets: [
          'Use ADRs for architecture decisions.',
          'Use documentation pages for team standards and workflows.',
          'Use CI checks to enforce quality rules.',
          'Review dependency, hosting, auth, and database changes explicitly before implementation.'
        ]
      }
    ]
  }
];

export const defaultDocumentationArticleId = documentationArticles[0].id;

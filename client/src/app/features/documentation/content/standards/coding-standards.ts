import { type DocumentationArticle } from '../../documentation.model';

export const CodingStandardsArticle: DocumentationArticle = {
  id: 'coding-standards',
  title: 'Coding Standards',
  summary: 'Conventions that keep Angular code consistent and maintainable.',
  sections: [
    {
      heading: 'Angular',
      bullets: [
        'Prefer standalone components and route-level lazy loading.',
        'Prefer the inject function for dependency injection in new Angular code.',
        'Prefer signals for local reactive state.',
        'Do not use Angular class lifecycle hooks; prefer signals, computed state, effects, async pipe flows, render callbacks, or service-owned setup.',
        'Use typed reactive forms for complex forms.',
        'Keep components presentational unless they are routed pages.',
        'Keep API transport types out of templates.'
      ]
    },
    {
      heading: 'Node.js Server And Java Services',
      bullets: [
        'Use Node.js 24 LTS for server code and Java 25 LTS for optional domain services.',
        'Put browser-facing API routes and SQL Server-backed data access in the Node.js server by default.',
        'Keep SQL in repositories/query modules instead of Express route handlers.',
        'Design Spring Boot services around Clean Architecture, Domain-Driven Design, and 12-factor runtime configuration when a feature needs a separate Java service boundary.',
        'Use api, business, configuration, and integration boundaries for optional enterprise Java services.',
        'Keep controllers thin and put workflow logic in application services.',
        'Keep domain models separate from persistence entities when domain behavior grows beyond simple CRUD.',
        'Use DTOs for API request and response contracts rather than exposing persistence entities.',
        'Use Spring HTTP clients only for Java-owned outbound calls that remain inside optional Java services.',
        'Use Kafka for event-driven integration when asynchronous service decoupling is the right architecture.',
        'Use JUnit Jupiter, Mockito core, and Mockito JUnit Jupiter for backend unit tests.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'Use versioned migrations for SQL Server schema changes.',
        'Keep migration files, seed data, model notes, and local helpers in separate database folders.',
        'Review table ownership, permissions, retention, and audit needs before adding durable data structures.'
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
};

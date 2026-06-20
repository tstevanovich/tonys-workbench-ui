import { type DocumentationArticle } from '../../documentation.model';

export const LocalDevelopmentGuideArticle: DocumentationArticle = {
  id: 'local-development-guide',
  title: 'Local Development Guide',
  summary: 'Daily commands and development workflow for the full application.',
  sections: [
    {
      heading: 'Daily Workflow',
      bullets: [
        'Create a small branch per change and keep commits focused on one behavior or documentation update.',
        'Start only the parts of the stack needed for the change: web app, Node.js server, optional Java service, database, dependent services, or the full local environment.',
        'Update the in-app docs or decision records when the stack, architecture, workflow, deployment, or governance rules change.',
        'Run the relevant checks locally before pushing, then let GitHub Actions be the shared verification gate.'
      ]
    },
    {
      heading: 'Web App Commands',
      markdown: `
\`\`\`bash
npm run dev
npm start
npm run start:client
npm run dev:server
npm run test:unit
npm test
npm run test:e2e
npm run check
npm run build
npm run build:local
\`\`\`
`,
      bullets: [
        'Run these commands from the `tonys-workbench-ui` repository root.',
        'Use npm run dev to start the Node.js server and Angular dev server together on http://localhost:8080.',
        'Use npm start after npm run build to run the compiled Node.js server and built Angular app on http://localhost:8080.',
        'Use npm run start:client to run only the Angular dev server from `client/`.',
        'Use npm run dev:server to run only the Node.js server with the local Angular proxy configuration.',
        'Use npm test to run the server and client test suites.',
        'Use npm run test:unit for Vitest-based unit tests.',
        'Use npm run test:e2e for Playwright browser coverage.',
        'Use npm run check for linting, style linting, formatting, architecture, dead-code checks, and unit tests.',
        'Use npm run build to verify the production server and web bundles.',
        'Use npm run build:local when you need local-labeled build metadata in the footer.',
        'The client build pre-step writes footer build metadata with the package version, Git commit, and either local or prod as the environment.'
      ]
    },
    {
      heading: 'Node.js Server Commands',
      markdown: `
\`\`\`bash
npm --workspace server run build
npm --workspace server run test
npm --workspace server run check
\`\`\`
`,
      bullets: [
        'Use `server/` for Node.js server code in this repository.',
        'Run the Angular app through the Node.js server at http://localhost:8080 for same-origin local API testing.',
        'The root dev script starts Angular on an internal dev port, waits for that port, and has the Node.js server proxy page requests to it.',
        'Implement SQL Server-backed API behavior in the Node.js server unless a feature clearly needs an optional Java service boundary.'
      ]
    },
    {
      heading: 'Java Service Commands',
      markdown: `
\`\`\`bash
./gradlew bootRun
./gradlew test
./gradlew check
./gradlew build
\`\`\`
`,
      bullets: [
        'Use the sibling `tonys-workbench-services` repository for Java service development only when Java is the right durable service boundary.',
        'Use the Gradle Wrapper for Java services when a service module exists.',
        'Use bootRun for local Spring Boot startup.',
        'Use test for focused backend unit and integration tests.',
        'Use check or build before pushing backend changes.',
        'Use the service-specific JDK required by the Gradle wrapper and plugins when an existing service is not ready for the modern JDK baseline.'
      ]
    },
    {
      heading: 'Full Stack Environment',
      bullets: [
        'Use a local to prod release path for this repository; work-style dev, SIT, and UAT stages are useful references but are not modeled here.',
        'Use Docker Compose first for local databases, queues, caches, and supporting services when those pieces are added.',
        'Use the sibling `tonys-workbench-database` repository for SQL Server schema, Liquibase migrations, seed/reference data, and database docs.',
        'Keep local service configuration in example files or ignored developer overrides rather than committing secrets.',
        'Use migrations as the source of truth for database schema changes once migration tooling exists.',
        'Use local mocks, test containers, or sandbox services when a real integration is not appropriate for everyday development.'
      ]
    },
    {
      heading: 'Pre-Push Checklist',
      bullets: [
        'Run the narrow test command while developing, then run the broader check command before pushing.',
        'Verify generated API contracts or clients when Node.js server routes or optional backend endpoints change.',
        'Update documentation when development commands, required tools, environment variables, or architecture rules change.',
        'Do not commit local credentials, private repository tokens, machine-specific paths, generated build output, or temporary troubleshooting files.'
      ]
    }
  ]
};

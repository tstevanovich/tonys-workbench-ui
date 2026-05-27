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
        'Start only the parts of the stack needed for the change: web app, BFF, Java service, database, dependent services, or the full local environment.',
        'Update the in-app docs or decision records when the stack, architecture, workflow, deployment, or governance rules change.',
        'Run the relevant checks locally before pushing, then let GitHub Actions be the shared verification gate.'
      ]
    },
    {
      heading: 'Web App Commands',
      markdown: `
\`\`\`bash
npm start
npm run test:unit
npm run test:e2e
npm run check
npm run build
\`\`\`
`,
      bullets: [
        'Use npm start to run the Angular dev server.',
        'Use npm run test:unit for Vitest-based unit tests.',
        'Use npm run test:e2e for Playwright browser coverage.',
        'Use npm run check for linting, style linting, formatting, architecture, dead-code checks, and unit tests.',
        'Use npm run build to verify the production web bundle.'
      ]
    },
    {
      heading: 'BFF Commands',
      markdown: `
\`\`\`bash
npm run bff:start
npm run bff:test
npm run bff:check
\`\`\`
`,
      bullets: [
        'Add BFF scripts when the bff/ module exists.',
        'Run the Angular dev server against the BFF rather than directly against Java services.',
        'Use local proxy configuration only when the Angular dev server and BFF run on separate localhost ports.'
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
        'Use Docker Compose first for local databases, queues, caches, and supporting services when those pieces are added.',
        'Keep local service configuration in example files or ignored developer overrides rather than committing secrets.',
        'Use migrations as the source of truth for database schema changes once migration tooling exists.',
        'Use local mocks, test containers, or sandbox services when a real integration is not appropriate for everyday development.'
      ]
    },
    {
      heading: 'Pre-Push Checklist',
      bullets: [
        'Run the narrow test command while developing, then run the broader check command before pushing.',
        'Verify generated API contracts or clients when backend endpoints change.',
        'Update documentation when development commands, required tools, environment variables, or architecture rules change.',
        'Do not commit local credentials, private repository tokens, machine-specific paths, generated build output, or temporary troubleshooting files.'
      ]
    }
  ]
};

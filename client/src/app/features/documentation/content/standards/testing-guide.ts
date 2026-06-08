import { type DocumentationArticle } from '../../documentation.model';

export const TestingGuideArticle: DocumentationArticle = {
  id: 'testing-guide',
  title: 'Testing Guide',
  summary:
    'The testing approach for frontend, BFF, accessibility, browser, and Java service quality gates.',
  sections: [
    {
      heading: 'Commands',
      markdown: `
\`\`\`bash
npm run test:unit
npm run test:a11y
npm run test:e2e
npm run test:e2e:ui
npm run check
npm --workspace server run test
npm --workspace server run check

./gradlew test
./gradlew check
./gradlew jacocoTestReport
./gradlew pitest
\`\`\`
`,
      bullets: [
        'Use npm run test:unit for the fast Angular and Vitest unit-test suite.',
        'Use npm run test:a11y for the dedicated Playwright axe-core accessibility suite.',
        'Use npm run test:e2e for browser flow coverage.',
        'Use npm run test:e2e:ui when debugging browser tests interactively.',
        'Use npm run check before pushing because it runs the standard local frontend quality gate.',
        'Use server workspace test and check scripts once the Node.js BFF module is implemented.',
        'Use ./gradlew test in `tonys-workbench-services` for backend unit, slice, and integration tests when a Java service exists.',
        'Use ./gradlew check for the Java service quality gate in the services repository.',
        'Use ./gradlew jacocoTestReport for Java coverage reporting when JaCoCo is configured.',
        'Use ./gradlew pitest for Java mutation testing when PIT is configured.'
      ]
    },
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
    },
    {
      heading: 'Backend For Frontend',
      bullets: [
        'Use TypeScript unit tests for BFF route handlers, middleware, schemas, and service clients.',
        'Use route-level tests for request validation, auth/session behavior, error mapping, and downstream service failures.',
        'Use contract tests or generated clients to keep BFF routes aligned with Java service APIs.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Use JUnit Jupiter for Java unit tests.',
        'Use Mockito core and Mockito JUnit Jupiter for mocks and JUnit 5 extension integration.',
        'Use Spring Boot Test for application context tests, slice tests, and integration-style Java service tests.',
        'Use Karate for API, smoke, and BDD-style Java service tests.',
        'Emit Cucumber-compatible JSON from Karate when CI, reporting, or test-management tooling needs that format.',
        'Use JaCoCo for Java code coverage and PIT for mutation testing.'
      ]
    }
  ]
};

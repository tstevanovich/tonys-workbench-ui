import { type DocumentationArticle } from '../../documentation.model';

export const TestingGuideArticle: DocumentationArticle = {
  id: 'testing-guide',
  title: 'Testing Guide',
  summary: 'The testing approach for frontend, accessibility, browser, and backend quality gates.',
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
        'Use ./gradlew test for backend unit, slice, and integration tests when a Java service exists.',
        'Use ./gradlew check for the backend quality gate.',
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
      heading: 'Back End',
      bullets: [
        'Use JUnit Jupiter for Java unit tests.',
        'Use Mockito core and Mockito JUnit Jupiter for mocks and JUnit 5 extension integration.',
        'Use Spring Boot Test for application context tests, slice tests, and integration-style backend tests.',
        'Use Karate for API, smoke, and BDD-style backend tests.',
        'Emit Cucumber-compatible JSON from Karate when CI, reporting, or test-management tooling needs that format.',
        'Use JaCoCo for Java code coverage and PIT for mutation testing.'
      ]
    }
  ]
};

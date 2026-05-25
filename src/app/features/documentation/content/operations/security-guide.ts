import { type DocumentationArticle } from '../../documentation.model';

export const SecurityGuideArticle: DocumentationArticle = {
  id: 'security-guide',
  title: 'Security Guide',
  summary: 'Security practices for dependencies, APIs, auth, scans, and deployment gates.',
  sections: [
    {
      heading: 'Commands',
      markdown: `
\`\`\`bash
npm run security:audit
npm run check:ci

./gradlew check
\`\`\`
`,
      bullets: [
        'Use npm run security:audit for local npm dependency audit checks.',
        'Use npm run check:ci for the web app local quality gate plus dependency audit.',
        'Use Gradle check for backend tests, static checks, and dependency checks when a Java service exists.'
      ]
    },
    {
      heading: 'Quality Gates',
      bullets: [
        'Run npm audit in CI.',
        'Run GitHub CodeQL for JavaScript, TypeScript, and Java where those languages exist.',
        'Run SAST scanning as part of the pipeline for frontend and backend code.',
        'Run SonarQube or equivalent code quality scanning for maintainability, reliability, and security findings.',
        'Use dependency review and update automation when available.',
        'Run container image scanning once container images are built.',
        'Run OWASP ZAP against deployed environments when a stable URL exists.'
      ]
    },
    {
      heading: 'Secrets And Configuration',
      bullets: [
        'Keep package repository credentials, tokens, passwords, keystores, and certificates out of the repository.',
        'Use ignored local files, user-level Gradle properties, environment variables, secret stores, or platform-mounted secrets for sensitive values.',
        'Keep frontend bundles free of secrets, privileged decisions, and private integration credentials.',
        'Document required configuration names without documenting real secret values.'
      ]
    },
    {
      heading: 'Auth And Transport',
      bullets: [
        'Use OIDC/OAuth for authentication and authorization flows.',
        'Enforce authorization on the backend even when the frontend hides unauthorized UI.',
        'Use managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.',
        'Mask sensitive request, response, token, identity, and certificate details in logs.'
      ]
    }
  ]
};

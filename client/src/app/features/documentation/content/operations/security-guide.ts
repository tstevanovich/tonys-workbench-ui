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
npm --workspace server run check

./gradlew check
\`\`\`
`,
      bullets: [
        'Use npm run security:audit for local npm dependency audit checks.',
        'Use npm run check:ci for the web app local quality gate plus dependency audit.',
        'Use the server workspace check script for Node.js route, validation, and dependency checks when the BFF exists.',
        'Use Gradle check in `tonys-workbench-services` for Java service tests, static checks, and dependency checks when a Java service exists.'
      ]
    },
    {
      heading: 'Quality Gates',
      bullets: [
        'Run npm audit in CI.',
        'Run GitHub CodeQL for JavaScript, TypeScript, and Java where those languages exist.',
        'Run SAST scanning as part of the pipeline for frontend, BFF, and Java service code.',
        'Run SonarQube or equivalent code quality scanning for maintainability, reliability, and security findings.',
        'Use dependency review and update automation when available.',
        'Run container image scanning once container images are built.',
        'Run OWASP ZAP against deployed environments when a stable URL exists.',
        'Configure the `PUBLIC_APP_URL` GitHub repository variable before enabling scheduled ZAP scans for a deployed environment.'
      ]
    },
    {
      heading: 'Secrets And Configuration',
      bullets: [
        'Keep package repository credentials, tokens, passwords, keystores, and certificates out of the repository.',
        'Use ignored local files, user-level Gradle properties, environment variables, secret stores, or platform-mounted secrets for sensitive values.',
        'Keep frontend bundles free of secrets, privileged decisions, and private integration credentials.',
        'Keep browser tokens and service-to-service credentials out of Angular; place token mediation and downstream auth in the BFF or server-side layers.',
        'Document required configuration names without documenting real secret values.'
      ]
    },
    {
      heading: 'Auth And Transport',
      bullets: [
        'Use OIDC/OAuth for authentication and authorization flows.',
        'Use the BFF to keep OAuth token handling server-side for browser applications where that pattern is available.',
        'Enforce authorization in Java services even when the frontend hides unauthorized UI and the BFF performs request mediation.',
        'Use managed keystore and truststore resolution for outbound mTLS, Kafka TLS, and certificate-secured integrations.',
        'Mask sensitive request, response, token, identity, and certificate details in logs.'
      ]
    }
  ]
};

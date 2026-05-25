import { type DocumentationArticle } from '../../documentation.model';

export const DeploymentGuideArticle: DocumentationArticle = {
  id: 'deployment-guide',
  title: 'Deployment Guide',
  summary: 'How the application is built, checked, packaged, and promoted.',
  sections: [
    {
      heading: 'Recommended Hosting',
      bullets: [
        'Use OpenShift Container Platform as the enterprise runtime target.',
        'Use Docker Compose for local full-stack development before adding OpenShift manifests.',
        'Use GitHub Actions for this personal repository and allow workflows to hand off to deployment orchestration when environments require it.',
        'Use environment-specific API base URLs and keep secrets out of the frontend bundle.'
      ]
    },
    {
      heading: 'Local Verification Commands',
      markdown: `
\`\`\`bash
npm ci
npm run check
npm run test:a11y
npm run test:e2e
npm run build

./gradlew check
./gradlew build
\`\`\`
`,
      bullets: [
        'Use npm commands for the web app.',
        'Use Gradle Wrapper commands for backend services when they exist.',
        'Run the narrow command while developing and the broader verification command before pushing.'
      ]
    },
    {
      heading: 'Pipeline',
      bullets: [
        'Install with npm ci.',
        'Run lint, stylelint, format checks, architecture checks, dead-code checks, unit tests, accessibility checks, build, Playwright, CodeQL, and npm audit for the web app.',
        'Run Gradle check, backend unit tests, Java CodeQL, dependency scans, and container build checks once the backend exists.',
        'Run database migration validation once migration tooling exists.',
        'Run Helm template or chart validation once deployment charts exist.',
        'Deploy only after quality gates pass.',
        'Run OWASP ZAP baseline against the deployed URL where practical.'
      ]
    },
    {
      heading: 'Promotion Rules',
      bullets: [
        'Treat GitHub Actions as the source of build verification for this repository.',
        'Allow workflows to hand off to deployment orchestration when promoted environments require approvals, change records, or environment-specific gates.',
        'Keep deployment manifests, Helm values, and environment configuration reviewable as code.',
        'Do not promote builds with failed quality, security, accessibility, migration, or container checks.'
      ]
    }
  ]
};

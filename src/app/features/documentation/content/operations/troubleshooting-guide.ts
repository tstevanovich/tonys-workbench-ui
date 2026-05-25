import { type DocumentationArticle } from '../../documentation.model';

export const TroubleshootingGuideArticle: DocumentationArticle = {
  id: 'troubleshooting-guide',
  title: 'Troubleshooting Guide',
  summary: 'Common fixes for local and CI issues.',
  sections: [
    {
      heading: 'Web App Issues',
      bullets: [
        'If installs fail, confirm Node and npm versions first.',
        'If Angular tests behave differently than CI, remove local build cache and rerun npm ci.',
        'If Playwright cannot find browsers, run npx playwright install locally where downloads are allowed.',
        'If accessibility tests fail, inspect the generated Playwright report and verify the failing element name, role, state, and contrast.'
      ]
    },
    {
      heading: 'Java And Gradle Issues',
      bullets: [
        'If Gradle fails with an unsupported class file major version, run the service with a JDK supported by that Gradle wrapper and plugin set.',
        'If Gradle cannot download dependencies from a private Maven-compatible repository, confirm user-level Gradle credentials and the repository names expected by settings.gradle.',
        'If Java commands disagree, check java -version, javac -version, JAVA_HOME, and the first Java entry in PATH.',
        'If a backend service is not ready for the modern JDK baseline, use the service-required JDK until its Gradle wrapper and plugins are upgraded.'
      ]
    },
    {
      heading: 'CI Issues',
      bullets: [
        'Read the first failing quality gate; later failures often cascade from it.',
        'Use Playwright traces for browser test failures.',
        'Use GitHub Actions artifacts for screenshots, traces, accessibility reports, and build logs.',
        'Check whether the failing job is a code issue, dependency download issue, environment secret issue, scan finding, or deployment promotion issue.'
      ]
    },
    {
      heading: 'Deployment Issues',
      bullets: [
        'If a container starts locally but fails in the platform, compare environment variables, mounted secrets, health endpoints, and startup command.',
        'If health checks fail, verify liveness and readiness endpoints before investigating routing.',
        'If outbound mTLS or Kafka TLS fails, verify keystore source, truststore source, certificate expiration, and environment-specific secret mounting.',
        'If an environment promotion fails, inspect the deployment workflow logs before rerunning the pipeline.'
      ]
    }
  ]
};

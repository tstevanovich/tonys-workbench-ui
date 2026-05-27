import { type DocumentationArticle } from '../../documentation.model';

export const ObservabilityGuideArticle: DocumentationArticle = {
  id: 'observability-guide',
  title: 'Observability Guide',
  summary: 'How logs, metrics, traces, and frontend errors should be collected.',
  sections: [
    {
      heading: 'Signals',
      bullets: [
        'Capture logs, metrics, traces, frontend errors, BFF request failures, Java service failures, dependency failures, performance timings, release versions, and deployment environment.',
        'Attach correlation IDs or trace IDs to BFF logs, Java service logs, and outbound integration calls.',
        'Preserve enough context to debug failures without logging secrets, tokens, identity documents, certificates, or sensitive payloads.'
      ]
    },
    {
      heading: 'Frontend',
      bullets: [
        'Use an app logging service in the web app so code has one logging API.',
        'Capture client-side errors, route context, failed API calls, user-visible failure states, and build version.',
        'Keep frontend observability lightweight until a real browser monitoring target is selected.'
      ]
    },
    {
      heading: 'Backend For Frontend',
      bullets: [
        'Use structured request logging for BFF routes, response status, latency, user/session context, correlation IDs, and downstream dependencies.',
        'Capture BFF validation failures, auth/session failures, downstream Java service failures, timeout behavior, and safe error mappings.',
        'Use OpenTelemetry-compatible instrumentation for BFF traces and metrics when the platform supports it.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Use structured Logback logging with masking rules for Java services.',
        'Use Elastic-compatible observability for Java service logs and diagnostics.',
        'Use OpenTelemetry-compatible instrumentation for portable backend traces, metrics, and logs.',
        'Use Java APM agent instrumentation where the runtime platform requires application performance monitoring.',
        'Record dependency health for SQL Server, Kafka, outbound HTTP integrations, cache clients, and certificate-backed connections.'
      ]
    },
    {
      heading: 'Operations',
      bullets: [
        'Define dashboards around user impact, request latency, error rate, dependency health, and deployment version.',
        'Define alerts for failed deployments, sustained error spikes, availability loss, queue lag, and certificate expiration.',
        'Keep database observability a separate decision until the database platform and operations tooling are confirmed.'
      ]
    }
  ]
};

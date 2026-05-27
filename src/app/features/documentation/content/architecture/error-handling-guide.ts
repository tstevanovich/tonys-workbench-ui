import { type DocumentationArticle } from '../../documentation.model';

export const ErrorHandlingGuideArticle: DocumentationArticle = {
  id: 'error-handling-guide',
  title: 'Error Handling Guide',
  summary:
    'How frontend, BFF, Java service, and database errors are captured, translated, and surfaced.',
  sections: [
    {
      heading: 'Front End',
      bullets: [
        'Use a global error handler for unexpected client errors.',
        'Use HTTP interceptors for request correlation and consistent BFF API error mapping.',
        'Show user-safe messages in the UI and keep technical details in logs.',
        'Keep validation errors close to forms and workflow errors close to the action that failed.'
      ]
    },
    {
      heading: 'Backend For Frontend',
      bullets: [
        'Translate downstream Java service errors into browser-safe responses with stable error codes and correlation IDs.',
        'Do not expose downstream stack traces, token details, private service URLs, SQL details, secrets, or raw dependency messages to the browser.',
        'Log BFF request context, user/session context, route, downstream dependency, and correlation ID without logging sensitive payloads.'
      ]
    },
    {
      heading: 'Java Services',
      bullets: [
        'Use structured exception handling to translate technical failures into consistent API error responses.',
        'Log technical details on the server with correlation IDs, request context, and safe diagnostic data.',
        'Do not expose stack traces, SQL details, secrets, or private dependency messages to clients.',
        'Separate validation errors, authorization failures, not-found cases, dependency failures, and unexpected server errors.'
      ]
    },
    {
      heading: 'Database',
      bullets: [
        'Treat constraint violations, optimistic locking failures, timeout errors, and connectivity errors as distinct failure types.',
        'Map database failures to backend errors that users and support flows can understand.',
        'Use transactions so partial writes do not leave durable data in confusing states.',
        'Log enough database context to diagnose failures without logging sensitive data.'
      ]
    },
    {
      heading: 'Observability',
      bullets: [
        'Carry correlation IDs across frontend, BFF, Java services, logs, API responses, and background work.',
        'Capture frontend errors, BFF request failures, Java service failures, dependency failures, database failures, performance metrics, and release versions.',
        'Use Java APM agent instrumentation when the runtime platform requires application performance monitoring.'
      ]
    }
  ]
};

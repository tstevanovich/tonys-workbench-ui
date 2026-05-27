# 0005 Node.js BFF For Angular And Java

## Status

Accepted

## Context

The previous target model allowed Angular services to call backend Java APIs directly. Enterprise web applications often benefit from a Backend-for-Frontend layer between browser code and domain services. A BFF can keep service URLs, token handling, client credentials, mTLS details, private headers, and UI-specific response shaping out of the browser.

## Decision

Use a Node.js Backend-for-Frontend layer for Angular web applications that need server-side web-edge behavior:

- Angular services call same-origin `/api/...` endpoints exposed by the Node.js BFF.
- The Node.js BFF owns browser-facing API routes, session-aware request handling, token mediation, response shaping, request validation, error mapping, and calls to downstream services.
- Java 25 LTS Spring Boot services remain the domain and system-of-record services for business use cases, transactions, persistence, integrations, events, background work, and durable authorization enforcement.
- The BFF should be TypeScript-first, run on the current Node.js LTS line, and use Express or another approved Node HTTP framework when a server module is added.
- The BFF must not become a blind proxy for every Java endpoint. It should exist where it improves browser security, API ergonomics, or frontend-specific aggregation.
- OpenAPI contracts should describe browser-facing BFF APIs and service-facing Java APIs separately when their shapes differ.

## Consequences

The architecture gains another deployable runtime and another dependency surface, so the BFF needs its own tests, dependency scanning, logging, health checks, and observability. The payoff is a cleaner browser boundary, less CORS and token exposure, and a better place for frontend-specific API composition. This repository should document the BFF pattern now, but should not add Express dependencies until an actual BFF module is implemented.

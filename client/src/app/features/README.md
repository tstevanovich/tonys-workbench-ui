# Features

Each feature folder owns one product capability.

Start each feature with the files and folders it actually needs. As a feature grows, prefer names that describe the feature capability first and the technical role second.

Common feature-owned folders include:

- `feature.routes.ts`
- route/page components
- supporting feature components
- `data-access` for feature-specific API/query code
- `state` for feature workflow state
- `schemas` for feature validation contracts
- `models` for feature-owned types

Features should communicate through routing, shared abstractions, core services, or explicit API contracts.

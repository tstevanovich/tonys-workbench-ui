# Core

Singleton application infrastructure belongs here. Create subfolders only when the app has real app-wide code for that concern.

- `api`: HTTP configuration, generated OpenAPI clients, interceptors, request utilities.
- `auth`: authentication, authorization, route guards, identity services.
- `errors`: global error handling and user-safe error mapping.
- `logging`: client logging, telemetry, and observability adapters.

Feature code should not be placed in `core`.

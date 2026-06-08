# Shared

Reusable code with no feature dependency belongs here. Promote code to `shared` only after at least two features need it or the code is clearly platform-level UI/infrastructure.

- `ui`: standalone presentational components.
- `forms`: form controls, validators, and validation-message helpers.
- `a11y`: accessibility helpers and CDK a11y wrappers.
- `testing`: test builders, render helpers, and reusable mocks.

Shared code must not import from `features`.

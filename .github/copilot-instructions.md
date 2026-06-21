# GitHub Copilot Instructions

## Working Tree

- Review the current working-tree contents, including staged and unstaged edits.
- Do not ignore local diffs unless explicitly asked to review only committed code.
- Treat files as they exist on disk as the source of truth.
- Review the full current file, not only the committed baseline and not only the diff.
- Preserve unrelated local work unless explicitly asked to revert it.

## Angular Review And Validation

For Angular component, directive, pipe, service, route, store, and test work:

- Prefer current Angular best practices and the existing project patterns.
- Prefer existing local abstractions and conventions over new abstractions.
- Keep changes narrowly scoped to the requested file and directly related files.
- Validate touched TypeScript and HTML files with the available linting and diagnostics tools.
- If local MCP tools are available, use Angular MCP for project discovery and best practices, ESLint MCP for lint validation, and VS Code diagnostics MCP for editor diagnostics.
- Fix issues caused by the edit and rerun the relevant checks.

## Documentation Updates

For every non-trivial code change, check whether `/docs` and `client/src/app/features/documentation` need updates.

- If the change affects architecture, standards, workflows, setup, validation, dependencies, user-facing behavior, or implementation guidance, update the relevant docs in the same change.
- If the change affects both repo documentation and in-app documentation, update both `/docs` and `client/src/app/features/documentation`.
- If docs are intentionally not changed, state why in the final response.

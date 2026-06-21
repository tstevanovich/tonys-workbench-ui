# AGENTS.md

## Working Tree

- Review the current working-tree contents, including staged and unstaged edits.
- Do not ignore local diffs unless the user explicitly asks to review only committed code.
- Treat files as they exist on disk as the source of truth.
- Review the full current file, not only the committed baseline and not only the diff.
- Preserve unrelated local work unless the user explicitly asks to revert it.

## Angular Review And Validation

For Angular component, directive, pipe, service, route, store, and test work:

- Use Angular MCP `list_projects` before Angular-specific analysis or edits.
- Use Angular MCP `get_best_practices` with the workspace path from `list_projects`.
- If `get_best_practices` is unavailable, use the Angular MCP best-practices resource fallback.
- Prefer existing project patterns over new abstractions.
- Validate touched TS and HTML files with ESLint MCP.
- Check VS Code diagnostics MCP `get_errors` and `get_warnings` after edits.
- Fix issues caused by the edit and rerun the relevant checks.

## Documentation Updates

For every non-trivial code change, check whether `/docs` and `client/src/app/features/documentation` need updates.

- If the change affects architecture, standards, workflows, setup, validation, dependencies, user-facing behavior, or implementation guidance, update the relevant docs in the same change.
- If the change affects both repo documentation and in-app documentation, update both `/docs` and `client/src/app/features/documentation`.
- If docs are intentionally not changed, state why in the final response.

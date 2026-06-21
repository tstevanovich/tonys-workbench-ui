---
name: angular-review-validate
description: Review and edit Angular components, services, directives, pipes, routes, stores, tests, or the active open Angular file using Angular MCP best practices, then validate with ESLint MCP and VS Code diagnostics MCP. Use when the user asks to review, edit, clean up, modernize, or validate an Angular file, component, service, or current working-tree code.
---

# Angular Review Validate

## Overview

Review the target Angular file as it exists in the working tree, including staged and unstaged edits. Apply only needed changes, then validate through the configured MCP servers.

## Workflow

1. Identify the target from the user's wording.
   - "open file", "active file", or "file in context" means the IDE active file.
   - If several files are plausible, choose the active file unless the user names a different one.
2. Use Angular MCP `list_projects`.
3. Use Angular MCP `get_best_practices` with the workspace path from `list_projects`.
   - If the tool fails, use the Angular MCP best-practices resource fallback.
4. Read the current file from disk and treat it as the source of truth.
   - Include staged and unstaged edits.
   - Do not ignore local diffs.
   - Review the full current file, not only committed code and not only the diff.
5. Read directly related files only as needed.
   - For components: TS, HTML, SCSS, spec if present, and immediate imports.
   - For services: TS, spec if present, and consumers only when behavior is unclear.
6. Apply narrowly scoped edits when needed.
   - Preserve existing intent and unrelated local work.
   - Prefer existing project patterns over new abstractions.
   - Avoid unrelated refactors.
7. Validate touched TS and HTML files with ESLint MCP.
8. Check VS Code diagnostics MCP `get_errors`.
   - Also check `get_warnings` when the edit affects templates, styling, types, imports, or broader project behavior.
9. Fix issues caused by the edit and rerun the relevant MCP checks.
10. Summarize the change and exact validation results.

## Review Focus

- Use Angular MCP best practices as the source of truth for Angular conventions.
- Prefer existing local project patterns where they do not conflict with Angular MCP guidance.
- Keep edits scoped to the requested file and directly related files.
- Treat accessibility, template correctness, typing, and validation diagnostics as part of the review.

## Output

- Lead with what changed.
- Include exact MCP validation results.
- Mention any checks that could not run.
- Call out pre-existing unrelated dirty files only when they affect the requested work.

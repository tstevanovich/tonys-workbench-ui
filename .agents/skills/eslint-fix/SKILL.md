---
name: eslint-fix
description: Inspect and fix ESLint MCP issues for the active or requested file. Use when Codex is asked to run ESLint MCP on the open file, fix reported ESLint errors or warnings, rerun ESLint MCP, and report the exact clean result or remaining issues.
---

# ESLint Fix

## Workflow

1. Identify the target file.
   - "open file", "active file", or "current file" means the IDE active file.
   - If the user names a path, use that path instead.
2. Read the full target file from disk and treat it as the source of truth.
   - Include staged and unstaged edits.
   - Preserve unrelated local work.
3. Call ESLint MCP `lint_files` with the target file's absolute path.
4. If ESLint MCP reports no errors or warnings for the target file, say so and stop.
5. Fix only the ESLint MCP-reported issues for the target file.
   - Prefer applying safe autofix-equivalent edits when the reported fix is clear.
   - Do not make broad refactors or style changes that ESLint did not ask for.
   - Do not edit unrelated files unless the lint issue cannot be fixed from the target file alone.
6. Rerun ESLint MCP `lint_files` on the target file.
7. Repeat only for remaining ESLint errors or warnings on the target file.
8. Summarize:
   - The original ESLint MCP issues.
   - The files changed.
   - The final ESLint MCP result.

## Guardrails

- Use ESLint MCP as the source of truth for this skill.
- Do not run framework-specific MCP workflows unless the user explicitly asks.
- Do not run test, build, formatter, or VS Code diagnostics checks unless the user explicitly asks.
- If ESLint MCP cannot lint the file, report the exact MCP result and do not invent a fallback check.

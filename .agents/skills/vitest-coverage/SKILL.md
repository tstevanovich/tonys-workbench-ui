---
name: vitest-coverage
description: Create or update Vitest coverage for the active or requested source file in any package. Use when Codex is asked to check whether a source file has an associated Vitest spec, create a missing `.spec.ts` or `.test.ts` file, update an existing spec, run ESLint MCP and VS Code diagnostics after edits, run the focused Vitest coverage test, and prove 100% statement, branch, function, and line coverage for that source file.
---

# Vitest Coverage

## Scope

Use this skill for source files tested by Vitest in any package, including client, server, shared, tools, or future workspace folders. Treat files on disk, including staged and unstaged edits, as the source of truth.

## Workflow

1. Identify the target source file.
   - "open file", "active file", or "file in context" means the IDE active file.
   - Do not target `.spec.ts` or `.test.ts` files as the source under test unless the user explicitly asks to review a test file.
2. Run the helper from the repo root:

   ```powershell
   node .agents/skills/vitest-coverage/scripts/target-info.mjs <path-to-source-file>
   ```

3. Read the full source file.
4. If the helper reports no associated test file, create `<source-basename>.spec.ts` beside the source file.
   - Prefer the existing local test style.
   - Keep tests focused on observable behavior, public API, outputs, dependency interactions, and error branches.
5. If an associated test file exists, update it instead of creating a second test file.
6. After each edit cycle, run ESLint MCP on every touched file ESLint can lint.
7. After each edit cycle, run VS Code diagnostics MCP `get_errors` and `get_warnings`, then fix diagnostics for touched files.
8. Only after ESLint MCP and VS Code diagnostics are clean for touched files, run the focused test command from the helper.
   - If coverage fails because `@vitest/coverage-v8` is missing, install it as a dev dependency with `npm.cmd install --save-dev @vitest/coverage-v8`, then rerun.
   - Do not use watch mode.
9. Prove 100% coverage for only the target source file.
   - Run with coverage enabled and a JSON summary reporter.
   - Verify the result from the repo root:

     ```powershell
     node .agents/skills/vitest-coverage/scripts/verify-coverage.mjs <path-to-source-file>
     ```

   - Confirm `statements`, `branches`, `functions`, and `lines` are all `100` for the target file entry.
   - If any metric is below 100, add meaningful tests for the missed behavior and rerun.

10. Summarize the created/updated spec, the ESLint MCP result, the VS Code diagnostics result, the exact focused test command, and the exact coverage percentages for the target file.

## Associated Test File Rules

- Prefer an existing sibling `<basename>.spec.ts` or `<basename>.test.ts`.
- If neither exists, create `<basename>.spec.ts` beside the source file.
- Do not create broad parent-level test files for one source file.
- Do not lower global or project coverage thresholds to make the focused run pass.

## Focused Test Command Shape

Use the helper output first. The command depends on the package containing the source file.

For packages whose test command accepts include-style flags, the expected shape is:

```powershell
npm.cmd run test:unit -- --include=<spec-relative-to-package> --coverage --coverage-include=<source-relative-to-package> --coverage-reporters=json-summary --watch=false
```

For direct Vitest packages, the expected shape is:

```powershell
npm.cmd run test -- <spec-relative-to-package> --coverage --coverage.include=<source-relative-to-package> --coverage.reporter=json-summary --watch=false
```

For human-readable debugging output, temporarily add `--coverage-reporters=text-summary`, but keep `json-summary` for the final proof.

## Coverage Proof

Use `coverage/coverage-summary.json` from the package directory reported by the helper. The target file may be keyed by an absolute path or a package-relative path. Match by normalized path suffix if needed.

Use the verifier script for the final check:

```powershell
node .agents/skills/vitest-coverage/scripts/verify-coverage.mjs <path-to-source-file>
```

Final coverage proof must include the four metrics:

```text
statements: 100
branches: 100
functions: 100
lines: 100
```

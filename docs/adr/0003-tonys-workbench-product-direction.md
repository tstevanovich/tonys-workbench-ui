# 0003 Tony's Workbench Product Direction

## Status

Accepted

## Context

The project started as an AI agent app, but the product direction expanded into a multipurpose personal workspace. It needs to support living documentation, planning, AI-assisted creative work, code assistance, side projects, career material, and tool integrations.

## Decision

Rename the application from `ai-agent` to `Tony's Workbench`.

Use `tonys-workbench-ui` as the UI repository name for the Angular client and Node.js server. Use sibling repositories for optional Java services and database assets.

Use **Tony's Workbench** as the display name.

Organize the first-level navigation around durable workspace areas:

- Home
- Documentation
- Planner
- AI Studio
- Code Lab
- Projects
- Integrations
- Career
- Settings

## Consequences

AI remains a major capability, but it is not the whole product identity. The app can grow into a personal operating workspace while keeping clear route boundaries for documentation, planning, AI workflows, code generation, creative production, integrations, and recruiter-facing content. The product name can remain Tony's Workbench while repository names describe layer ownership.

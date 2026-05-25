import { type DocumentationArticle } from '../../documentation.model';

export const McpGuideArticle: DocumentationArticle = {
  id: 'mcp-guide',
  title: 'MCP Guide',
  summary: 'How MCP servers are configured for VS Code, Copilot, Codex, and future tools.',
  sections: [
    {
      heading: 'What MCP Is For',
      bullets: [
        'Use Model Context Protocol servers to give AI assistants structured access to approved tool capabilities.',
        'Prefer official or enterprise-managed MCP servers before writing custom servers.',
        'Treat MCP as editor and agent tooling, not application runtime code.'
      ]
    },
    {
      heading: 'Angular MCP',
      bullets: [
        'Use the Angular CLI MCP server for Angular documentation lookup, best practices, workspace discovery, and Angular-aware modernization guidance.',
        'Keep the Angular MCP server because it is maintained with Angular CLI and follows the current Angular release train.',
        'Add other MCP servers beside it for Java, platform, security, database, or enterprise developer-experience workflows when those servers are available.'
      ]
    },
    {
      heading: 'VS Code And Copilot Setup',
      markdown: `
Workspace MCP servers live in \`.vscode/mcp.json\`.

\`\`\`jsonc
{
  "servers": {
    "angular-cli": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@angular/cli", "mcp"]
    }
  }
}
\`\`\`

Workspace VS Code settings should allow configured MCP servers to start automatically when needed.

\`\`\`jsonc
{
  "chat.mcp.autostart": "newAndOutdated"
}
\`\`\`

Use \`MCP: List Servers\` from the Command Palette to start, stop, restart, or inspect configured servers.
`
    },
    {
      heading: 'Codex Setup',
      markdown: `
Codex has its own MCP registry and does not automatically read \`.vscode/mcp.json\`.

\`\`\`bash
codex mcp list
codex mcp add angular-cli -- npx.cmd -y @angular/cli mcp
codex mcp get angular-cli
\`\`\`

Restart the Codex session after adding a server so the available tools are loaded into the chat.
`
    },
    {
      heading: 'Using MCP In Prompts',
      bullets: [
        'Once a server is connected, the agent can choose the relevant MCP tools when the task calls for them.',
        'For important framework questions, explicitly ask the agent to use Angular MCP or the relevant enterprise MCP server before making changes.',
        'Use explicit prompts when the source of truth matters, such as checking current Angular best practices or using a private developer-experience workflow.'
      ]
    },
    {
      heading: 'Prompt Examples',
      markdown: `
Use review-only prompts when you want guidance before code changes.

\`\`\`text
Use Angular MCP to review src/app/app-shell/header/app-shell-header.html and
src/app/app-shell/header/app-shell-header.ts. Tell me whether this follows modern
Angular and Angular Material patterns. Do not edit anything yet.
\`\`\`

\`\`\`text
Use Angular MCP to review src/app/app.routes.ts for lazy loading, route organization,
and current Angular routing best practices. Give recommendations only.
\`\`\`

Use implementation prompts when you are ready for the agent to make a focused change.

\`\`\`text
Use Angular MCP to improve the accessibility semantics of the theme menu selection
state. Keep the current Material menu UI and visual design. Edit the code and run
the relevant checks.
\`\`\`

\`\`\`text
Use Angular MCP to modernize this component to Angular 21 patterns. Keep the public
behavior the same, prefer signal inputs and outputs, use built-in control flow, and
run checks after editing.
\`\`\`

Use target-specific prompts when a different MCP server is responsible for the source of truth.

\`\`\`text
Use the configured Java MCP server to review this Spring Boot service for current
Java LTS, Spring Boot, validation, logging, and testing practices. Do not edit yet.
\`\`\`

\`\`\`text
Use the configured platform MCP server to inspect the deployment workflow and explain
which checks run before promotion. Keep private names and secrets out of the answer.
\`\`\`
`
    },
    {
      heading: 'Enterprise MCP Servers',
      bullets: [
        'If an organization provides MCP commands or slash-command workflows, capture the command, required environment variables, authentication steps, and allowed actions before adding them to shared docs.',
        'Do not commit secrets, tokens, private hostnames, or organization-specific names to public repository config.',
        'For private workflows, document the pattern generically in this playbook and keep exact private setup in user-level or private workspace configuration.'
      ]
    },
    {
      heading: 'When To Add A Custom MCP Server',
      bullets: [
        'Create a custom MCP server only when an important workflow has no maintained public or enterprise-managed server.',
        'Keep custom servers narrow: expose a small set of safe, reviewable actions instead of broad shell access.',
        'Prefer read-only tools first, then add write tools only when the workflow and approval model are clear.'
      ]
    }
  ]
};

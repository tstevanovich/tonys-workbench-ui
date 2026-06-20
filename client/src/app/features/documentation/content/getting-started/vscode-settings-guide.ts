import { type DocumentationArticle } from '../../documentation.model';

export const VscodeSettingsGuideArticle: DocumentationArticle = {
  id: 'vscode-settings-guide',
  title: 'VS Code Settings Guide',
  summary:
    'Recommended workspace settings for Angular, Node.js server, documentation, and workflow files.',
  sections: [
    {
      heading: 'Source Of Truth',
      bullets: [
        'Use .vscode/settings.json as the workspace source of truth for project-level VS Code behavior.',
        'Keep user-specific paths, credentials, tokens, and private machine settings out of this file.',
        'Pair these settings with .vscode/extensions.json so the configured formatters, validators, and language servers are available.'
      ]
    },
    {
      heading: 'Recommended Settings',
      markdown: `
\`\`\`jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit",
    "source.organizeImports": "never"
  },
  "files.eol": "\\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.watcherExclude": {
    "**/.angular/**": true,
    "**/dist/**": true,
    "**/node_modules/**": true
  },
  "search.exclude": {
    "**/.angular": true,
    "**/dist": true,
    "**/node_modules": true
  },
  "prettier.requireConfig": true,
  "prettier.configPath": ".prettierrc",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "typescript", "html"],
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "stylelint.validate": ["css", "scss"],
  "stylelint.configFile": "client/stylelint.config.mjs",
  "markdownlint.config": {
    "MD013": false
  },
  "chat.mcp.autostart": "newAndOutdated",
  "js/ts.tsdk.path": "node_modules/typescript/lib",
  "js/ts.tsdk.promptToUseWorkspaceVersion": false,
  "[yaml]": {
    "editor.defaultFormatter": "redhat.vscode-yaml"
  },
  "yaml.schemaStore.enable": true,
  "yaml.validate": true,
  "yaml.format.enable": true,
  "yaml.keyOrdering": false,
  "yaml.schemas": {
    "https://json.schemastore.org/github-workflow.json": [
      ".github/workflows/*.yml",
      ".github/workflows/*.yaml"
    ],
    "https://json.schemastore.org/github-action.json": [
      ".github/actions/*/action.yml",
      ".github/actions/*/action.yaml"
    ]
  }
}
\`\`\`
`
    },
    {
      heading: 'Why These Settings Exist',
      bullets: [
        'Formatter settings keep Angular, TypeScript, Node.js server, SCSS, Markdown, JSON, and YAML files consistent.',
        'ESLint and Stylelint save actions keep routine fixes close to the editor while leaving TypeScript import organization under explicit control.',
        'The local TypeScript SDK setting keeps VS Code aligned with the TypeScript version installed by this repository.',
        'The MCP autostart setting lets VS Code start configured repository MCP servers when the repository is opened directly.',
        'Use user or `.code-workspace` settings for MCP autostart only when these repositories are opened as a multi-root workspace.',
        'Java, Gradle, Maven, XML, database, and platform settings belong in the sibling repositories that own those concerns.',
        'YAML schema mappings give validation for GitHub workflow and custom action files.',
        'Watcher and search excludes keep generated folders from slowing down editor indexing.'
      ]
    }
  ]
};

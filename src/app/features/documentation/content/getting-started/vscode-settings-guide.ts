import { type DocumentationArticle } from '../../documentation.model';

export const VscodeSettingsGuideArticle: DocumentationArticle = {
  id: 'vscode-settings-guide',
  title: 'VS Code Settings Guide',
  summary: 'Recommended workspace settings for Angular, Java, documentation, and platform files.',
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
  "editor.formatOnPaste": false,
  "editor.guides.bracketPairs": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit",
    "source.organizeImports": "never"
  },
  "editor.rulers": [100],
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.eol": "\\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.watcherExclude": {
    "**/.angular/**": true,
    "**/.gradle/**": true,
    "**/build/**": true,
    "**/dist/**": true,
    "**/node_modules/**": true,
    "**/target/**": true
  },
  "search.exclude": {
    "**/.angular": true,
    "**/.gradle": true,
    "**/build": true,
    "**/dist": true,
    "**/node_modules": true,
    "**/target": true
  },
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "angular.json": "tsconfig*.json, eslint.config.js, stylelint.config.mjs, knip.json, .dependency-cruiser.cjs",
    "build.gradle": "settings.gradle, gradle.properties, gradlew, gradlew.bat, gradle-wrapper.properties",
    "package.json": "package-lock.json, .npmrc, .nvmrc",
    "README.md": "CHANGELOG.md, LICENSE"
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
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "off",
      "other": "off",
      "strings": "off"
    }
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html"],
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "stylelint.validate": ["css", "scss"],
  "stylelint.configFile": "stylelint.config.mjs",
  "markdownlint.config": {
    "MD013": false
  },
  "chat.mcp.autostart": "newAndOutdated",
  "js/ts.tsdk.path": "node_modules/typescript/lib",
  "js/ts.tsdk.promptToUseWorkspaceVersion": false,
  "[java]": {
    "editor.defaultFormatter": "redhat.java",
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit"
    }
  },
  "java.configuration.updateBuildConfiguration": "interactive",
  "java.compile.nullAnalysis.mode": "automatic",
  "java.import.gradle.enabled": true,
  "java.import.gradle.wrapper.enabled": true,
  "java.import.gradle.annotationProcessing.enabled": true,
  "java.import.maven.enabled": true,
  "gradle.autoDetect": "on",
  "gradle.nestedProjects": true,
  "gradle.reuseTerminals": "task",
  "java.gradle.buildServer.enabled": "on",
  "maven.executable.preferMavenWrapper": true,
  "maven.terminal.useJavaHome": true,
  "maven.dependency.enableConflictDiagnostics": true,
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  },
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
    ],
    "https://json.schemastore.org/docker-compose.json": [
      "compose.yml",
      "compose.yaml",
      "compose.*.yml",
      "compose.*.yaml",
      "docker-compose.yml",
      "docker-compose.yaml",
      "docker-compose.*.yml",
      "docker-compose.*.yaml",
      "deploy/compose/*.yml",
      "deploy/compose/*.yaml"
    ]
  }
}
\`\`\`
`
    },
    {
      heading: 'Why These Settings Exist',
      bullets: [
        'Formatter settings keep Angular, TypeScript, SCSS, Markdown, JSON, Java, XML, and YAML files consistent.',
        'ESLint and Stylelint save actions keep routine fixes close to the editor while leaving TypeScript import organization under explicit control.',
        'The local TypeScript SDK setting keeps VS Code aligned with the TypeScript version installed by this repository.',
        'The MCP autostart setting lets VS Code start configured workspace MCP servers without a manual start step each session.',
        'Java, Gradle, and Maven settings support future Spring Boot services without requiring global Gradle or Maven installs.',
        'YAML schema mappings give validation for GitHub Actions, custom actions, and Docker Compose files.',
        'Watcher and search excludes keep generated folders from slowing down editor indexing.'
      ]
    }
  ]
};

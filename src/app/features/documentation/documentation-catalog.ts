import {
  type DocumentationArticle,
  type DocumentationArticleEntry,
  type DocumentationCategory
} from './documentation.model';

export const documentationCategories: readonly DocumentationCategory[] = [
  {
    id: 'overview',
    label: 'Overview',
    articleIds: ['documentation-home']
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    articleIds: [
      'setup-guide',
      'editor-extensions-guide',
      'vscode-settings-guide',
      'mcp-guide',
      'local-development-guide'
    ]
  },
  {
    id: 'architecture',
    label: 'Architecture',
    articleIds: [
      'architecture-overview',
      'folder-structure-guide',
      'component-architecture-guide',
      'full-stack-architecture-guide',
      'api-guide',
      'error-handling-guide'
    ]
  },
  {
    id: 'standards',
    label: 'Standards',
    articleIds: [
      'modern-tech-stack',
      'state-management-standard',
      'coding-standards',
      'material-theming-guide',
      'accessibility-guide',
      'testing-guide'
    ]
  },
  {
    id: 'operations',
    label: 'Operations',
    articleIds: [
      'deployment-guide',
      'platform-guide',
      'security-guide',
      'observability-guide',
      'troubleshooting-guide'
    ]
  },
  {
    id: 'decisions',
    label: 'Decisions',
    articleIds: ['decision-records', 'release-management-guide', 'governance-guide']
  }
];

export const documentationArticleEntries = [
  {
    id: 'documentation-home',
    title: 'Documentation Home',
    summary: 'A guided entry point for project standards, architecture, delivery, and decisions.',
    icon: 'menu_book',
    loadArticle: () =>
      import('./content/overview/documentation-home').then(
        (article) => article.DocumentationHomeArticle
      )
  },
  {
    id: 'modern-tech-stack',
    title: 'Modern Tech Stack',
    summary: 'The default stack for modern Angular and Java applications.',
    icon: 'layers',
    loadArticle: () =>
      import('./content/standards/modern-tech-stack').then(
        (article) => article.ModernTechStackArticle
      )
  },
  {
    id: 'architecture-overview',
    title: 'Architecture Overview',
    summary: 'How the frontend, backend, and database fit together as one system.',
    icon: 'account_tree',
    loadArticle: () =>
      import('./content/architecture/architecture-overview').then(
        (article) => article.ArchitectureOverviewArticle
      )
  },
  {
    id: 'folder-structure-guide',
    title: 'Folder Structure Guide',
    summary: 'Where frontend, backend, database, and deployment assets belong.',
    icon: 'folder_open',
    loadArticle: () =>
      import('./content/architecture/folder-structure-guide').then(
        (article) => article.FolderStructureGuideArticle
      )
  },
  {
    id: 'component-architecture-guide',
    title: 'Feature And Component Architecture Guide',
    summary: 'How feature pieces are composed across frontend, backend, and database layers.',
    icon: 'widgets',
    loadArticle: () =>
      import('./content/architecture/component-architecture-guide').then(
        (article) => article.ComponentArchitectureGuideArticle
      )
  },
  {
    id: 'full-stack-architecture-guide',
    title: 'System Architecture Guide',
    summary: 'How the major system layers divide responsibility without duplicating folder rules.',
    icon: 'hub',
    loadArticle: () =>
      import('./content/architecture/full-stack-architecture-guide').then(
        (article) => article.FullStackArchitectureGuideArticle
      )
  },
  {
    id: 'setup-guide',
    title: 'Setup Guide',
    summary: 'How to get the application ready on a new machine.',
    icon: 'construction',
    loadArticle: () =>
      import('./content/getting-started/setup-guide').then((article) => article.SetupGuideArticle)
  },
  {
    id: 'local-development-guide',
    title: 'Local Development Guide',
    summary: 'Daily commands and development workflow.',
    icon: 'terminal',
    loadArticle: () =>
      import('./content/getting-started/local-development-guide').then(
        (article) => article.LocalDevelopmentGuideArticle
      )
  },
  {
    id: 'editor-extensions-guide',
    title: 'Editor Extensions Guide',
    summary: 'How VS Code extension recommendations support the workspace.',
    icon: 'extension',
    loadArticle: () =>
      import('./content/getting-started/editor-extensions-guide').then(
        (article) => article.EditorExtensionsGuideArticle
      )
  },
  {
    id: 'vscode-settings-guide',
    title: 'VS Code Settings Guide',
    summary: 'Recommended workspace settings for Angular, Java, documentation, and platform files.',
    icon: 'settings',
    loadArticle: () =>
      import('./content/getting-started/vscode-settings-guide').then(
        (article) => article.VscodeSettingsGuideArticle
      )
  },
  {
    id: 'mcp-guide',
    title: 'MCP Guide',
    summary: 'How MCP servers are configured for VS Code, Copilot, Codex, and future tools.',
    icon: 'hub',
    loadArticle: () =>
      import('./content/getting-started/mcp-guide').then((article) => article.McpGuideArticle)
  },
  {
    id: 'coding-standards',
    title: 'Coding Standards',
    summary: 'Conventions that keep Angular code consistent and maintainable.',
    icon: 'rule',
    loadArticle: () =>
      import('./content/standards/coding-standards').then(
        (article) => article.CodingStandardsArticle
      )
  },
  {
    id: 'material-theming-guide',
    title: 'Material Theming Guide',
    summary: 'How Material 3 themes, design tokens, and runtime theme switching are handled.',
    icon: 'palette',
    loadArticle: () =>
      import('./content/standards/material-theming-guide').then(
        (article) => article.MaterialThemingGuideArticle
      )
  },
  {
    id: 'state-management-standard',
    title: 'State Management Standard',
    summary: 'How client state, server state, validation, and API contracts divide ownership.',
    icon: 'schema',
    loadArticle: () =>
      import('./content/standards/state-management-standard').then(
        (article) => article.StateManagementStandardArticle
      )
  },
  {
    id: 'api-guide',
    title: 'API Guide',
    summary: 'How frontend API access, backend contracts, and database persistence are separated.',
    icon: 'api',
    loadArticle: () =>
      import('./content/architecture/api-guide').then((article) => article.ApiGuideArticle)
  },
  {
    id: 'testing-guide',
    title: 'Testing Guide',
    summary:
      'The testing approach for frontend, accessibility, browser, and backend quality gates.',
    icon: 'fact_check',
    loadArticle: () =>
      import('./content/standards/testing-guide').then((article) => article.TestingGuideArticle)
  },
  {
    id: 'deployment-guide',
    title: 'Deployment Guide',
    summary: 'How the application is built, checked, packaged, and promoted.',
    icon: 'rocket_launch',
    loadArticle: () =>
      import('./content/operations/deployment-guide').then(
        (article) => article.DeploymentGuideArticle
      )
  },
  {
    id: 'troubleshooting-guide',
    title: 'Troubleshooting Guide',
    summary: 'Common fixes for local and CI issues.',
    icon: 'troubleshoot',
    loadArticle: () =>
      import('./content/operations/troubleshooting-guide').then(
        (article) => article.TroubleshootingGuideArticle
      )
  },
  {
    id: 'decision-records',
    title: 'Decision Records',
    summary: 'Architecture decisions that should be captured as the project evolves.',
    icon: 'history_edu',
    loadArticle: () =>
      import('./content/decisions/decision-records').then(
        (article) => article.DecisionRecordsArticle
      )
  },
  {
    id: 'accessibility-guide',
    title: 'Accessibility Guide',
    summary: 'How the app targets WCAG-friendly, keyboard-first Angular interfaces.',
    icon: 'accessibility_new',
    loadArticle: () =>
      import('./content/standards/accessibility-guide').then(
        (article) => article.AccessibilityGuideArticle
      )
  },
  {
    id: 'error-handling-guide',
    title: 'Error Handling Guide',
    summary: 'How frontend, backend, and database errors are captured, translated, and surfaced.',
    icon: 'report',
    loadArticle: () =>
      import('./content/architecture/error-handling-guide').then(
        (article) => article.ErrorHandlingGuideArticle
      )
  },
  {
    id: 'platform-guide',
    title: 'Platform Guide',
    summary: 'The enterprise-aligned hosting, database, jobs, and backend direction.',
    icon: 'dns',
    loadArticle: () =>
      import('./content/operations/platform-guide').then((article) => article.PlatformGuideArticle)
  },
  {
    id: 'security-guide',
    title: 'Security Guide',
    summary: 'Security practices for dependencies, APIs, auth, scans, and deployment gates.',
    icon: 'shield',
    loadArticle: () =>
      import('./content/operations/security-guide').then((article) => article.SecurityGuideArticle)
  },
  {
    id: 'observability-guide',
    title: 'Observability Guide',
    summary: 'How logs, metrics, traces, and frontend errors should be collected.',
    icon: 'monitoring',
    loadArticle: () =>
      import('./content/operations/observability-guide').then(
        (article) => article.ObservabilityGuideArticle
      )
  },
  {
    id: 'release-management-guide',
    title: 'Release Management Guide',
    summary: 'How versions, changelogs, tags, and deployments should be handled.',
    icon: 'new_releases',
    loadArticle: () =>
      import('./content/decisions/release-management-guide').then(
        (article) => article.ReleaseManagementGuideArticle
      )
  },
  {
    id: 'governance-guide',
    title: 'Governance Guide',
    summary: 'How architectural decisions and project standards are controlled over time.',
    icon: 'gavel',
    loadArticle: () =>
      import('./content/decisions/governance-guide').then(
        (article) => article.GovernanceGuideArticle
      )
  }
] as const satisfies readonly DocumentationArticleEntry[];

export const documentationArticleLoaders: ReadonlyMap<string, () => Promise<DocumentationArticle>> =
  new Map(documentationArticleEntries.map((article) => [article.id, article.loadArticle]));

export const defaultDocumentationArticleId = documentationArticleEntries[0].id;

import { type DocumentationArticle } from '../../documentation.model';

export const EditorExtensionsGuideArticle: DocumentationArticle = {
  id: 'editor-extensions-guide',
  title: 'Editor Extensions Guide',
  summary: 'How VS Code extension recommendations support the workspace.',
  sections: [
    {
      heading: 'Source Of Truth',
      bullets: [
        'Use .vscode/extensions.json as the workspace source of truth for recommended VS Code extensions.',
        'Install recommended extensions when VS Code prompts for workspace recommendations.',
        'Keep recommendations focused on tools used by this workspace instead of adding broad personal preferences.'
      ]
    },
    {
      heading: 'Front End',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Angular templates | Angular Language Service | Angular | angular.ng-template |
| TypeScript linting | ESLint | dbaeumer | dbaeumer.vscode-eslint |
| SCSS linting | Stylelint | stylelint | stylelint.vscode-stylelint |
| Formatting | Prettier - Code formatter | esbenp | esbenp.prettier-vscode |
| Browser testing | Playwright Test for VSCode | ms-playwright | ms-playwright.playwright |
| Unit test visibility | Vitest Explorer | vitest | vitest.explorer |
`
    },
    {
      heading: 'Documentation',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Markdown linting | markdownlint | DavidAnson | DavidAnson.vscode-markdownlint |
`
    },
    {
      heading: 'Node.js Server',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| TypeScript linting | ESLint | dbaeumer | dbaeumer.vscode-eslint |
| Formatting | Prettier - Code formatter | esbenp | esbenp.prettier-vscode |
| API request scratchpad | REST Client | Huachao Mao | humao.rest-client |
| OpenAPI editing and validation | Redocly OpenAPI | Redocly | redocly.openapi-vs-code |
`
    },
    {
      heading: 'Security And Workflow Files',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Code quality and security analysis | SonarQube for IDE | sonarsource | sonarsource.sonarlint-vscode |
| SAST findings and IDE scan support | Checkmarx SAST 9.x | checkmarx | checkmarx.cxvscode |
| YAML workflow files | YAML | redhat | redhat.vscode-yaml |
`
    },
    {
      heading: 'Sibling Repositories',
      bullets: [
        'Keep Java, database, platform, XML, and delivery extension recommendations in the repositories that own those concerns.',
        "Use user-level VS Code settings or a multi-root workspace when personal extensions should apply across all Tony's Workbench repositories."
      ]
    }
  ]
};

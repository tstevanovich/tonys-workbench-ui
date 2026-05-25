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
| Markdown editing shortcuts and tables of contents | Markdown All in One | yzhang | yzhang.markdown-all-in-one |
`
    },
    {
      heading: 'Security And Quality',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Code quality and security analysis | SonarQube for IDE | sonarsource | sonarsource.sonarlint-vscode |
| SAST findings and IDE scan support | Checkmarx SAST 9.x | checkmarx | checkmarx.cxvscode |
`
    },
    {
      heading: 'Source Control',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Git history, blame, and branch context | GitLens - Git supercharged | eamodio | eamodio.gitlens |
`
    },
    {
      heading: 'Java And Spring',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| Java language support | Language Support for Java(TM) by Red Hat | redhat | redhat.java |
| Debugging | Debugger for Java | vscjava | vscjava.vscode-java-debug |
| Unit tests | Test Runner for Java | vscjava | vscjava.vscode-java-test |
| Gradle projects | Gradle for Java | vscjava | vscjava.vscode-gradle |
| Maven projects and Maven metadata | Maven for Java | vscjava | vscjava.vscode-maven |
| Lombok annotations | Lombok Annotations Support for VS Code | vscjava | vscjava.vscode-lombok |
| Spring Boot apps | Spring Boot Tools | vmware | vmware.vscode-spring-boot |
| Spring Boot app dashboard | Spring Boot Dashboard | vscjava | vscjava.vscode-spring-boot-dashboard |
| Spring project scaffolding | Spring Initializr Java Support | vscjava | vscjava.vscode-spring-initializr |
| XML configuration | XML | redhat | redhat.vscode-xml |
`
    },
    {
      heading: 'API And Events',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| OpenAPI editing and validation | Redocly OpenAPI | Redocly | redocly.openapi-vs-code |
| Kafka and Schema Registry work | Confluent | confluentinc | confluentinc.vscode-confluent |
`
    },
    {
      heading: 'Platform And Delivery',
      markdown: `
| Capability | Extension | Publisher | Extension ID |
| --- | --- | --- | --- |
| SQL Server work | SQL Server (mssql) | ms-mssql | ms-mssql.mssql |
| YAML files | YAML | redhat | redhat.vscode-yaml |
| GitHub workflows | GitHub Actions | github | github.vscode-github-actions |
| GitHub reviews | GitHub Pull Requests | GitHub | github.vscode-pull-request-github |
| Container images and Compose files | Container Tools | ms-azuretools | ms-azuretools.vscode-containers |
| Kubernetes manifests | Kubernetes | ms-kubernetes-tools | ms-kubernetes-tools.vscode-kubernetes-tools |
| OpenShift workflows | OpenShift Toolkit | redhat | redhat.vscode-openshift-connector |
| Red Hat sign-in flows | Red Hat Authentication | redhat | redhat.vscode-redhat-account |
`
    }
  ]
};

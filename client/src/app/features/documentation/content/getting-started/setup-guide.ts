import { type DocumentationArticle } from '../../documentation.model';

export const SetupGuideArticle: DocumentationArticle = {
  id: 'setup-guide',
  title: 'Setup Guide',
  summary: 'How to get the application ready on a new machine.',
  sections: [
    {
      heading: 'Prerequisites',
      bullets: [
        'Use Node 24 LTS for the Angular toolchain and Node.js server runtime.',
        'Use npm 11+ for install and scripts.',
        'Use Java 25 LTS as the modern backend JDK baseline.',
        'Use the repository Gradle Wrapper instead of installing a global Gradle version when gradlew or gradlew.bat exists.',
        'Use VS Code with the extensions recommended by .vscode/extensions.json.'
      ]
    },
    {
      heading: 'Front End Install',
      markdown: `
\`\`\`bash
npm install
npm run dev
npm run check
npm run build
npm start
\`\`\`
`,
      bullets: [
        'Run npm install from the `tonys-workbench-ui` repository root.',
        'Run npm run dev to start the Angular client and Node.js server together at http://localhost:8080.',
        'Run npm run check from the repository root.',
        'Run npm run build from the repository root to build both the Node.js server and Angular client.',
        'Run npm start after a build to serve the compiled server and built client on http://localhost:8080.',
        'Use `client/` for Angular source, config, tests, and browser assets.'
      ]
    },
    {
      heading: 'Node.js Server Setup',
      markdown: `
\`\`\`bash
node --version
npm --version
\`\`\`
`,
      bullets: [
        'Use `server/` for the Node.js server module in `tonys-workbench-ui`.',
        'Use the current Node.js LTS line for new server work.',
        'Keep server secrets, downstream URLs, client credentials, and mTLS configuration in environment-specific configuration rather than committed files.',
        'Place SQL Server-backed API behavior in the Node.js server by default.'
      ]
    },
    {
      heading: 'Java And Gradle Setup',
      markdown: `
\`\`\`bash
java -version
javac -version

./gradlew --version
./gradlew tasks
\`\`\`
`,
      bullets: [
        'Install a full JDK, not only a JRE.',
        'Create Java service code in the sibling `tonys-workbench-services` repository only when a feature needs a separate durable backend boundary.',
        String.raw`Set JAVA_HOME to the JDK folder and put %JAVA_HOME%\bin before Java shim paths in the Windows Path.`,
        'Use a quoted path or Windows short path when tooling has trouble with spaces in Program Files.',
        'Use Java 25 LTS for new services when the Gradle wrapper and build plugins support it.',
        'Use the JDK required by a specific existing service when its Gradle wrapper or plugins do not yet support Java 25.',
        'Run Gradle through ./gradlew on macOS/Linux/Git Bash or gradlew.bat on Windows PowerShell.',
        'Keep private repository credentials in the user Gradle file, not in this repository.'
      ]
    },
    {
      heading: 'Private Package Repository Credentials',
      markdown: `
\`\`\`properties
# ~/.gradle/gradle.properties
privateRepositoryUser=YOUR_USERNAME
privateRepositoryAuth=YOUR_GENERATED_VALUE
\`\`\`
`,
      bullets: [
        'Replace the sample property names with the names expected by the repository settings.gradle or build.gradle files.',
        'Examples include private Maven-compatible repositories, package registries, artifact proxies, and hosted dependency caches.',
        'A Maven-compatible artifact repository does not mean Maven is the build tool; Gradle can consume Maven-style repositories.',
        'Do not commit tokens, passwords, or user-specific Gradle properties.'
      ]
    }
  ]
};

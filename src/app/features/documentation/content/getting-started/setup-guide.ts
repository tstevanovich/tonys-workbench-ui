import { type DocumentationArticle } from '../../documentation.model';

export const SetupGuideArticle: DocumentationArticle = {
  id: 'setup-guide',
  title: 'Setup Guide',
  summary: 'How to get the application ready on a new machine.',
  sections: [
    {
      heading: 'Prerequisites',
      bullets: [
        'Use Node 24 LTS for the Angular toolchain and future Node.js BFF runtime.',
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
npm run check
npm run build
\`\`\`
`,
      bullets: ['Run npm install.', 'Run npm run check.', 'Run npm run build.']
    },
    {
      heading: 'Node.js BFF Setup',
      markdown: `
\`\`\`bash
node --version
npm --version
\`\`\`
`,
      bullets: [
        'Use the current Node.js LTS line for new BFF work.',
        'Add Express and BFF-specific dependencies only when a bff/ module exists.',
        'Keep BFF secrets, downstream URLs, client credentials, and mTLS configuration in environment-specific configuration rather than committed files.'
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
        'Set JAVA_HOME to the JDK folder and put %JAVA_HOME%\\bin before Java shim paths in the Windows Path.',
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
repositoryUserName=YOUR_USERNAME
repositoryPassword=YOUR_TOKEN
\`\`\`
`,
      bullets: [
        'Use the property names expected by the repository settings.gradle or build.gradle files.',
        'Examples include private Maven-compatible repositories, package registries, artifact proxies, and hosted dependency caches.',
        'A Maven-compatible artifact repository does not mean Maven is the build tool; Gradle can consume Maven-style repositories.',
        'Do not commit tokens, passwords, or user-specific Gradle properties.'
      ]
    }
  ]
};

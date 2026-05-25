import { type DocumentationArticle } from '../../documentation.model';

export const AccessibilityGuideArticle: DocumentationArticle = {
  id: 'accessibility-guide',
  title: 'Accessibility Guide',
  summary: 'How the app targets WCAG-friendly, keyboard-first Angular interfaces.',
  sections: [
    {
      heading: 'Baseline',
      bullets: [
        'Target WCAG 2.2 AA for product work.',
        'Use semantic HTML before ARIA.',
        'Use Angular CDK a11y tools for focus management, live announcements, focus traps, and keyboard-friendly components.',
        'Use Angular ESLint template accessibility rules as a required quality gate.',
        'Use axe-core in Playwright for route-level automated accessibility checks.',
        'Treat automated checks as a baseline, not as a replacement for keyboard, screen reader, and visual review.'
      ]
    },
    {
      heading: 'Automation',
      markdown: `
\`\`\`bash
npm run lint
npm run test:a11y
npm run test:e2e
\`\`\`
`,
      bullets: [
        'Use Angular ESLint template accessibility rules during linting.',
        'Use npm run test:a11y for the dedicated Playwright axe-core accessibility suite.',
        'Use npm run test:e2e when accessibility checks should run with the broader browser flow suite.',
        'Keep axe-core and @axe-core/playwright as dev dependencies for automated browser accessibility checks.'
      ]
    },
    {
      heading: 'Tooling',
      bullets: [
        'No additional required VS Code extension is needed beyond ESLint, Angular Language Service, Playwright, and SonarQube for IDE.',
        'Use Playwright Test for VSCode when inspecting the accessibility test flow locally.',
        'Use browser DevTools accessibility inspectors for manual name, role, focus, and contrast investigation.',
        'Use specialized screen reader testing for important workflows because static analyzers and axe-core do not catch every usability issue.'
      ]
    },
    {
      heading: 'Forms',
      bullets: [
        'Every form control needs a visible label or a clearly associated accessible name.',
        'Validation messages should be specific, visible, and associated with the field.',
        'Required, invalid, disabled, and loading states must be communicated visually and programmatically.'
      ]
    }
  ]
};

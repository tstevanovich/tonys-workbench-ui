import { type DocumentationArticle } from '../../documentation.model';

export const DocumentationHomeArticle: DocumentationArticle = {
  id: 'documentation-home',
  title: 'Documentation Home',
  summary: 'A guided entry point for project standards, architecture, delivery, and decisions.',
  sections: [
    {
      heading: 'What This Space Is For',
      body: "This documentation is the operating manual for Tony's Workbench. It captures how the app is built, how the full-stack architecture is expected to evolve, and which decisions contributors and agents should preserve."
    },
    {
      heading: 'Start Here',
      bullets: [
        'Use Getting Started when setting up the repo, running the app locally, or onboarding a new contributor.',
        'Use Architecture when making structural choices across the Angular frontend, Node.js BFF, Java services, database design, and deployment layout.',
        'Use Standards when changing code quality rules, accessibility expectations, tests, or shared technology choices.',
        'Use Operations when working on deployment, platform direction, security, observability, or troubleshooting.',
        'Use Decisions when adding ADRs, release notes, governance rules, or durable project direction.'
      ]
    },
    {
      heading: 'Working Agreement',
      bullets: [
        'Docs should describe the intended architecture, not only the files that exist today.',
        'Frontend, BFF, Java services, database, and deployment guidance should stay connected so the repo can grow without rewriting the playbook.',
        'Architecture decisions should be captured as ADRs when they affect contributors, agents, or other repos.'
      ]
    }
  ]
};

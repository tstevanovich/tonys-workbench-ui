import { type DocumentationArticle } from '../../documentation.model';

export const GovernanceGuideArticle: DocumentationArticle = {
  id: 'governance-guide',
  title: 'Governance Guide',
  summary: 'How architectural decisions and project standards are controlled over time.',
  sections: [
    {
      heading: 'Decision Model',
      bullets: [
        'Use ADRs for decisions that change stack direction, architecture boundaries, deployment model, auth, database, governance, or long-lived quality gates.',
        'Use documentation pages for practical standards, commands, workflows, setup, troubleshooting, and implementation guidance.',
        'Use the Modern Tech Stack page as the technology inventory, not as a place for workflow rules.',
        'Keep the in-app documentation and docs/adr files aligned when a decision changes both policy and implementation guidance.'
      ]
    },
    {
      heading: 'Review Triggers',
      bullets: [
        'Review dependency, framework, runtime, hosting, auth, database, observability, and security-scanning changes explicitly before implementation.',
        'Review major version upgrades before applying them, even when the default direction is to keep selected software modern.',
        'Review new libraries for overlap with existing stack choices, maintenance health, licensing, security posture, and whether the same result can be achieved with the current platform.',
        'Review any change that introduces secrets, credentials, certificates, external integrations, deployment gates, or new data persistence.'
      ]
    },
    {
      heading: 'Enforcement',
      bullets: [
        'Use CI checks to enforce formatting, linting, unit tests, architecture checks, dead-code checks, security checks, accessibility checks, and build verification.',
        'Use VS Code recommended extensions and workspace settings to make local behavior match project standards.',
        'Use package scripts and Gradle Wrapper commands as the documented interface for local and CI quality gates.',
        'Treat failed quality gates as blockers unless the relevant standard is intentionally changed and documented.'
      ]
    },
    {
      heading: 'Documentation Hygiene',
      bullets: [
        'Update setup, local development, testing, deployment, security, observability, and troubleshooting pages when their commands or expectations change.',
        'Keep organization-specific names, private service names, credentials, and internal repository details out of public playbook pages.',
        'Capture public equivalents and architectural capability names instead of copying proprietary library names into durable docs.',
        'Retire duplicate pages when their content is better owned by a more specific guide.'
      ]
    }
  ]
};

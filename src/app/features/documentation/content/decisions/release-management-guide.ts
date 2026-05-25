import { type DocumentationArticle } from '../../documentation.model';

export const ReleaseManagementGuideArticle: DocumentationArticle = {
  id: 'release-management-guide',
  title: 'Release Management Guide',
  summary: 'How versions, changelogs, tags, and deployments should be handled.',
  sections: [
    {
      heading: 'Versioning',
      bullets: [
        'Use semantic versioning once the app has real releases.',
        'Use pre-1.0 versions while the app is still architecture-heavy and changing quickly.',
        'Use patch versions for fixes, minor versions for compatible feature work, and major versions for breaking workflow or API changes.',
        'Keep frontend, backend, and deployment versioning aligned when a change must be promoted as one unit.'
      ]
    },
    {
      heading: 'Change Flow',
      bullets: [
        'Use pull requests and required checks for all changes that leave a local branch.',
        'Run local checks before pushing and rely on GitHub Actions as the shared verification gate.',
        'Require passing quality, security, accessibility, browser, backend, and deployment checks before promoting a release.',
        'Update documentation and ADRs in the same change when a release changes stack, architecture, workflow, deployment, auth, database, or governance rules.'
      ]
    },
    {
      heading: 'Release Artifacts',
      bullets: [
        'Use GitHub releases and tags for production releases.',
        'Publish release notes that summarize user-facing changes, architecture changes, dependency upgrades, security fixes, and migration steps.',
        'Keep deployment history visible through GitHub Actions environments.',
        'Use immutable container image tags once backend services or deployable containers exist.'
      ]
    },
    {
      heading: 'Promotion',
      bullets: [
        'Treat GitHub Actions as the source of build verification for this repository.',
        'Allow deployment workflows to hand off to a promotion system when environments require approvals or change records.',
        'Do not promote builds with failed dependency, SAST, CodeQL, accessibility, migration, container, or smoke-test checks.',
        'Record which commit, package version, image tag, environment, and workflow run produced each promoted release.'
      ]
    }
  ]
};

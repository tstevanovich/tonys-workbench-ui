module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies make feature boundaries difficult to reason about.',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'features-do-not-import-other-features',
      severity: 'error',
      comment: 'Feature folders should communicate through routes, core services, or shared code.',
      from: {
        path: '^src/app/features/([^/]+)/'
      },
      to: {
        path: '^src/app/features/([^/]+)/',
        pathNot: '^src/app/features/$1/'
      }
    },
    {
      name: 'shared-does-not-import-features',
      severity: 'error',
      comment: 'Shared code should stay reusable and must not depend on feature folders.',
      from: {
        path: '^src/app/shared/'
      },
      to: {
        path: '^src/app/features/'
      }
    },
    {
      name: 'core-does-not-import-features',
      severity: 'error',
      comment:
        'Core code should provide app-wide infrastructure and must not depend on feature folders.',
      from: {
        path: '^src/app/core/'
      },
      to: {
        path: '^src/app/features/'
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
    exclude: {
      path: String.raw`\.spec\.ts$|\.test\.ts$`
    }
  }
};

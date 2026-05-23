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
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
    exclude: {
      path: '\\.spec\\.ts$|\\.test\\.ts$'
    }
  }
};

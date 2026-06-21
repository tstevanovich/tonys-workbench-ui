#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function usage() {
  console.error('Usage: node verify-coverage.mjs <path-to-source-file> [coverage-summary-json]');
}

function findPackageRoot(startFile) {
  let current = path.dirname(path.resolve(startFile));

  while (current !== path.dirname(current)) {
    if (existsSync(path.join(current, 'package.json'))) {
      return current;
    }

    current = path.dirname(current);
  }

  return null;
}

function normalize(value) {
  return value.replaceAll('\\', '/').toLowerCase();
}

const sourceArg = process.argv[2];

if (!sourceArg) {
  usage();
  process.exit(1);
}

const cwd = process.cwd();
const sourcePath = path.resolve(cwd, sourceArg);
const packageRoot = findPackageRoot(sourcePath);

if (!packageRoot) {
  console.error(`No package.json found for ${sourcePath}`);
  process.exit(1);
}

const sourceRelativeToPackage = path.relative(packageRoot, sourcePath);
const summaryPath = process.argv[3]
  ? path.resolve(cwd, process.argv[3])
  : path.join(packageRoot, 'coverage', 'coverage-summary.json');
const summary = JSON.parse(readFileSync(summaryPath, 'utf8'));
const sourceSuffix = normalize(sourceRelativeToPackage);
const matchingEntry = Object.entries(summary).find(([coveragePath]) =>
  normalize(coveragePath).endsWith(sourceSuffix)
);

if (!matchingEntry) {
  console.error(`No coverage entry matched ${sourceRelativeToPackage} in ${summaryPath}`);
  process.exit(1);
}

const [coveragePath, coverage] = matchingEntry;
const metrics = {
  statements: coverage.statements.pct,
  branches: coverage.branches.pct,
  functions: coverage.functions.pct,
  lines: coverage.lines.pct
};
const failedMetrics = Object.entries(metrics).filter(([, value]) => value !== 100);

console.log(
  JSON.stringify(
    {
      sourcePath,
      coveragePath,
      metrics
    },
    null,
    2
  )
);

if (failedMetrics.length > 0) {
  console.error(
    `Coverage is below 100% for: ${failedMetrics
      .map(([name, value]) => `${name}=${value}`)
      .join(', ')}`
  );
  process.exit(1);
}

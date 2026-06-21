#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function usage() {
  console.error('Usage: node target-info.mjs <path-to-source-file>');
}

function findRepoRoot(startDir) {
  let current = path.resolve(startDir);

  while (current !== path.dirname(current)) {
    if (existsSync(path.join(current, '.git')) || existsSync(path.join(current, '.agents'))) {
      return current;
    }

    current = path.dirname(current);
  }

  return path.resolve(startDir);
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join('/');
}

function quotePowerShell(value) {
  return value.includes(' ') ? `"${value.replaceAll('"', '`"')}"` : value;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
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

function getAssociatedTestPath(specCandidate, testCandidate) {
  if (existsSync(specCandidate)) {
    return specCandidate;
  }

  if (existsSync(testCandidate)) {
    return testCandidate;
  }

  return specCandidate;
}

const sourceArg = process.argv[2];

if (!sourceArg) {
  usage();
  process.exit(1);
}

const cwd = process.cwd();
const repoRoot = findRepoRoot(cwd);
const sourcePath = path.resolve(cwd, sourceArg);
const packageRoot = findPackageRoot(sourcePath);

if (!packageRoot) {
  console.error(`No package.json found for ${sourcePath}`);
  process.exit(1);
}

const packageJson = readJson(path.join(packageRoot, 'package.json'));
const packageScripts = packageJson.scripts ?? {};
const sourceRelativeToPackage = path.relative(packageRoot, sourcePath);

if (sourceRelativeToPackage.startsWith('..') || path.isAbsolute(sourceRelativeToPackage)) {
  console.error(`Source file must be inside ${packageRoot}`);
  process.exit(1);
}

if (sourcePath.endsWith('.spec.ts') || sourcePath.endsWith('.test.ts')) {
  console.error('Source file must not be a test file.');
  process.exit(1);
}

const sourceDirectory = path.dirname(sourcePath);
const sourceBaseName = path.basename(sourcePath, '.ts');
const specCandidate = path.join(sourceDirectory, `${sourceBaseName}.spec.ts`);
const testCandidate = path.join(sourceDirectory, `${sourceBaseName}.test.ts`);
const associatedTestPath = getAssociatedTestPath(specCandidate, testCandidate);
const associatedTestExists = existsSync(associatedTestPath);
const specRelativeToPackage = path.relative(packageRoot, associatedTestPath);
const coveragePackagePath = path.join(packageRoot, 'node_modules', '@vitest', 'coverage-v8');
const hasCoveragePackage = existsSync(coveragePackagePath);

const specCliPath = quotePowerShell(toPosix(specRelativeToPackage));
const sourceCliPath = quotePowerShell(toPosix(sourceRelativeToPackage));
const usesCliIncludeFlags = packageScripts['test:unit']?.includes('ng test');
const testCommand = usesCliIncludeFlags
  ? [
      'npm.cmd run test:unit --',
      `--include=${specCliPath}`,
      '--coverage',
      `--coverage-include=${sourceCliPath}`,
      '--coverage-reporters=json-summary',
      '--watch=false'
    ].join(' ')
  : [
      packageScripts.test ? 'npm.cmd run test --' : 'npx.cmd vitest run',
      specCliPath,
      '--coverage',
      `--coverage.include=${sourceCliPath}`,
      '--coverage.reporter=json-summary',
      '--watch=false'
    ].join(' ');

const info = {
  repoRoot,
  packageRoot,
  packageName: packageJson.name ?? null,
  sourcePath,
  sourceRelativeToPackage: toPosix(sourceRelativeToPackage),
  associatedTestPath,
  associatedTestRelativeToPackage: toPosix(specRelativeToPackage),
  associatedTestExists,
  hasCoveragePackage,
  installCoveragePackageCommand: 'npm.cmd install --save-dev @vitest/coverage-v8',
  runFrom: packageRoot,
  testCommand,
  coverageSummaryPath: path.join(packageRoot, 'coverage', 'coverage-summary.json')
};

console.log(JSON.stringify(info, null, 2));

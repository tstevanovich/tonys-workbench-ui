import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(resolve(workspaceRoot, 'package.json'), 'utf8'));
const buildInfoPath = resolve(workspaceRoot, 'public/build-info.json');
const buildEnvironment = readBuildEnvironment();

const buildInfo = {
  builtAt: new Date().toISOString(),
  commit: readGitValue(['rev-parse', '--short=12', 'HEAD']) ?? 'local',
  environment: buildEnvironment,
  version: packageJson.version
};

mkdirSync(dirname(buildInfoPath), { recursive: true });
writeFileSync(buildInfoPath, `${JSON.stringify(buildInfo, null, 2)}\n`, 'utf8');

console.log(
  `Updated client build info: ${buildInfo.environment} ${buildInfo.version} ${buildInfo.commit}`
);

function readBuildEnvironment() {
  const environment = readArgValue('--environment') ?? process.env.BUILD_ENV ?? 'local';

  if (environment === 'local' || environment === 'prod') {
    return environment;
  }

  throw new Error(`Unsupported build environment "${environment}". Use "local" or "prod".`);
}

function readArgValue(name) {
  const inlineValue = process.argv.find((arg) => arg.startsWith(`${name}=`));

  if (inlineValue) {
    return inlineValue.slice(name.length + 1);
  }

  const argIndex = process.argv.indexOf(name);

  if (argIndex >= 0) {
    return process.argv[argIndex + 1];
  }

  return undefined;
}

function readGitValue(args) {
  try {
    return execFileSync('git', args, {
      cwd: workspaceRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    return undefined;
  }
}

import { spawnSync } from 'node:child_process';

const auditLevel = 'moderate';
const auditCommand = process.env.npm_execpath ? process.execPath : 'npm';
const auditArgs = process.env.npm_execpath
  ? [process.env.npm_execpath, 'audit', '--json', '--omit=dev']
  : ['audit', '--json', '--omit=dev'];
const allowedAdvisoryIds = new Set(['GHSA-w5hq-g745-h8pq']);
const allowedVulnerabilityNames = new Set(['exceljs', 'uuid']);
const severityRank = new Map([
  ['info', 0],
  ['low', 1],
  ['moderate', 2],
  ['high', 3],
  ['critical', 4]
]);

const result = spawnSync(auditCommand, auditArgs, {
  encoding: 'utf8'
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

const report = parseAuditReport(result.stdout);
const vulnerabilities = report.vulnerabilities ?? {};
const minimumRank = severityRank.get(auditLevel) ?? 0;
const blockingVulnerabilities = Object.entries(vulnerabilities).filter(
  ([name, vulnerability]) =>
    (severityRank.get(vulnerability.severity) ?? 0) >= minimumRank &&
    !isAllowedVulnerability(name, vulnerabilities)
);

if (blockingVulnerabilities.length > 0) {
  console.error(formatBlockingVulnerabilities(blockingVulnerabilities));
  process.exit(1);
}

const allowedVulnerabilities = Object.entries(vulnerabilities).filter(([name]) =>
  isAllowedVulnerability(name, vulnerabilities)
);

if (allowedVulnerabilities.length > 0) {
  console.warn(formatAllowedVulnerabilities(allowedVulnerabilities));
}

console.log('Runtime dependency audit passed.');

function parseAuditReport(output) {
  try {
    return JSON.parse(output);
  } catch {
    console.error(output || 'npm audit did not return a JSON report.');
    process.exit(1);
  }
}

function isAllowedVulnerability(name, vulnerabilities, seen = new Set()) {
  if (!allowedVulnerabilityNames.has(name) || seen.has(name)) {
    return false;
  }

  seen.add(name);

  const vulnerability = vulnerabilities[name];
  const advisoryIds = getAdvisoryIds(vulnerability);

  if (advisoryIds.some((advisoryId) => allowedAdvisoryIds.has(advisoryId))) {
    return true;
  }

  return (vulnerability?.via ?? []).some(
    (via) => typeof via === 'string' && isAllowedVulnerability(via, vulnerabilities, seen)
  );
}

function getAdvisoryIds(vulnerability) {
  return (vulnerability?.via ?? [])
    .filter((via) => typeof via === 'object' && via.url)
    .map((via) => via.url.match(/GHSA-[a-z0-9-]+/i)?.[0])
    .filter(Boolean);
}

function formatBlockingVulnerabilities(blockingVulnerabilities) {
  const lines = blockingVulnerabilities.map(
    ([name, vulnerability]) => `- ${name}: ${vulnerability.severity}`
  );

  return ['Runtime dependency audit failed:', ...lines].join('\n');
}

function formatAllowedVulnerabilities(allowedVulnerabilities) {
  const lines = allowedVulnerabilities.map(
    ([name, vulnerability]) => `- ${name}: ${vulnerability.severity}`
  );

  return ['Allowed runtime audit finding:', ...lines].join('\n');
}

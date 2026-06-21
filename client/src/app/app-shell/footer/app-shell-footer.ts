import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';

interface BuildInfo {
  builtAt: string;
  commit: string;
  environment: 'local' | 'prod';
  version: string;
}

const fallbackBuildInfo: BuildInfo = {
  builtAt: 'local',
  commit: 'local',
  environment: 'local',
  version: '0.0.0'
};

@Component({
  selector: 'app-shell-footer',
  templateUrl: './app-shell-footer.html',
  styleUrl: './app-shell-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellFooter {
  protected readonly buildInfo = signal(fallbackBuildInfo);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly formattedBuiltAt = computed(() =>
    formatEasternBuildTime(this.buildInfo().builtAt)
  );

  constructor() {
    afterNextRender(() => {
      void this.loadBuildInfo();
    });
  }

  private async loadBuildInfo(): Promise<void> {
    try {
      const response = await fetch('/build-info.json');

      if (response.ok) {
        const buildInfo = (await response.json()) as unknown;
        this.buildInfo.set(isBuildInfo(buildInfo) ? buildInfo : fallbackBuildInfo);
      }
    } catch {
      this.buildInfo.set(fallbackBuildInfo);
    }
  }
}

function formatEasternBuildTime(builtAt: string): string {
  const date = new Date(builtAt);

  if (Number.isNaN(date.getTime())) {
    return 'Build time unavailable';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
    year: 'numeric'
  }).format(date);
}

function isBuildInfo(value: unknown): value is BuildInfo {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const buildInfo = value as Record<keyof BuildInfo, unknown>;

  return (
    typeof buildInfo.builtAt === 'string' &&
    typeof buildInfo.commit === 'string' &&
    (buildInfo.environment === 'local' || buildInfo.environment === 'prod') &&
    typeof buildInfo.version === 'string'
  );
}

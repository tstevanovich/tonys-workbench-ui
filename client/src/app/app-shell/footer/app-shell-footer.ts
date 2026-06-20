import { ChangeDetectionStrategy, Component, type OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

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
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './app-shell-footer.html',
  styleUrl: './app-shell-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellFooter implements OnInit {
  protected readonly buildInfo = signal(fallbackBuildInfo);
  protected readonly currentYear = new Date().getFullYear();
  protected readonly repositoryUrl = 'https://github.com/tstevanovich/tonys-workbench';

  ngOnInit() {
    void this.loadBuildInfo();
  }

  private async loadBuildInfo() {
    try {
      const response = await fetch('/build-info.json');

      if (response.ok) {
        this.buildInfo.set(await response.json());
      }
    } catch {
      this.buildInfo.set(fallbackBuildInfo);
    }
  }
}

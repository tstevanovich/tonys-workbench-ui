import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppShellFooter } from './app-shell/footer/app-shell-footer';
import { AppShellHeader } from './app-shell/header/app-shell-header';
import {
  AppShellNavigation,
  type NavigationItem
} from './app-shell/navigation/app-shell-navigation';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppShellFooter, AppShellHeader, AppShellNavigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly navigationExpanded = signal(true);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { label: 'Home', route: '/', icon: 'dashboard' },
    { label: 'Documentation', route: '/docs', icon: 'article' },
    { label: 'Planner', route: '/planner', icon: 'checklist' },
    { label: 'AI Studio', route: '/ai-studio', icon: 'auto_awesome' },
    { label: 'Code Lab', route: '/code-lab', icon: 'terminal' },
    { label: 'Projects', route: '/projects', icon: 'view_kanban' },
    { label: 'Integrations', route: '/integrations', icon: 'hub' },
    { label: 'Career', route: '/career', icon: 'badge' },
    { label: 'Settings', route: '/settings', icon: 'settings' }
  ];

  protected toggleNavigation(): void {
    this.navigationExpanded.update((expanded) => !expanded);
  }

  protected compactNavigation(): void {
    this.navigationExpanded.set(false);
  }

  protected selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
  }
}

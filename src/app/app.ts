import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { AppShellFooter } from './app-shell/footer/app-shell-footer';
import { AppShellHeader } from './app-shell/header/app-shell-header';
import { AppShellNavigation } from './app-shell/navigation/app-shell-navigation';
import { NavigationItem } from './app-shell/navigation/navigation-item';
import { HomePage } from './home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [AppShellFooter, AppShellHeader, AppShellNavigation, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly navigationOpen = signal(true);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { label: 'Overview', anchor: '#overview', icon: 'dashboard' },
    { label: 'Agents', anchor: '#agents', icon: 'smart_toy' },
    { label: 'Recent activity', anchor: '#activity', icon: 'history' },
    { label: 'Connected tools', anchor: '#tools', icon: 'extension' }
  ];

  protected toggleNavigation(): void {
    this.navigationOpen.update((open) => !open);
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { type NavigationItem } from './navigation-item';

interface QuickAction {
  readonly icon: string;
  readonly label: string;
  readonly route: string;
}

@Component({
  selector: 'app-shell-navigation',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatIconButton],
  templateUrl: './app-shell-navigation.html',
  styleUrl: './app-shell-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellNavigation {
  readonly items = input.required<readonly NavigationItem[]>();
  readonly expanded = input.required<boolean>();
  readonly modeToggled = output<void>();
  readonly linkActivated = output<void>();

  protected readonly quickActions: readonly QuickAction[] = [
    { icon: 'add_circle', label: 'New project', route: '/projects' },
    { icon: 'playlist_add_check', label: 'Create plan', route: '/planner' },
    { icon: 'menu_book', label: 'Open docs', route: '/docs' },
    { icon: 'auto_awesome', label: 'AI chat', route: '/ai-studio' }
  ];
}

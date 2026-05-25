import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { type NavigationItem } from './navigation-item';

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
}

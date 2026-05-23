import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';

import { NavigationItem } from './navigation-item';

@Component({
  selector: 'app-shell-navigation',
  imports: [MatIcon, MatListItem, MatListItemIcon, MatListItemTitle, MatNavList],
  templateUrl: './app-shell-navigation.html',
  styleUrl: './app-shell-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellNavigation {
  readonly items = input.required<readonly NavigationItem[]>();
}

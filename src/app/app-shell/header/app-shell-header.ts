import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

import { type AppTheme } from '../../core/theme/app-theme';

@Component({
  selector: 'app-shell-header',
  imports: [MatButton, MatIcon, MatIconButton, MatToolbar],
  templateUrl: './app-shell-header.html',
  styleUrl: './app-shell-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellHeader {
  readonly activeTheme = input.required<AppTheme>();
  readonly navigationOpen = input.required<boolean>();
  readonly themeToggled = output<void>();
  readonly navigationToggled = output<void>();
}

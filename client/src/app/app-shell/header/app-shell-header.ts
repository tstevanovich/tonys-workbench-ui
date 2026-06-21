import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

import { type AppTheme } from '../../core/theme/app-theme';

@Component({
  selector: 'app-shell-header',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatToolbar,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './app-shell-header.html',
  styleUrl: './app-shell-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellHeader {
  protected readonly repositoryUrl = 'https://github.com/tstevanovich/tonys-workbench-ui';
  readonly activeTheme = input.required<AppTheme>();
  readonly themes = input.required<readonly AppTheme[]>();
  readonly navigationExpanded = input.required<boolean>();
  readonly themeSelected = output<string>();
  readonly navigationToggled = output<void>();
}

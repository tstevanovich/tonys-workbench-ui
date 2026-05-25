import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shell-footer',
  imports: [MatButton, MatIcon, RouterLink],
  templateUrl: './app-shell-footer.html',
  styleUrl: './app-shell-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellFooter {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly repositoryUrl = 'https://github.com/tstevanovich/tonys-workbench';
}

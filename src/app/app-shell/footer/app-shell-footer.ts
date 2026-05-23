import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-shell-footer',
  imports: [MatButton],
  templateUrl: './app-shell-footer.html',
  styleUrl: './app-shell-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellFooter {}

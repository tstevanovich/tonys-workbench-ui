import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-shell-header',
  imports: [MatButton, MatIcon, MatIconButton, MatToolbar],
  templateUrl: './app-shell-header.html',
  styleUrl: './app-shell-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellHeader {
  readonly navigationOpen = input.required<boolean>();
  readonly navigationToggled = output<void>();
}

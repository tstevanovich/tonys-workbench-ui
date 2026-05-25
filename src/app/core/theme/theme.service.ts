import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { appThemes, defaultAppTheme } from './app-theme';

const storageKey = 'tonys-workbench-theme';
const themeClassPrefix = 'app-theme-';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly activeThemeId = signal(this.readStoredThemeId());

  readonly themes = appThemes;
  readonly activeTheme = computed(
    () => appThemes.find((theme) => theme.id === this.activeThemeId()) ?? defaultAppTheme
  );

  constructor() {
    effect(() => {
      const theme = this.activeTheme();
      const root = this.document.documentElement;

      root.classList.remove(...appThemes.map((item) => `${themeClassPrefix}${item.id}`));
      root.classList.add(`${themeClassPrefix}${theme.id}`);
      globalThis.localStorage?.setItem(storageKey, theme.id);
    });
  }

  cycleTheme(): void {
    const activeIndex = appThemes.findIndex((theme) => theme.id === this.activeTheme().id);
    const nextTheme = appThemes[(activeIndex + 1) % appThemes.length] ?? defaultAppTheme;

    this.activeThemeId.set(nextTheme.id);
  }

  setTheme(themeId: string): void {
    if (appThemes.some((theme) => theme.id === themeId)) {
      this.activeThemeId.set(themeId);
    }
  }

  private readStoredThemeId(): string {
    const storedThemeId = globalThis.localStorage?.getItem(storageKey);

    if (storedThemeId && appThemes.some((theme) => theme.id === storedThemeId)) {
      return storedThemeId;
    }

    return defaultAppTheme.id;
  }
}

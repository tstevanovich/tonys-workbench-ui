export interface AppTheme {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

export const appThemes: readonly AppTheme[] = [
  { id: 'azure-light', label: 'Azure light', icon: 'light_mode' },
  { id: 'green-light', label: 'Green light', icon: 'wb_sunny' },
  { id: 'cyan-dark', label: 'Cyan dark', icon: 'dark_mode' },
  { id: 'rose-dark', label: 'Rose dark', icon: 'nights_stay' }
];

export const defaultAppTheme = appThemes[0];

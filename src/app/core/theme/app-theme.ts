export interface AppTheme {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly swatch: string;
}

export const appThemes: readonly AppTheme[] = [
  { id: 'azure-light', label: 'Azure light', icon: 'light_mode', swatch: '#005cbb' },
  { id: 'green-light', label: 'Green light', icon: 'wb_sunny', swatch: '#146c2e' },
  { id: 'cyan-dark', label: 'Cyan dark', icon: 'dark_mode', swatch: '#00acc1' },
  { id: 'rose-dark', label: 'Rose dark', icon: 'nights_stay', swatch: '#c2185b' }
];

export const defaultAppTheme = appThemes[0];

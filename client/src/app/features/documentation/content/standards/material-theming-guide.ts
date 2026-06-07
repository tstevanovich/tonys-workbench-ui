import { type DocumentationArticle } from '../../documentation.model';

export const MaterialThemingGuideArticle: DocumentationArticle = {
  id: 'material-theming-guide',
  title: 'Material Theming Guide',
  summary: 'How Material 3 themes, design tokens, and runtime theme switching are handled.',
  sections: [
    {
      heading: 'Baseline',
      bullets: [
        'Use Angular Material 3 theming as the foundation for application color, typography, density, and component tokens.',
        'Define Material themes in client/src/material-theme.scss with @angular/material Sass APIs.',
        'Use Inter as the bundled primary UI font, with system UI fonts as fallbacks.',
        'Use Material system tokens such as --mat-sys-primary, --mat-sys-surface, --mat-sys-on-surface, and --mat-sys-outline-variant in component styles.',
        'Use app-level custom properties only for tokens that do not come from Material, such as --app-theme-swatch.'
      ]
    },
    {
      heading: 'Theme Definitions',
      markdown: `
| Theme | Type | Primary Palette | Tertiary Palette |
| --- | --- | --- | --- |
| Azure light | Light | Azure | Blue |
| Green light | Light | Green | Spring green |
| Cyan dark | Dark | Cyan | Azure |
| Rose dark | Dark | Rose | Orange |
`
    },
    {
      heading: 'Runtime Switching',
      bullets: [
        'Keep available theme metadata in client/src/app/core/theme/app-theme.ts.',
        'Use ThemeService as the single runtime API for reading, applying, and persisting the selected theme.',
        'Apply the active theme by setting an app-theme-* class on the document root.',
        'Persist the selected theme in localStorage so the app restores the user choice on reload.',
        'Use the header theme menu for user-facing theme selection instead of scattering theme controls across features.'
      ]
    },
    {
      heading: 'Typography',
      bullets: [
        'Use @fontsource/inter so the primary UI font is bundled with the application instead of depending on a user-installed font or an external font service.',
        'Set both Material plain-family and brand-family to the same app font stack so body text, labels, headings, and Material components feel consistent.',
        'Keep the fallback stack after Inter so the app remains usable if a font file fails to load.',
        'Use the Material Symbols font only for icons and keep monospace fonts reserved for code snippets.'
      ]
    },
    {
      heading: 'Component Styling Rules',
      bullets: [
        'Prefer Material tokens over hard-coded colors in component SCSS.',
        'Use semantic tokens by role, not by visual guess: surface for backgrounds, on-surface for text, primary for primary actions, error for destructive or invalid states.',
        'Keep layout styles local to components, but keep theme generation centralized in client/src/material-theme.scss.',
        'Do not introduce separate theme systems, CSS frameworks, or one-off color palettes for individual features.',
        'Check light and dark themes when changing shared components, documentation rendering, code highlighting, or shell navigation.'
      ]
    },
    {
      heading: 'Adding A Theme',
      bullets: [
        'Add the Material theme class in client/src/material-theme.scss.',
        'Add matching metadata in appThemes with id, label, icon, and swatch.',
        'Use a stable app-theme-* id because it is persisted in localStorage.',
        'Verify the header menu, code blocks, tables, navigation, focus states, and accessibility checks in the new theme.'
      ]
    }
  ]
};

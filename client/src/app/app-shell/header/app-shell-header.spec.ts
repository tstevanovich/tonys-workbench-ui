import { OverlayContainer } from '@angular/cdk/overlay';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { appThemes } from '../../core/theme/app-theme';
import { AppShellHeader } from './app-shell-header';

describe('AppShellHeader', () => {
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellHeader],
      providers: [provideRouter([])]
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render the app brand, logo, and repository link', () => {
    const fixture = createHeader();

    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector<HTMLAnchorElement>('.brand');
    const logo = brand?.querySelector<HTMLImageElement>('img');
    const repositoryLink = compiled.querySelector<HTMLAnchorElement>(
      'a[aria-label="Open GitHub repository"]'
    );

    expect(brand?.getAttribute('href')).toBe('/');
    expect(brand?.getAttribute('aria-label')).toBe("Tony's Workbench home");
    expect(brand?.textContent).toContain("Tony's Workbench");
    expect(logo?.getAttribute('ngSrc')).toBe('/brand/tonys-workbench-logo.png');
    expect(logo?.getAttribute('width')).toBe('36');
    expect(logo?.getAttribute('height')).toBe('36');
    expect(logo?.getAttribute('alt')).toBe('');
    expect(logo?.getAttribute('aria-hidden')).toBe('true');
    expect(repositoryLink?.href).toBe('https://github.com/tstevanovich/tonys-workbench-ui');
    expect(repositoryLink?.target).toBe('_blank');
    expect(repositoryLink?.rel).toContain('noopener');
    expect(repositoryLink?.rel).toContain('noreferrer');
  });

  it('should describe and emit navigation toggle actions', () => {
    const fixture = createHeader({ navigationExpanded: false });
    const navigationToggled = vi.fn();
    fixture.componentInstance.navigationToggled.subscribe(navigationToggled);
    const toggle = fixture.nativeElement.querySelector('.navigation-toggle') as HTMLButtonElement;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Expand navigation');

    toggle.click();

    expect(navigationToggled).toHaveBeenCalledOnce();

    fixture.componentRef.setInput('navigationExpanded', true);
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Compact navigation');
  });

  it('should render the active theme state and emit theme selections', async () => {
    const fixture = createHeader({ activeThemeIndex: 1 });
    const themeSelected = vi.fn();
    fixture.componentInstance.themeSelected.subscribe(themeSelected);
    const trigger = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;

    expect(trigger.getAttribute('aria-label')).toBe('Current theme: Green light. Open theme menu');
    expect(trigger.getAttribute('title')).toBe('Current theme: Green light');

    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const overlayElement = overlayContainer.getContainerElement();
    const menuItems = Array.from(
      overlayElement.querySelectorAll<HTMLButtonElement>('.theme-menu-item')
    );

    expect(menuItems).toHaveLength(appThemes.length);
    expect(menuItems[1].classList.contains('theme-menu-item-active')).toBe(true);
    expect(menuItems[1].getAttribute('aria-current')).toBe('true');
    expect(menuItems[1].textContent).toContain('radio_button_checked');
    expect(menuItems[0].textContent).toContain('radio_button_unchecked');
    expect(menuItems[0].textContent).toContain('Azure light');

    menuItems[2].click();

    expect(themeSelected).toHaveBeenCalledWith('cyan-dark');
  });

  it('should render the remaining header actions', () => {
    const fixture = createHeader();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('button[aria-label="Search"] mat-icon')).toBeTruthy();
    expect(compiled.querySelector('button[matButton]')?.textContent).toContain('Sign in');
    expect(compiled.querySelector('button[matButton] mat-icon')).toBeTruthy();
  });
});

function createHeader(options?: {
  readonly activeThemeIndex?: number;
  readonly navigationExpanded?: boolean;
}): ComponentFixture<AppShellHeader> {
  const fixture = TestBed.createComponent(AppShellHeader);
  fixture.componentRef.setInput('activeTheme', appThemes[options?.activeThemeIndex ?? 0]);
  fixture.componentRef.setInput('themes', appThemes);
  fixture.componentRef.setInput('navigationExpanded', options?.navigationExpanded ?? true);
  fixture.detectChanges();

  return fixture;
}

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the application shell', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="#main-content"]')?.textContent).toContain(
      'Skip to main content'
    );
    expect(compiled.querySelector('app-shell-header header')).toBeTruthy();
    expect(compiled.querySelector('app-shell-navigation aside')).toBeTruthy();
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-shell-footer footer')).toBeTruthy();
  });

  it('should compact primary navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.navigation-toggle') as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.app-shell.navigation-compact')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-shell-navigation')).toBeTruthy();
  });

  it('should compact primary navigation after a navigation link is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    const docsLink = fixture.nativeElement.querySelector(
      'app-shell-navigation a[href="/docs"]'
    ) as HTMLAnchorElement;

    docsLink.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/docs/documentation-home');
    expect(fixture.nativeElement.querySelector('.app-shell.navigation-compact')).toBeTruthy();
  });

  it('should render the documentation route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    await router.navigateByUrl('/docs');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(router.url).toBe('/docs/documentation-home');
    expect(compiled.querySelector('.documentation-layout')).toBeTruthy();
    expect(compiled.textContent).toContain('Application playbook');
    expect(compiled.textContent).toContain('Documentation Home');
  });

  it('should render a direct documentation article route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    fixture.detectChanges();
    await fixture.whenStable();

    await router.navigateByUrl('/docs/api-guide');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.documentation-layout')).toBeTruthy();
    expect(compiled.textContent).toContain('API Guide');
  });
});

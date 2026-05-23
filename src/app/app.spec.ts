import { TestBed } from '@angular/core/testing';

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
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="#main-content"]')?.textContent).toContain(
      'Skip to main content'
    );
    expect(compiled.querySelector('app-shell-header header')).toBeTruthy();
    expect(compiled.querySelector('app-shell-navigation aside')).toBeTruthy();
    expect(compiled.querySelector('main h1')?.textContent).toContain('Build useful AI agents');
    expect(compiled.querySelector('app-shell-footer footer')).toBeTruthy();
  });

  it('should toggle primary navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const toggle = fixture.nativeElement.querySelector('.navigation-toggle') as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-shell-navigation')).toBeNull();
  });
});

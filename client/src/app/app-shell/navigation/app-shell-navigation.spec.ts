import { ChangeDetectionStrategy, Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { AppShellNavigation, type NavigationItem } from './app-shell-navigation';

const navigationItems: readonly NavigationItem[] = [
  { label: 'Home', route: '/', icon: 'dashboard' },
  { label: 'Documentation', route: '/docs', icon: 'article' },
  { label: 'Planner', route: '/planner', icon: 'checklist' }
];

describe('AppShellNavigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellNavigation],
      providers: [
        provideRouter([
          { path: '', component: EmptyRouteComponent },
          { path: 'docs', component: EmptyRouteComponent },
          { path: 'planner', component: EmptyRouteComponent }
        ])
      ]
    }).compileComponents();
  });

  it('should render expanded primary navigation links', () => {
    const fixture = createNavigation();

    const compiled = fixture.nativeElement as HTMLElement;
    const aside = compiled.querySelector('aside');
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.navigation-list a'));
    const toggle = compiled.querySelector<HTMLButtonElement>('.navigation-mode-toggle');

    expect(aside?.id).toBe('primary-navigation');
    expect(aside?.classList.contains('compact-navigation')).toBe(false);
    expect(compiled.querySelector('nav')?.getAttribute('aria-label')).toBe('Primary navigation');
    expect(compiled.querySelector('.navigation-label')?.textContent).toContain('Workspace');
    expect(toggle?.getAttribute('aria-label')).toBe('Compact navigation');
    expect(toggle?.getAttribute('title')).toBe('Compact navigation');
    expect(links).toHaveLength(navigationItems.length);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/docs', '/planner']);
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Home',
      'Documentation',
      'Planner'
    ]);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].querySelector('mat-icon')).toBeTruthy();
  });

  it('should render compact navigation state', () => {
    const fixture = createNavigation({ expanded: false });
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('aside')?.classList.contains('compact-navigation')).toBe(true);
    expect(compiled.querySelector('.navigation-mode-toggle')?.getAttribute('aria-label')).toBe(
      'Expand navigation'
    );
    expect(compiled.querySelector('.navigation-mode-toggle')?.getAttribute('title')).toBe(
      'Expand navigation'
    );
  });

  it('should emit mode and link activation events', () => {
    const fixture = createNavigation();
    const compiled = fixture.nativeElement as HTMLElement;
    const modeToggled = vi.fn();
    const linkActivated = vi.fn();
    fixture.componentInstance.modeToggled.subscribe(modeToggled);
    fixture.componentInstance.linkActivated.subscribe(linkActivated);

    compiled.querySelector<HTMLButtonElement>('.navigation-mode-toggle')?.click();
    compiled.querySelector<HTMLAnchorElement>('a[href="/docs"]')?.click();

    expect(modeToggled).toHaveBeenCalledOnce();
    expect(linkActivated).toHaveBeenCalledOnce();
  });

  it('should mark the current route as active', async () => {
    const fixture = createNavigation();
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/docs');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const docsLink = compiled.querySelector<HTMLAnchorElement>('a[href="/docs"]');

    expect(docsLink?.classList.contains('active-navigation-item')).toBe(true);
  });
});

function createNavigation(options?: {
  readonly expanded?: boolean;
  readonly items?: readonly NavigationItem[];
}): ComponentFixture<AppShellNavigation> {
  const fixture = TestBed.createComponent(AppShellNavigation);
  fixture.componentRef.setInput('items', options?.items ?? navigationItems);
  fixture.componentRef.setInput('expanded', options?.expanded ?? true);
  fixture.detectChanges();

  return fixture;
}

@Component({
  selector: 'app-empty-route',
  template: '{{ routeReady }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class EmptyRouteComponent {
  protected readonly routeReady = true;
}

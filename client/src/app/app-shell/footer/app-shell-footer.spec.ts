import { type Signal, type WritableSignal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShellFooter } from './app-shell-footer';

interface TestBuildInfo {
  builtAt: string;
  commit: string;
  environment: 'local' | 'prod';
  version: string;
}

interface FooterHarness {
  readonly buildInfo: WritableSignal<TestBuildInfo>;
  readonly currentYear: number;
  readonly formattedBuiltAt: Signal<string>;
  loadBuildInfo(): Promise<void>;
}

const fallbackBuildInfo: TestBuildInfo = {
  builtAt: 'local',
  commit: 'local',
  environment: 'local',
  version: '0.0.0'
};

describe('AppShellFooter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellFooter]
    }).compileComponents();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should render the footer identity and current year', () => {
    mockBuildInfoResponse(fallbackBuildInfo);
    const fixture = TestBed.createComponent(AppShellFooter);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer-mark')?.textContent?.trim()).toBe('TW');
    expect(compiled.querySelector('.footer-title')?.textContent).toContain("Tony's Workbench");
    expect(compiled.querySelector('.footer-meta')?.textContent).toContain(
      `Copyright ${new Date().getFullYear()}.`
    );
    expect(footerHarness(fixture).currentYear).toBe(new Date().getFullYear());
  });

  it('should load and render valid production build info', async () => {
    const buildInfo: TestBuildInfo = {
      builtAt: '2026-06-21T14:30:00.000Z',
      commit: 'abc1234',
      environment: 'prod',
      version: '1.2.3'
    };
    mockBuildInfoResponse(buildInfo);
    const fixture = TestBed.createComponent(AppShellFooter);
    const component = footerHarness(fixture);

    await component.loadBuildInfo();
    fixture.detectChanges();

    expect(component.buildInfo()).toEqual(buildInfo);
    expect(component.formattedBuiltAt()).toContain('Jun 21, 2026');
    expect(fixture.nativeElement.textContent).toContain('prod v1.2.3 abc1234');
    expect(fixture.nativeElement.textContent).toContain('Built Jun 21, 2026');
  });

  it('should accept local build info as valid build metadata', async () => {
    const buildInfo: TestBuildInfo = {
      builtAt: '2026-06-21T15:30:00.000Z',
      commit: 'local-commit',
      environment: 'local',
      version: '0.0.1'
    };
    mockBuildInfoResponse(buildInfo);
    const fixture = TestBed.createComponent(AppShellFooter);
    const component = footerHarness(fixture);

    await component.loadBuildInfo();

    expect(component.buildInfo()).toEqual(buildInfo);
  });

  it.each([
    null,
    'not build info',
    { builtAt: 123, commit: 'abc1234', environment: 'local', version: '1.2.3' },
    { builtAt: '2026-06-21T14:30:00.000Z', commit: 123, environment: 'local', version: '1.2.3' },
    {
      builtAt: '2026-06-21T14:30:00.000Z',
      commit: 'abc1234',
      environment: 'staging',
      version: '1.2.3'
    },
    { builtAt: '2026-06-21T14:30:00.000Z', commit: 'abc1234', environment: 'local', version: 123 }
  ])('should use fallback build info for invalid payload %#', async (payload: unknown) => {
    mockBuildInfoResponse(payload);
    const fixture = TestBed.createComponent(AppShellFooter);
    const component = footerHarness(fixture);

    await component.loadBuildInfo();
    fixture.detectChanges();

    expect(component.buildInfo()).toEqual(fallbackBuildInfo);
    expect(component.formattedBuiltAt()).toBe('Build time unavailable');
    expect(fixture.nativeElement.textContent).toContain('local v0.0.0 local');
  });

  it('should keep fallback build info when the build info response is not ok', async () => {
    mockBuildInfoResponse({ ignored: true }, false);
    const fixture = TestBed.createComponent(AppShellFooter);
    const component = footerHarness(fixture);

    await component.loadBuildInfo();

    expect(component.buildInfo()).toEqual(fallbackBuildInfo);
  });

  it('should use fallback build info when loading build metadata fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network failed')));
    const fixture = TestBed.createComponent(AppShellFooter);
    const component = footerHarness(fixture);

    await component.loadBuildInfo();

    expect(component.buildInfo()).toEqual(fallbackBuildInfo);
  });
});

function footerHarness(fixture: ComponentFixture<AppShellFooter>): FooterHarness {
  return fixture.componentInstance as unknown as FooterHarness;
}

function mockBuildInfoResponse(payload: unknown, ok = true): void {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(payload),
      ok
    })
  );
}

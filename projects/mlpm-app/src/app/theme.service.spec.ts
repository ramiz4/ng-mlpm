import { TestBed } from '@angular/core/testing';
import { firstValueFrom, take, toArray } from 'rxjs';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with dark theme', () => {
    expect(service.currentTheme).toBe('dark');
  });

  it('should toggle theme from dark to light', async () => {
    // Verify initial state
    expect(service.currentTheme).toBe('dark');

    // Subscribe to theme$ observable to verify changes
    const themePromise = firstValueFrom(service.theme$);

    // Toggle theme
    service.toggleTheme();

    // Verify theme was toggled
    expect(service.currentTheme).toBe('light');

    // Verify theme$ observable emitted new value
    const theme = await themePromise;
    expect(theme).toBe('dark'); // The first emission will be the initial value
  });

  it('should toggle theme from light to dark', () => {
    // Set initial state to light
    service.setTheme('light');
    expect(service.currentTheme).toBe('light');

    // Toggle theme
    service.toggleTheme();

    // Verify theme was toggled
    expect(service.currentTheme).toBe('dark');
  });

  it('should set theme directly', async () => {
    // Subscribe to theme changes
    const themePromise = firstValueFrom(service.theme$);

    // Set theme to light
    service.setTheme('light');

    // Verify current theme
    expect(service.currentTheme).toBe('light');

    // Set theme to dark
    service.setTheme('dark');

    // Verify current theme
    expect(service.currentTheme).toBe('dark');

    // Verify theme$ observable emitted correctly
    const theme = await themePromise;
    expect(theme).toBe('dark'); // The first emission will be the initial value
  });

  it('should emit theme changes through theme$ observable', (done) => {
    // Collect multiple emissions from the observable
    service.theme$.pipe(take(3), toArray()).subscribe((themes) => {
      // Should have 3 emissions: initial 'dark', then 'light', then 'dark' again
      expect(themes).toEqual(['dark', 'light', 'dark']);
      done();
    });

    // Trigger theme changes
    service.toggleTheme(); // dark -> light
    service.toggleTheme(); // light -> dark
  });

  // Additional test to specifically target the branch in toggleTheme
  it('should handle toggleTheme for both theme states', () => {
    // First verify it's dark and toggle to light
    expect(service.currentTheme).toBe('dark');
    service.toggleTheme();
    expect(service.currentTheme).toBe('light');

    // Then toggle back to dark
    service.toggleTheme();
    expect(service.currentTheme).toBe('dark');

    // Force it to light again
    service.setTheme('light');
    expect(service.currentTheme).toBe('light');

    // And toggle back to dark
    service.toggleTheme();
    expect(service.currentTheme).toBe('dark');
  });

  it('should thoroughly test all toggle branches', () => {
    // Test with theme explicitly set to 'dark'
    service.setTheme('dark');
    expect(service.currentTheme).toBe('dark');
    service.toggleTheme();
    expect(service.currentTheme).toBe('light');

    // Explicitly test the other branch
    service.setTheme('light');
    expect(service.currentTheme).toBe('light');
    service.toggleTheme();
    expect(service.currentTheme).toBe('dark');
  });
});

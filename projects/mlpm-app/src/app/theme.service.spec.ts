import { TestBed } from '@angular/core/testing';
import { firstValueFrom, take, toArray } from 'rxjs';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let originalMatchMedia: typeof window.matchMedia;

  beforeAll(() => {
    // Store the original matchMedia function
    originalMatchMedia = window.matchMedia;
  });

  afterAll(() => {
    // Restore the original matchMedia function after all tests
    window.matchMedia = originalMatchMedia;
  });

  // Standard dark mode test
  describe('with dark mode preference', () => {
    beforeEach(() => {
      // Mock matchMedia to return 'prefers dark mode'
      window.matchMedia = (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)' ? true : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
      });

      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with dark theme when user prefers dark mode', () => {
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
  });

  // Standard light mode test
  describe('with light mode preference', () => {
    beforeEach(() => {
      // Mock matchMedia to return 'prefers light mode'
      window.matchMedia = (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)' ? false : true,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
      });

      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });

    it('should initialize with light theme when user prefers light mode', () => {
      expect(service.currentTheme).toBe('light');
    });

    it('should toggle theme from light to dark', () => {
      // Verify initial state
      expect(service.currentTheme).toBe('light');

      // Toggle theme
      service.toggleTheme();

      // Verify theme was toggled
      expect(service.currentTheme).toBe('dark');
    });
  });

  // General theme manipulation tests with no preference
  describe('theme manipulation', () => {
    beforeEach(() => {
      // Mock matchMedia to ensure consistent behavior
      window.matchMedia = (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)' ? false : true, // Default to light theme
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
      });

      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
    });

    it('should set theme directly', async () => {
      // First verify the initial theme
      expect(service.currentTheme).toBe('light');
      
      // Subscribe to theme changes
      const themePromise = firstValueFrom(service.theme$);

      // Set theme to dark
      service.setTheme('dark');

      // Verify current theme
      expect(service.currentTheme).toBe('dark');

      // Set theme to light
      service.setTheme('light');

      // Verify current theme
      expect(service.currentTheme).toBe('light');

      // Verify theme$ observable emitted correctly
      const theme = await themePromise;
      expect(theme).toBe('light'); // The first emission will be the initial value
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
});

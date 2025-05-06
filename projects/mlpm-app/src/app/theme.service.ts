import { Injectable } from '@angular/core';
import { MenuColorTheme } from 'mlpm';
import { BehaviorSubject } from 'rxjs';

type ThemeType = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeType>('light');
  theme$ = this.themeSubject.asObservable();

  // create a map of key 'dark' | 'light' to MenuColorTheme
  themeMap: Record<ThemeType, Partial<MenuColorTheme>> = {
    dark: {
      primaryBackground: '#212121', // Dark background
      secondaryBackground: '#424242', // Slightly lighter background
      tertiaryBackground: '#616161', // Even lighter background

      primaryText: '#ffffff', // White text
      secondaryText: '#e0e0e0', // Light grey text
      tertiaryText: '#b0bec5', // Grey text
      
      primaryAccent: '#ff4081', // Pink accent
      secondaryAccent: '#f50057', // Pink accent
      tertiaryAccent: '#b0023f', // Pink accent
      
      primaryHover: '#616161', // Hover color
      secondaryHover: '#757575', // Slightly lighter hover color
      tertiaryHover: '#9e9e9e', // Even lighter hover color
    },
    light: {
      // light theme with pink accents
      primaryBackground: '#ffffff', // Light background
      secondaryBackground: '#f5f5f5', // Slightly darker background
      tertiaryBackground: '#eeeeee', // Even darker background
      primaryText: '#212121', // Dark text
      secondaryText: '#424242', // Slightly darker text
      tertiaryText: '#616161', // Even darker text
      primaryAccent: '#ff4081', // Pink accent
      secondaryAccent: '#ff4081', // Pink accent
      tertiaryAccent: '#ff4081', // Pink accent
      primaryHover: '#e0e0e0', // Hover color
      secondaryHover: '#bdbdbd', // Slightly darker hover color
      tertiaryHover: '#9e9e9e', // Even darker hover color
    },
  };

  constructor() {
    // Set the initial theme based on the user's preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  toggleTheme(): void {
    const theme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(theme);
  }

  get currentTheme(): 'dark' | 'light' {
    return this.themeSubject.value;
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.setThemeClass(theme);
    this.themeSubject.next(theme);
  }

  private setThemeClass(themeType: ThemeType): void {
    const theme = this.themeMap[themeType];
    if (theme.primaryBackground) {
      document.documentElement.style.setProperty(
        '--primary-background',
        theme.primaryBackground
      );
    }
    if (theme.secondaryBackground) {
      document.documentElement.style.setProperty(
        '--secondary-background',
        theme.secondaryBackground
      );
    }
    if (theme.tertiaryBackground) {
      document.documentElement.style.setProperty(
        '--tertiary-background',
        theme.tertiaryBackground
      );
    }
    if (theme.primaryText) {
      document.documentElement.style.setProperty(
        '--primary-text',
        theme.primaryText
      );
    }
    if (theme.secondaryText) {
      document.documentElement.style.setProperty(
        '--secondary-text',
        theme.secondaryText
      );
    }
    if (theme.tertiaryText) {
      document.documentElement.style.setProperty(
        '--tertiary-text',
        theme.tertiaryText
      );
    }
    if (theme.primaryAccent) {
      document.documentElement.style.setProperty(
        '--primary-accent',
        theme.primaryAccent
      );
    }
    if (theme.secondaryAccent) {
      document.documentElement.style.setProperty(
        '--secondary-accent',
        theme.secondaryAccent
      );
    }
    if (theme.tertiaryAccent) {
      document.documentElement.style.setProperty(
        '--tertiary-accent',
        theme.tertiaryAccent
      );
    }
    if (theme.primaryHover) {
      document.documentElement.style.setProperty(
        '--primary-hover',
        theme.primaryHover
      );
    }
    if (theme.secondaryHover) {
      document.documentElement.style.setProperty(
        '--secondary-hover',
        theme.secondaryHover
      );
    }
    if (theme.tertiaryHover) {
      document.documentElement.style.setProperty(
        '--tertiary-hover',
        theme.tertiaryHover
      );
    }
  }
}

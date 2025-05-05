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
  themeMap: Record<ThemeType, MenuColorTheme> = {
    dark: {
      primary: '#212121', // Dark background
      secondary: '#424242', // Slightly lighter background
      text: '#ffffff', // White text
      accent: '#ff4081', // Pink accent
      hover: '#616161', // Hover color
    },
    light: {
      primary: '#ffffff', // Light background
      secondary: '#f5f5f5', // Slightly darker background
      text: '#000000', // Black text
      accent: '#ff4081', // Pink accent
      hover: '#eeeeee', // Hover color
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

  private setThemeClass(theme: ThemeType): void {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }
}

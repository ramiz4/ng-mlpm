import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<'dark' | 'light'>('dark');
  theme$ = this.themeSubject.asObservable();

  toggleTheme(): void {
    const theme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.themeSubject.next(theme);
  }

  get currentTheme(): 'dark' | 'light' {
    return this.themeSubject.value;
  }

  setTheme(theme: 'dark' | 'light'): void {
    this.themeSubject.next(theme);
  }
}
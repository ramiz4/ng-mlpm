import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(true);
  darkTheme$ = this.darkThemeSubject.asObservable();

  setDarkTheme(isDark: boolean): void {
    this.darkThemeSubject.next(isDark);
  }
}
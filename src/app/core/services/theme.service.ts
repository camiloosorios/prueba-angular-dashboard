import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme();
  }

  public toggleTheme(): void {
    if (this.themeSubject.value === 'light') {
      this.themeSubject.next('dark')
    } else {
      this.themeSubject.next('light')
    }
    this.applyTheme();
  }

  public setTheme(theme: 'light' | 'dark'): void {
    this.themeSubject.next(theme);
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.themeSubject.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

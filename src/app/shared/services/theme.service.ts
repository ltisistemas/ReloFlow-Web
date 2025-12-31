import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'theme';
  private readonly DEFAULT_THEME: Theme = 'light';

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const savedTheme = this.getSavedTheme();
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.DEFAULT_THEME);
    }
  }

  getCurrentTheme(): Theme {
    const savedTheme = this.getSavedTheme();
    return savedTheme || this.DEFAULT_THEME;
  }

  setTheme(theme: Theme): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private getSavedTheme(): Theme | null {
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const saved = localStorage.getItem(this.THEME_KEY);
    return (saved === 'light' || saved === 'dark') ? saved : null;
  }
}


import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from './theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme = Theme.LIGHT;

  private themeChangedSubject = new BehaviorSubject(this.currentTheme);

  themeChanged$: Observable<Theme>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.themeChanged$ = this.themeChangedSubject.asObservable();
    this.init();
  }

  private updateCurrentTheme(theme: Theme) {
    this.currentTheme = theme;
    this.themeChangedSubject.next(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  private init() {
    const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
    let initTheme = localStorage.getItem('theme') as Theme;
    if (!initTheme) {
      deviceMode.matches ? (initTheme = Theme.DARK) : (initTheme = Theme.LIGHT);
    }
    this.updateCurrentTheme(initTheme);
    this.document.body.classList.add(this.currentTheme);
  }

  toggleMode() {
    this.document.body.classList.toggle(Theme.LIGHT);
    this.document.body.classList.toggle(Theme.DARK);
    if (this.currentTheme === Theme.LIGHT) {
      this.updateCurrentTheme(Theme.DARK);
    } else {
      this.updateCurrentTheme(Theme.LIGHT);
    }
  }
}

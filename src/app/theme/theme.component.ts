import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import {
  getMoonSvgDataUrl as getColoredMoonSvg,
  getSunSvgDataUrl as getColoredSunSvg,
} from '../utils';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  styleUrls: ['./theme.component.scss'],
  template: `
    <label class="toggle-switch">
      <input type="checkbox" [checked]="isDark" (change)="toggle()" />
      <span
        class="slider"
        [style.--icon-url]="isDark ? moonSvgDataUrl : sunSvgDataUrl"
      ></span>
    </label>
    <span class="slider-label">{{ isDark ? 'Dark' : 'Light' }}</span>
  `,
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);

  get sunSvgDataUrl() {
    return getColoredSunSvg('#fff');
  }

  get moonSvgDataUrl() {
    return getColoredMoonSvg('#000');
  }

  get isDark() {
    return this.themeService['currentTheme'] === 'dark';
  }

  toggle() {
    this.themeService.toggleMode();
  }
}

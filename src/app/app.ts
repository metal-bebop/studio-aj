import { Component } from '@angular/core';
import { ThemeToggleComponent } from './theme/theme.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <app-theme-toggle></app-theme-toggle>
    </main>
  `,
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
})
export class App {}

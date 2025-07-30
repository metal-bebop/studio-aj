import { Routes } from '@angular/router';
import { ThemeToggleComponent } from './theme/theme.component';
import { GalleryComponent } from './gallery/gallery';

export const routes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'theme', component: ThemeToggleComponent },
];
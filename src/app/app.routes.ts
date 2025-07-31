import { Routes } from '@angular/router';
import { ThemeToggleComponent } from './theme/theme.component';
import { AlbumCollectionComponent } from './albumCollection/albumCollection';
import { AlbumViewComponent } from './albumView/albumView';

export const routes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: AlbumCollectionComponent },
  { path: 'gallery/:albumId', component: AlbumViewComponent },
  { path: 'theme', component: ThemeToggleComponent },
];

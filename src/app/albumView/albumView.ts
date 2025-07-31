import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './albumView.html',
})
export class AlbumViewComponent {
  images: string[] = [];
  title: string = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { images?: string[]; title?: string };
    this.images = state?.images ?? [];
    this.title = state?.title ?? '';
  }
}

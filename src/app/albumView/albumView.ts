import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import GLightbox from 'glightbox';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'app-album-view',
  standalone: true,
  imports: [CommonModule, NgxMasonryModule],
  templateUrl: './albumView.html',
  styleUrls: ['./albumView.scss'],
})
export class AlbumViewComponent {
  images: string[] = [];
  title: string = '';

  private lightbox: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { images?: string[]; title?: string };
    this.images = state?.images ?? [];
    this.title = state?.title ?? '';
  }

  ngAfterViewInit() {
    this.lightbox = GLightbox({
      elements: this.images.map((img) => ({
        href: img,
      })) as any,
    });
  }

  openLightbox(index: number) {
    if (this.lightbox) {
      this.lightbox.openAt(index);
    }
  }

  ngOnDestroy() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }
}

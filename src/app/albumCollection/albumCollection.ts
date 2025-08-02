import { Component } from '@angular/core';
import { AlbumThumbComponent } from '../albumThumb/albumThumb';
import { CommonModule } from '@angular/common';

import manifestJson from '../../../public/assets/albums/manifest.json';

type Manifest = Record<string, string[]>;

const manifest = manifestJson as Manifest;

@Component({
  selector: 'app-album-collection',
  standalone: true,
  imports: [CommonModule, AlbumThumbComponent],
  templateUrl: './albumCollection.html',
  styleUrl: './albumCollection.scss',
})
export class AlbumCollectionComponent {
  protected albums: { title: string; images: string[] }[] = [];

  ngOnInit() {
    (Object.keys(manifest) as Array<keyof typeof manifest>).forEach((key) => {
      this.albums.push({
        title: key,
        images: manifest[key].map((img) => `assets/albums/${key}/${img}`),
      });
    });
  }
}

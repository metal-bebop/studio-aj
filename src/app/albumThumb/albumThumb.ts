import { Component, Input } from '@angular/core';
import { toKebabCase } from '../utils';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-thumb',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './albumThumb.html',
  styleUrl: './albumThumb.scss',
})
export class AlbumThumbComponent {
  @Input() title!: string;
  @Input() images!: { original: string; compressed: string }[];

  protected link: string = '';

  ngOnInit() {
    this.link = `/gallery/${toKebabCase(this.title)}`;
  }
}

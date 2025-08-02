import { Component, Input } from '@angular/core';
import { toKebabCase } from '../utils';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-thumb',
  standalone: true,
  imports: [RouterModule],
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

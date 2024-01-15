import { Component, Input } from '@angular/core';
import { AlbumElement } from '../../interfaces/spotify.interfaces';

@Component({
  selector: 'shared-music-table',
  standalone: true,
  imports: [],
  templateUrl: './music-table.component.html',
  styles: ``
})
export class MusicTableComponent {

  @Input()
  public album!: AlbumElement;

}

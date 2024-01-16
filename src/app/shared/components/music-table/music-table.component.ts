import { Component, Input } from '@angular/core';
import { TracksItem } from '../../interfaces/spotify.interfaces';
import { SpotifyService } from '../../services/spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'shared-music-table',
  standalone: true,
  imports: [],
  templateUrl: './music-table.component.html',
  styles: ``
})
export class MusicTableComponent {
  constructor (private spotifyService: SpotifyService, private sanitizer: DomSanitizer){}

  @Input()
  public tracks!: TracksItem[];

  onClick(str: TracksItem): void{
    console.log("se cae")
    console.log("este es el nombre del album", str);
  }

  embedURL(id: string): SafeResourceUrl{
    return this.spotifyService.embedURL(id)
  }
}

import { Component, Input } from '@angular/core';
import {SpotyCardComponent} from '../../../shared/components/spoty-card/spoty-card.component';
import { TracksItem, AlbumElement, Artist } from '../../interfaces/spotify.interfaces';

@Component({
  selector: 'shared-spoty-card-list',
  standalone: true,
  imports: [SpotyCardComponent],
  templateUrl: './spoty-card-list.component.html',
  styles: ``
})
export class SpotyCardListComponent {
  @Input() showAlbums:boolean=true;
  @Input() showTracks:boolean=false;
  @Input() albums: AlbumElement[] = [];
  @Input() tracks : TracksItem[] = [];

  getAlbumArtits(albums:AlbumElement) : string [] {
    if (albums.artists.length > 0){
      return albums.artists.map(artist => artist.name);
    }
    return [];
  }
  trackArtists(artists:Artist[]) : string [] {
    if (artists.length > 0){
      return artists.map(artist => artist.name);
    }
    return [];
  }
}

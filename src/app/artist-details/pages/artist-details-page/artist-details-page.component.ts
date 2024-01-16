import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AlbumElement, Artist, TracksItem, Tracks} from '../../../shared/interfaces/spotify.interfaces';
import { MusicTableComponent } from "../../../shared/components/music-table/music-table.component";

@Component({
    selector: 'artist-details-page',
    standalone: true,
    templateUrl: './artist-details-page.component.html',
    styles: ``,
    imports: [MusicTableComponent]
})
export class ArtistDetailsPageComponent {

  @Input()
  private idArtista: string = '4oLeXFyACqeem2VImYeBFe';
  private idAlbum: string = '7tWP3OG5dWphctKg4NMACt';
  private typeList: boolean = false; //* Boolean porque seran 2 tipos: Album y Top Canciones (false = Album <> true = Top)


  public album!: AlbumElement;
  public artist!: Artist;
  //public tracksList!: TracksItem[];

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(){
    this.spotifyService.getAccessToken_();
    this.artistInfo(this.idArtista);
    this.albumInfo(this.idAlbum);
  }

  public normalizedData():TracksItem[]{
    let tracksList:TracksItem[] = [];

    if (!this.typeList) {
      let emptyTracks: Tracks = {
        href: '',
        items: [],
        limit: 0,
        next: '',
        offset: 0,
        previous: null,
        total: 0,
      };

      let trackAlbum: AlbumElement = {
        album_type: this.album.album_type,
        artists: [],
        available_markets: [],
        total_tracks: this.album.total_tracks,
        external_urls: this.album.external_urls,
        href: this.album.href,
        id: this.album.id,
        images: this.album.images,
        name: this.album.name,
        release_date: this.album.release_date,
        release_date_precision: this.album.release_date_precision,
        tracks: emptyTracks,
        type: this.album.type,
        uri: this.album.uri,
      };

      // Hacer copia profunda del array original
      let tracks = JSON.parse(JSON.stringify(this.album.tracks.items));

      for (const track of tracks) {
        track.album = trackAlbum;
        tracksList.push(track);
        console.log("iteracion", tracksList)
      }
    } else {
      // aqui el otro lado
    }
    console.log("lo que ocupo", tracksList)
    return tracksList
  }

  artistInfo(id: string):void{
    console.log("search method in search-page.component.ts")
    this.spotifyService.artistInfo(id).subscribe(
      (response) => {this.artist = response, console.log("artist", this.artist)},
      (error) => console.error(error)
    );
  }

  albumInfo(id: string): void {
    console.log("sssss")
    this.spotifyService.albumInfo(id).subscribe(
      (response) => {this.album = response, console.log("album", this.album)},
      (error) => console.error(error)
    );
  }
}

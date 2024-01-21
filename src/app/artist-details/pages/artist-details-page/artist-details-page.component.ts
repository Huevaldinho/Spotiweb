import { Component } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AlbumElement, Artist, TracksItem, Tracks } from '../../../shared/interfaces/spotify.interfaces';
import { MusicTableComponent } from "../../../shared/components/music-table/music-table.component";
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'artist-details-page',
  standalone: true,
  templateUrl: './artist-details-page.component.html',
  styles: ``,
  imports: [MusicTableComponent]
})
export class ArtistDetailsPageComponent {

  private normalized: boolean = false;
  public album!: AlbumElement;
  public artist!: Artist;
  public songsList: TracksItem[] = [];
  public typeInfo!: string;
  public artistId!: string;

  constructor(
    private spotifyService: SpotifyService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.typeInfo = params['type'];
      this.artistId = params['artistId']
      if (this.typeInfo === 'album') { // Albums or singles or compilation
        this.albumInfo(params['id']);
        this.artistInfo(params['artistId'])
      } else {
        this.normalized = true;
        this.artistInfo(this.artistId);
        this.topSongInfo(this.artistId);
      }
    });
  }

  //todo se repite varias veces
  public normalizedData(): TracksItem[] {
    if (!this.normalized) {
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
        this.songsList.push(track);
      }
    }
    this.normalized = true;
    return this.songsList;
  }

  backToSearch(): void {
    //Si no hay ruta guardada, regresa a la página principal
    //Si hay ruta guardada, regresa a la página anterior ('/search')
    this.storageService.getItem('route')?.length > 0 ? this.router.navigate(['/search']) : this.router.navigate(['/']);
  }

  topSongInfo(id: string): void {
    this.spotifyService.topSongsInfo(id).subscribe(
      (response) => { this.songsList = response},
      (error) => console.error(error)
    );
  }

  artistInfo(id: string): void {
    this.spotifyService.artistInfo(id).subscribe(
      (response) => { this.artist = response },
      (error) => console.error(error)
    );
  }

  albumInfo(id: string): void {
    this.spotifyService.albumInfo(id).subscribe(
      (response) => { this.album = response },
      (error) => console.error(error)
    );
  }
}

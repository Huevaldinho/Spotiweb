import { Component } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AlbumElement, Artist, TracksItem, Tracks} from '../../../shared/interfaces/spotify.interfaces';
import { MusicTableComponent } from "../../../shared/components/music-table/music-table.component";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'artist-details-page',
    standalone: true,
    templateUrl: './artist-details-page.component.html',
    styles: ``,
    imports: [MusicTableComponent]
})
export class ArtistDetailsPageComponent {


  public typeList: boolean = false; //* Boolean porque seran 2 tipos: Album y Top Canciones (false = Album <> true = Top)
  private normalized: boolean = false;
  public album!: AlbumElement;
  public artist!: Artist;
  public songsList: TracksItem[] =[];
  public artistId!: string;

  constructor(
      private spotifyService: SpotifyService,
      private route:ActivatedRoute,
      private router: Router
  ){}

  //todo revisar esta vara
  ngOnInit(){
    this.route.params.subscribe(params => {
      const type = params['type'];
      this.artistId = params['artistId']
      if (type==='album' || type==='single' || type==='compilation'){ // Albums or singles or compilation
        this.typeList = false;
        this.albumInfo( params['id']);
        this.artistInfo( params['artistId'])
      }else{
        this.typeList = true;
        this.artistInfo(this.artistId);
        this.topSongInfo(this.artistId);
      }
    });
  }

  //todo se repite varias veces
  public normalizedData():TracksItem[]{

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
    console.log("repeticiones")
    this.normalized = true;
    return this.songsList;
  }

  backToSearch(): void{
    localStorage.removeItem('idArtista');
    localStorage.setItem('returnFlag', JSON.stringify(true)) //todo recordar quitar esta parte si se va a trabajar diferente el set y el get del LocalStorage
    this.router.navigate(['/search']);

  }

  topSongInfo(id: string):void{
    this.spotifyService.topSongsInfo(id).subscribe(
      (response) => {this.songsList = response, console.log(this.songsList)},
      (error) => console.error(error)
    );
  }

  artistInfo(id: string):void{
    console.log("de donde estoy entrando?")
    this.spotifyService.artistInfo(id).subscribe(
      (response) => {this.artist = response, console.log("artist", this.artist)},
      (error) => console.error(error)
    );
  }

  albumInfo(id: string): void {
    this.spotifyService.albumInfo(id).subscribe(
      (response) => {this.album = response, console.log("album", this.album)},
      (error) => console.error(error)
    );
  }
}

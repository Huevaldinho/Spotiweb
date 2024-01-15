import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AlbumElement, Artist } from '../../../shared/interfaces/spotify.interfaces';
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


  public album!: AlbumElement;
  public artist!: Artist;

  constructor( private spotifyService: SpotifyService){}

  ngOnInit(){
    this.spotifyService.getAccessToken_();
    this.artistInfo(this.idArtista);
    this.albumInfo(this.idAlbum);
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

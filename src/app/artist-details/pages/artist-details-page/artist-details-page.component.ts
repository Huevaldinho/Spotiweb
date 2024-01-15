import { Component, Input } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { AlbumElement, Albums, Artist } from '../../../shared/interfaces/spotify.interfaces';

@Component({
  selector: 'artist-details-page',
  standalone: true,
  imports: [],
  templateUrl: './artist-details-page.component.html',
  styles: ``
})
export class ArtistDetailsPageComponent {

  @Input()
  private id: string = '4oLeXFyACqeem2VImYeBFe';

  public album!: AlbumElement;
  public artist!: Artist;

  constructor( private spotifyService: SpotifyService){}

  ngOnInit(){
    this.spotifyService.getAccessToken_();
    this.artistInfo(this.id);
  }

  artistInfo(id: string):void{
    console.log("search method in search-page.component.ts")
    this.spotifyService.artistInfo(id).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }

  // albumInfo(id: string): void {
  //   console.log("search method in search-page.component.ts")
  //   this.spotifyService.albumInfo('4aawyAB9vmqN3uQ7FjRGTy').subscribe(
  //     (response) => console.log(response),
  //     (error) => console.error(error)
  //   );
  // }
}

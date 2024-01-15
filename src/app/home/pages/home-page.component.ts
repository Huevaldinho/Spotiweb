import { Component } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { AlbumElement, Artist } from '../../shared/interfaces/spotify.interfaces';
import { SpotyCardListComponent } from '../../shared/components/spoty-card-list/spoty-card-list.component';
import { SpotyCardComponent } from "../../shared/components/spoty-card/spoty-card.component";
import { Subscription ,interval} from 'rxjs';
@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styles: ``,
    imports: [SpotyCardListComponent, SpotyCardComponent]
})
export class HomePageComponent {

  public newAlbumReleases : AlbumElement[] = [];
  private subscription: Subscription;

  constructor(private spotifyService: SpotifyService) {
    //Inicializa el timer para llamar a Spotify cada 5 segundos
    this.subscription = interval(30000).subscribe(() => {
      this.callSpotify();
    });
  }

  ngOnDestroy() { this.subscription.unsubscribe(); }

  callSpotify(): void {
    this.spotifyService.getAccessToken()
      .subscribe(spotifyToken => {
        console.log(spotifyToken);
        // Llamada adicional para obtener los nuevos lanzamientos
        this.spotifyService.searchNewAlbumReleases().subscribe((response) => {
          if (response !== null) {
            this.newAlbumReleases = response;
            console.log(response);
          }
        });
      });
  }

  ngOnInit(): void {
    this.spotifyService.searchNewAlbumReleases().subscribe((response)  => {
      if (response!==null) {
        this.newAlbumReleases = response;
        console.log(response);
      }
    });
  }

  trackArtists(artists:Artist[]) : string [] {
    if (artists.length > 0){
      console.log("Holaaaa")
      return artists.map(artist => artist.name);
    }
    return [];
  }


}

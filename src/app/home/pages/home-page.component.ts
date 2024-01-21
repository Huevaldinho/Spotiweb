import { Component } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
import { AlbumElement, Artist } from '../../shared/interfaces/spotify.interfaces';
import { SpotyCardListComponent } from '../../shared/components/spoty-card-list/spoty-card-list.component';
import { SpotyCardComponent } from "../../shared/components/spoty-card/spoty-card.component";
@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styles: ``,
  imports: [SpotyCardListComponent, SpotyCardComponent]
})
export class HomePageComponent {

  public newAlbumReleases: AlbumElement[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getAccessToken_();
    this.spotifyService.searchNewAlbumReleases().subscribe((response) => {
      if (response !== null) {
        this.newAlbumReleases = response;
      }
    });
  }

  callSpotify(): void {
    this.spotifyService.getAccessToken()
      .subscribe(spotifyToken => {
        // Llamada adicional para obtener los nuevos lanzamientos
        this.spotifyService.searchNewAlbumReleases().subscribe((response) => {
          if (response !== null) {
            this.newAlbumReleases = response;
          }
        });
      });
  }

  trackArtists(artists: Artist[]): string[] {
    if (artists.length > 0) {
      return artists.map(artist => artist.name);
    }
    return [];
  }
}

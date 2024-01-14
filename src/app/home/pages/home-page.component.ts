import { Component } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styles: ``
})
export class HomePageComponent {
  constructor(private spotifyService: SpotifyService) { }


  ngOnInit(): void {
  }


  callSpotify(): void {
    this.spotifyService.getAccessToken()
      .subscribe(spotifyToken => {
        console.log(spotifyToken);
      });
  }

}

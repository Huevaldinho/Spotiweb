import { Component } from '@angular/core';
import { SeachBoxComponent } from "../../../shared/components/seach-box/seach-box.component";
import { SpotifyService } from '../../../shared/services/spotify.service';

@Component({
  selector: 'seach-page',
  standalone: true,
  templateUrl: './seach-page.component.html',
  styles: ``,
  imports: [SeachBoxComponent]
})
export class SeachPageComponent {

  constructor(private spotifyService: SpotifyService) { }


  ngOnInit(): void {
    this.spotifyService.getAccessToken_();
  }

  search(term: string): void {
    console.log("search method in search-page.component.ts")
    this.spotifyService.search(term);
  }


}

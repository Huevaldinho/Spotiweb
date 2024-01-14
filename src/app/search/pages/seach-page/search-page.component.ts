import { Component } from '@angular/core';
import { SeachBoxComponent } from "../../../shared/components/seach-box/seach-box.component";
import { SpotifyService } from '../../../shared/services/spotify.service';
import { Search } from '../../../shared/interfaces/spotify.interfaces';
import { SpotyCardListComponent } from '../../../shared/components/spoty-card-list/spoty-card-list.component';

@Component({
  selector: 'seach-page',
  standalone: true,
  templateUrl: './seach-page.component.html',
  styles: ``,
  imports: [SeachBoxComponent,SpotyCardListComponent]
})
export class SeachPageComponent {
  public searchResponse : Search | null = null;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
  }

  search(term: string): void {
    this.spotifyService.search(term).subscribe(
      (response) => {
        if (response){
          this.searchResponse = response
          console.log('Search response: ', this.searchResponse)
        }
      },
      (error) => console.error(error)
    );
  }



}

import { Component, ElementRef, ViewChild } from '@angular/core';

import { SpotifyService } from '../../shared/services/spotify.service';
import { AlbumElement, TracksItem } from '../../shared/interfaces/spotify.interfaces';
import { SpotyCardListComponent } from "../../shared/components/spoty-card-list/spoty-card-list.component";
import { SeachBoxComponent } from "../../shared/components/seach-box/seach-box.component";
import { StorageService } from '../../shared/services/storage.service';
import { SearchHistoryComponent } from "../components/search-history/search-history.component";
@Component({
  selector: 'seach-page',
  standalone: true,
  templateUrl: './seach-page.component.html',
  styles: ``,
  imports: [SpotyCardListComponent, SeachBoxComponent, SearchHistoryComponent]
})
export class SeachPageComponent {

  public albums: AlbumElement[] = [];
  public tracks: TracksItem[] = [];
  public showAlbums: boolean = true;
  public showTracks: boolean = true;
  public term: string = '';
  public searchedTerms: string[] = [];//Para mostrar los terminos buscados

  constructor(
    private spotifyService: SpotifyService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {//* Para que se cargue el historial
    this.spotifyService.getAccessToken_();
    this.searchedTerms = this.storageService.getItem('searchedQueries');
  }

  searchAlbums(term: string): void {
    this.term = term;
    this.searchedTerms.unshift(term);//para meter el termino al principio del array
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.spotifyService.searchAlbums(term).subscribe(
      (response) => {
        if (response) {
          this.albums = response;
          this.showAlbums = true;
          console.log(this.storageService.getItem('searchedQueries'));
        }
      },
      (error) => console.error(error)
    );
  }

  searchTracks(): void {
    this.spotifyService.searchTracks(this.term).subscribe(
      (response) => {
        if (response !== null) {
          this.tracks = response;
          this.showTracks = true;
        }
      },
      (error) => console.error(error)
    );
  }
  filterByAlbum() {
    this.showAlbums = true;
    this.showTracks = false;
    this.searchAlbums(this.term);
  }
  filterByTrack() {
    this.showAlbums = false;
    this.showTracks = true;
    this.searchTracks();
  }

  reSearchTerm(term: string): void {
    this.term = term;
    this.searchAlbums(term);
    this.showAlbums = true;
    console.log("Termino rebuscado: ", term)
  }
}

import { Component } from '@angular/core';

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
        }
      },
      (error) => console.error(error)
    );
  }

  searchTracks(): void {
    console.log("first term: ", this.term)
    this.spotifyService.searchTracks(this.term).subscribe(
      (response) => {
        if (response !== null) {
          this.tracks = response;
          console.log("respuesta canciones: ", response)
          this.showTracks = true;
        }
      },
      (error) => console.error(error)
    );
  }
  filterByAlbum() {
    this.showAlbums = true;
    this.showTracks = false;
    this.tracks = [];
    this.searchAlbums(this.term);
  }
  filterByTrack() {
    this.showAlbums = false;
    this.showTracks = true;
    this.albums = [];
    this.searchTracks();
  }

  reSearchTerm(term: string): void {
    this.term = term;
    //Revisar cual filtro está activo para realizar la busqueda correspondiente
    if (this.showAlbums) {
      this.searchAlbums(term);
      this.showAlbums = true;
      this.showTracks = false;
    }else{
      this.searchTracks();
      this.showAlbums = false;
      this.showTracks = true;
    }


    console.log("Termino rebuscado: ", term)
  }
}

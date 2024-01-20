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

  ngOnInit(): void {
    this.spotifyService.getAccessToken_();
    this.searchedTerms = this.storageService.getItem('searchedQueries');
    const lastTerm = this.storageService.getTerm();
    if (lastTerm.length > 0) {
      this.search(lastTerm[0]);
    }
  }

  updateTerm(newTerm: string): void {
    this.term = newTerm;
    this.storageService.setItem('term', [this.term]);
  }
  search(term: string): void {
    this.updateTerm(term);
    if (this.showAlbums) {
      this.filterByAlbum();
    } else {
      this.filterByTrack();
    }
  }
  searchAlbums(term: string): void {
    this.updateTerm(term);
    if (this.searchedTerms.includes(term)) {
      this.searchedTerms.splice(this.searchedTerms.indexOf(term), 1);//para borrar el termino del array
      this.searchedTerms.unshift(term);//para meter el termino al principio del array
    } else {
      this.searchedTerms.unshift(term);//para meter el termino al principio del array
    }
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.spotifyService.searchAlbums(term).subscribe(
      (response) => {
        if (response) {
          this.albums = response;
          this.showAlbums = true;
          this.showTracks = false;
        }
      },
      (error) => console.error(error)
    );
  }
  searchTracks(term: string): void {
    this.updateTerm(term);
    if (this.searchedTerms.includes(term)) {
      this.searchedTerms.splice(this.searchedTerms.indexOf(term), 1);//para borrar el termino del array
      this.searchedTerms.unshift(term);//para meter el termino al principio del array
    } else {
      this.searchedTerms.unshift(term);//para meter el termino al principio del array
    }
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.spotifyService.searchTracks(term).subscribe(
      (response) => {
        if (response !== null) {
          this.tracks = response;
          this.showTracks = true;
          this.showAlbums = false;
        }
      },
      (error) => console.error(error)
    );
  }
  filterByAlbum() {
    if (!this.term) return;//*Si no hay term, no haga nada
    this.showAlbums = true;//*Muestre album
    this.showTracks = false;//*Oculte tracks
    this.tracks = [];//*Borre tracks
    this.searchAlbums(this.term);//*Busque el term
  }
  filterByTrack() {
    if (!this.term) return;//*Si no hay term, no haga nada
    this.showAlbums = false;//*Oculte album
    this.showTracks = true;//*Muestre tracks
    this.albums = [];//*Borre albums
    this.searchTracks(this.term);//*Busque el term
  }

  reSearchTerm(term: string): void {
    this.updateTerm(term);
    if (this.showAlbums) {
      this.filterByAlbum();
    } else {
      this.filterByTrack();
    }
  }

  get getTracks(): TracksItem[] {
    return this.tracks;
  }
  get getAlbums():AlbumElement[] {
    return this.albums;
  }
}


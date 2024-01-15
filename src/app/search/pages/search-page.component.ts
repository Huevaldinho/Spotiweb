import { Component, ElementRef, ViewChild } from '@angular/core';

import { SpotifyService } from '../../shared/services/spotify.service';
import { AlbumElement, TracksItem } from '../../shared/interfaces/spotify.interfaces';
import { SpotyCardListComponent } from "../../shared/components/spoty-card-list/spoty-card-list.component";
import { SeachBoxComponent } from "../../shared/components/seach-box/seach-box.component";
import { StorageService }  from '../../shared/services/storage.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'seach-page',
    standalone: true,
    templateUrl: './seach-page.component.html',
    styles: ``,
    imports: [ SpotyCardListComponent, SeachBoxComponent]
})
export class SeachPageComponent {

  public albums : AlbumElement[] = [];
  public tracks : TracksItem[] = [];
  public showAlbums: boolean = true;
  public showTracks: boolean = true;
  private term : string = '';
  public searchedTerms: string[] = [];//Para mostrar los terminos buscados



  @ViewChild('albumsBtn')
  public albumsBtn!: ElementRef<HTMLButtonElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor
  @ViewChild('trackBtn')
  public trackBtn!: ElementRef<HTMLButtonElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor

  constructor(
    private spotifyService: SpotifyService,
    private storageService: StorageService,
  ){ }

  ngOnInit(): void{//* Para que se cargue el historial
    this.searchedTerms = this.storageService.getItem('searchedQueries');
  }

  searchAlbums(term: string): void {
    this.term = term;
    this.searchedTerms.unshift(term);//para meter el termino al principio del array
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.spotifyService.searchAlbums(term).subscribe(
      (response) => {
        if (response){
          this.albums = response;
          this.showAlbums=true;
          this.albumsBtn.nativeElement.classList.add('active')
          console.log(this.storageService.getItem('searchedQueries'));
        }
      },
      (error) => console.error(error)
    );
  }
  filterByAlbum(){
    if (this.albumsBtn.nativeElement.classList.contains('active')){
      this.albumsBtn.nativeElement.classList.remove('active');//Desactiva el btn
      this.showAlbums=false;
    }else{
      this.albumsBtn.nativeElement.classList.add('active');//Activa el btn
      this.searchAlbums(this.term);
      this.showAlbums=true;
    }
  }

  searchTracks() : void{
    this.spotifyService.searchTracks(this.term).subscribe(
      (response) => {
        if (response!==null){
            this.tracks= response;
            this.showTracks=true;
        }
      },
      (error) => console.error(error)
    );
  }
  filterByTrack(){
    if (this.trackBtn.nativeElement.classList.contains('active')){
      this.trackBtn.nativeElement.classList.remove('active');//Desactiva el btn
      this.showTracks=false;
    }else{
      this.trackBtn.nativeElement.classList.add('active');//Activa el btn
      this.searchTracks();
      this.showTracks=true;
      console.log(this.storageService.getItem('searchedQueries'));
    }
  }

}

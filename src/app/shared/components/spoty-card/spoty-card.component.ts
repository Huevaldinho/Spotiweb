import { Component,  ElementRef,  Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { SpotifyService } from '../../services/spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'shared-spoty-card',
  standalone: true,
  imports: [],
  templateUrl: './spoty-card.component.html',
  styles: ``
})
export class SpotyCardComponent {

  @Input() public cardTitle: string = 'Nombre album o cancion';
  @Input() public artitsList: string[] = [];
  @Input() public image: string = '';
  @Input() public type_: string = '';
  @Input() public id_: string = '';
  @Input() public artistId: string = '';
  public searchedTerms: string[] = [];
  @Input() public audioUrl = ''; //TODO: corregir audio de album y tracks
  @Input() public trackPreview: string=''; //? **

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.searchedTerms = this.storageService.getItem('searchedQueries') as string[];
  }
  goToArtist(artistName: string): void {
    this.searchedTerms = this.storageService.getItem('searchedQueries') as string[];
    this.searchedTerms.unshift(artistName);//para meter el termino al principio del array
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.router.navigate(['/artist', this.type_, this.id_]);
  }
  goToAlbum(): void {
    this.searchedTerms = this.storageService.getItem('searchedQueries') as string[];
    this.searchedTerms.unshift(this.cardTitle);//para meter el termino al principio del array
    this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.router.navigate(['/artist', this.type_, this.id_, this.artistId]);
  }
  isPlaying: boolean = false;
  isHovered: boolean = false;


  playSound(): void {
    const audio = document.getElementById('myAudio') as HTMLAudioElement;
    console.log("track to play",this.trackPreview)
    if (audio) {
      this.isPlaying = true; // Desactiva el botón mientras se reproduce el sonido
      audio.play();
      audio.onended = () => {
        this.isPlaying = false; // Habilita el botón cuando termina la reproducción
      };
    }
  }

  get titleFixed(): string {
    return this.cardTitle.length > 20 ? this.cardTitle.substr(0, 20) + '...' : this.cardTitle;
  }

  get audioSource(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.audioUrl);
  }

  playSong() {
    throw new Error('Method not implemented.');
  }

  onHover(): void {
    this.isHovered = true;
  }

  onLeave(): void {
    this.isHovered = false;
  }

}

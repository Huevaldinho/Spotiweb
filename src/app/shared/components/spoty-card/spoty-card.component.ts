import { Component,  ElementRef,  Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { SpotifyService } from '../../services/spotify.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { AlbumElement } from '../../interfaces/spotify.interfaces';
import { TitlePipe } from '../../pipes/shared.pipe';

@Component({
  selector: 'shared-spoty-card',
  standalone: true,
  imports: [RouterModule,TitlePipe],
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
  @Input() public audioUrl = ''; //TODO: corregir audio de album y tracks
  @Input() public trackPreview: string='';

  public album?: AlbumElement;
  public searchedTerms: string[] = [];
  public isPlaying: boolean = false;
  public isHovered: boolean = false;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private spotifyService: SpotifyService,
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchedTerms = this.storageService.getItem('searchedQueries') as string[];
    if( this.type_ === 'album'){
      this.spotifyService.albumInfo(this.id_).subscribe(
        album => this.trackPreview = album.tracks.items[0].preview_url
      )
    }
  }
  goToArtist(): void {
    //Guarde la ruta a la que tiene que regresar
    if (this.activeRoute.snapshot.url.length===0){
      this.storageService.setItem('route',[])
    }else{
      this.storageService.setItem('route',[this.activeRoute.snapshot.url[0].path])
    }
    this.router.navigate(['/artist', 'track', this.id_,this.artistId]);
  }
  goToAlbum(): void {
    if (this.type_ === 'track') return;
    //this.searchedTerms = this.storageService.getItem('searchedQueries') as string[];
    //this.searchedTerms.unshift(this.cardTitle);//para meter el termino al principio del array
    //this.storageService.setItem('searchedQueries', this.searchedTerms);
    this.router.navigate(['/artist', 'album', this.id_, this.artistId]);
  }

  toggleAudio() {
    const audioElement = this.audio.nativeElement as HTMLAudioElement;
    audioElement.src = this.trackPreview;
    if(audioElement) {
      if(this.isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  get titleFixed(): string {
    return this.cardTitle.length > 20 ? this.cardTitle.substr(0, 20) + '...' : this.cardTitle;
  }


  onHover(): void {
    this.isHovered = true;
  }

  onLeave(): void {
    this.isHovered = false;
  }
}

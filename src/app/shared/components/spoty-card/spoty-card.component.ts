import { Component,  ElementRef,  Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'shared-spoty-card',
  standalone: true,
  imports: [],
  templateUrl: './spoty-card.component.html',
  styles: ``
})
export class SpotyCardComponent {

  @Input() public cardTitle : string='Nombre album o cancion';
  @Input() public artitsList: string[] = [];
  @Input() public image: string = '';
  @Input() public type_: string='';
  @Input() public id_: string='';
  @Input() public artistId: string='';
  @Input() public trackPreview: string=''; //? **

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;


  constructor(private router:Router) {
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

  goToArtist():void{
    //TODO: Navigate
    this.router.navigate(['/artist',this.type_,this.id_, this.artistId]);
  }


  get titleFixed(): string {
    return this.cardTitle.length > 20 ? this.cardTitle.substr(0, 20) + '...' : this.cardTitle;
  }

  getIframeSrc(): string {
    //https://open.spotify.com/embed/album/2ODvWsOgouMbaA5xf0RkJe?utm_source=oembed
    if (this.id_!='')
      return `https://open.spotify.com/embed/album/${this.id_}?utm_source=oembed`;
    return '';
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

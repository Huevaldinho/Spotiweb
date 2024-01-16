import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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
  @Input() public id: string = '';


  get titleFixed(): string {
    return this.cardTitle.length > 20 ? this.cardTitle.substr(0, 20) + '...' : this.cardTitle;
  }

  getIframeSrc(): string {
    //https://open.spotify.com/embed/album/2ODvWsOgouMbaA5xf0RkJe?utm_source=oembed
    if (this.id!='')
      return `https://open.spotify.com/embed/album/${this.id}?utm_source=oembed`;
    return '';
  }

  //TODO: Hacer hover en el span de artista


  goToArtist(value: string):void {
    console.log('Go to artist: ', value);



  }

  playSong() {
    throw new Error('Method not implemented.');

  }

}

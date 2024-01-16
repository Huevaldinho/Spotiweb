import { Component,  Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-spoty-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './spoty-card.component.html',
  styles: ``
})
export class SpotyCardComponent {

  @Input() public cardTitle : string='Nombre album o cancion';
  @Input() public artitsList: string[] = [];
  @Input() public image: string = '';
  @Input() public type_: string='';
  @Input() public id_: string='';


  constructor() {
  }


  goToArtist():void{
    console.log("Id y type en card: ", this.id_, this.type_,this.cardTitle);
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

}

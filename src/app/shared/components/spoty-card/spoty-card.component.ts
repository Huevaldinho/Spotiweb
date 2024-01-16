import { Component,  Input } from '@angular/core';
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


  constructor(private router:Router) {
  }


  goToArtist():void{
    //TODO: Navigate
    localStorage.removeItem('idArtista');
    localStorage.setItem('idArtista', this.artistId);
    this.router.navigate(['/artist',this.type_,this.id_]);

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

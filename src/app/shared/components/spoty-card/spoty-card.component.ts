import { Component, Input } from '@angular/core';

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

}

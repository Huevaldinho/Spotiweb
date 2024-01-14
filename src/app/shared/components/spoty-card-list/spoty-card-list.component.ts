import { Component, Input } from '@angular/core';
import {SpotyCardComponent} from '../../../shared/components/spoty-card/spoty-card.component';
import { Search } from '../../interfaces/spotify.interfaces';

@Component({
  selector: 'shared-spoty-card-list',
  standalone: true,
  imports: [SpotyCardComponent],
  templateUrl: './spoty-card-list.component.html',
  styles: ``
})
export class SpotyCardListComponent {
  @Input() searchResult: Search|null = null;

}

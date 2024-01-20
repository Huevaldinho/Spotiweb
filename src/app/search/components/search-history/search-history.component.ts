import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'search-history',
  standalone: true,
  imports: [],
  templateUrl: './search-history.component.html',
})
export class SearchHistoryComponent {

  @Input() public searchedTerms: string[] = [];

  @ViewChild('term')
  public term!: ElementRef<HTMLSpanElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor
  @Output()
  public onValue = new EventEmitter<string>();
  emitValue(value: string): void {
    this.onValue.emit(value);
  }
}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-seach-box',
  standalone: true,
  imports: [],
  templateUrl: './seach-box.component.html',
  styles: ``
})
export class SeachBoxComponent {
  @Input()
  public placeholder: string = '';

  @ViewChild('input')//* Bindea con el input del html
  public input!: ElementRef<HTMLInputElement>;//Para que se inicialice "!:" sin tener que hacerlo en el constructor

  @Output()
  public onValue = new EventEmitter<string>();
  emitValue(value: string): void {
    this.onValue.emit(value);
  }



}

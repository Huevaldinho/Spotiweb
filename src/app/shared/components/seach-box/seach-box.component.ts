import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-seach-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seach-box.component.html',
  styles: ``
})
export class SeachBoxComponent {
  @Input() public placeholder: string = '';
  @Input() public value: string = '';

  public input!: string;//Para que se inicialice "!:" sin tener que hacerlo en el constructor

  constructor(private storageService: StorageService) { }


  @Output()
  public onValue = new EventEmitter<string>();
  emitValue(value: string): void {
    this.onValue.emit(value);
  }


  ngOnInit(): void {
    const storedData = localStorage.getItem('returnFlag');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData === true) {
        const queries = this.storageService.getItem('searchedQueries');
        localStorage.removeItem('returnFlag')
        if (queries) {
          this.input = queries[0]
          this.emitValue(this.input)
        }
      }
    }
  }

}

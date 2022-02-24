import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() inputSearch = new EventEmitter<string>();
  @Output() inputClear = new EventEmitter<boolean>();

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSearch(value: string): void{
    if (value != '' && value.length > 2) {
      this.inputSearch.emit(value);
    }else{
      this.toastService.showDanger('you must enter a marvel, dc, others character');
    }
  }

  onClear(): void{
    this.inputClear.emit(true)
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Output() inputSearch = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearch(value: string): void{
    if (value != '' && value.length > 2) {
      this.inputSearch.emit(value);
    }else{
      alert('you must enter a marvel or dc character')
    }
  }

}

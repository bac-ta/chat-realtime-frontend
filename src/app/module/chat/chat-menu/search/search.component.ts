import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isShowSearchType = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  showSearchType(): void {
    this.isShowSearchType = true;
  }

  hideSearchType(): void {
    this.isShowSearchType = false;
  }
}

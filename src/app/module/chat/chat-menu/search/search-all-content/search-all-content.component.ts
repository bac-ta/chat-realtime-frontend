import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-all-content',
  templateUrl: './search-all-content.component.html',
  styleUrls: ['./search-all-content.component.css']
})
export class SearchAllContentComponent implements OnInit {
  start: number = 0;


  constructor() {
  }

  ngOnInit(): void {
  }

  setStartQuery(): void {
    this.start += 10;
  }


}

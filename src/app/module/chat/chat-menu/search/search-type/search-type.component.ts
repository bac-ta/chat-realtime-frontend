import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.css']
})
export class SearchTypeComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [{label: 'All'},
      {label: 'Users', icon: 'pi pi-user'},
      {label: 'Groups', icon: 'pi pi-users'}];
    this.activeItem = this.items[0];
  }
}

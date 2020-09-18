import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.css']
})
export class SearchTypeComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  searchType = 0;
  @ViewChild('searchTypeTab') searchTypeTab: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [{
      label: 'All', command: () => {
        this.searchType = 0;
      }
    },
      {
        label: 'People', icon: 'pi pi-user', command: () => {
          this.searchType = 1;
        }
      },
      {
        label: 'Rooms', icon: 'pi pi-users', command: () => {
          this.searchType = 2;
        }
      }];
    this.activeItem = this.items[0];
  }

  activeMenu(): void {
    this.activeItem = this.searchTypeTab['activeItem'];
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchResponse} from '../../models/search-response';
import {SearchService} from '../../services/search.service';
import {MenuItem} from 'primeng';
import {SearchTypeComponent} from './search-type/search-type.component';
import {UserResponse} from '../../models/user-response';
import {RoomResponse} from '../../models/room-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isShowSearchType = false;
  searchText: string = '';
  start: number = 0;
  searchType: number = 0;
  searchResponse: SearchResponse;
  activeItem: MenuItem;

  selectedUsers: any[];
  selectedRooms: any[];

  @ViewChild(SearchTypeComponent, {static: false}) searchTypeComponent: SearchTypeComponent;


  constructor(private searchService: SearchService) {
  }


  ngOnInit(): void {
  }

  showSearchType(): void {
    this.isShowSearchType = true;
  }

  hideSearchType(): void {
    this.isShowSearchType = false;
  }

  search(): void {
    this.activeItem = this.searchTypeComponent.activeItem;
    switch (this.activeItem.label) {
      case 'All':
        this.searchType = 0;
        break;
      case 'People':
        this.searchType = 1;
        break;
      case 'Rooms':
        this.searchType = 2;
        break;
      default:
        this.searchType = 0;
        break;
    }
    this.searchService.search(this.searchText, this.start, this.searchType).subscribe(response => {
      this.searchResponse = response;
    });
  }

  fetchUserResponses(): UserResponse[] {
    if (this.searchResponse) {
      return this.searchResponse.userResponses;
    }
    return [];
  }

  fetchRoomResponses(): RoomResponse[] {
    if (this.searchResponse) {
      return this.searchResponse.roomResponses;
    }
    return [];
  }

}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SearchResponse} from '../../models/search-response';
import {SearchService} from '../../services/search.service';
import {MenuItem} from 'primeng';
import {SearchTypeComponent} from './search-type/search-type.component';
import {UserResponse} from '../../models/user-response';
import {RoomResponse} from '../../models/room-response';
import {TabService} from '../../services/tab.service';
import {subscribePresence} from '../../strophe';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../chat-menu.component.css']
})
export class SearchComponent implements OnInit {
  isShowSearchType = false;
  searchText = '';
  start = 0;
  searchType = 0;
  searchResponse: SearchResponse;
  userResponses: UserResponse[];
  roomResponses: RoomResponse[];

  activeItem: MenuItem;

  selectedUsers: any[];
  selectedRooms: any[];

  users: string[] = [];
  rooms: string[] = [];

  @Input() usernamesOnline: string[];

  @ViewChild(SearchTypeComponent, {static: false}) searchTypeComponent: SearchTypeComponent;
  @Output() addNewFriend: EventEmitter<any> = new EventEmitter();


  constructor(private searchService: SearchService, private tabService: TabService) {
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

    this.fetchUserResponses();
    this.fetchRoomResponses();
  }

  callSearch(event) {
    if (event) {
      this.search();
    }
  }

  fetchUserResponses(): void {
    if (!this.searchResponse) {
      return;
    }

    let users = [];
    for (let item of this.searchResponse.userResponses) {
      const user = {
        username: item.username,
        name: item.name,
        email: item.email
      };
      users.push(user);
    }
    this.users = users;

  }

  fetchRoomResponses(): void {
    if (!this.searchResponse) {
      return;
    }
    let rooms = [];
    for (let item of this.searchResponse.roomResponses) {
      const room = {
        name: item.name,
        naturalName: item.naturalName,
        description: item.description
      };
      rooms.push(room);
    }
    this.rooms = rooms;
  }

  openChatWindow(event): void {
    let username = event.option.value.username;
    //add friend
    this.searchService.addFriend(username);
    this.tabService.addNewChatWindow({username});
    this.addNewFriend.emit(username);
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-new-room',
  templateUrl: './create-new-room.component.html',
  styleUrls: ['./create-new-room.component.css'],
  styles: [`
        :host ::ng-deep .ui-listbox {
            width: 20em;
        }
    `]
})
export class CreateNewRoomComponent implements OnInit {
  isOpenCreateNewRoomPopup = false;
  roomName: string = null;
  isListUserAddToRoom = false;

  users: any[];
  selectedUsers: any[];

  constructor() {
    this.users = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ];
  }

  ngOnInit(): void {
  }

  openRoomPopup(): void {
    this.isOpenCreateNewRoomPopup = true;
  }

  onTextChange(value): void {
    this.roomName = value;
  }

  nextScreentListUserAddToRoom(): void {
    this.isListUserAddToRoom = true;
  }

  prevScreenCreateRoom(): void {
    this.isListUserAddToRoom = false;
    this.isOpenCreateNewRoomPopup = true;
  }

  closePopup(): void {
    this.isOpenCreateNewRoomPopup = false;
    this.isListUserAddToRoom = false;
  }
}

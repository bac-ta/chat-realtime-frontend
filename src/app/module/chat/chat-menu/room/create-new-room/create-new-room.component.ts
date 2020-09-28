import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../pre-auth/model/user';

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

  @Input() buddyInput: User[];
  selectedUsers: any[];

  constructor() {
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

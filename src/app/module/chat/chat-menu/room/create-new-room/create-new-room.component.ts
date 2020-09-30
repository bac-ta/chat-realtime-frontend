import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../pre-auth/model/user';
import {RoomService} from '../../../services/room.service';
import {RoomCreateRequest} from '../../../models/roomCreateRequest';

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

  isListUserAddToRoom = false;

  @Input() buddyInput: User[];
  @Input() usernamesOnline: string[];
  selectedUsers: User[];

  naturalName: string;

  constructor(private roomService: RoomService) {
  }

  ngOnInit(): void {
  }

  openRoomPopup(): void {
    this.isOpenCreateNewRoomPopup = true;
  }

  onTextChange(value): void {
    this.naturalName = value;
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

  creatNewRoom(): void {
    let request = new RoomCreateRequest();
    request.naturalName = this.naturalName;
    let members = [];
    for (let user of this.selectedUsers) {
      members.push(user.username);
    }
    request.members = members;
    this.roomService.crateNewRoomChat(request).subscribe(res => {
      this.closePopup();
      //Open tabchat for room

    }, error => {
      console.log(error);
    });
  }
}

import {UserResponse} from './user-response';
import {RoomResponse} from './room-response';

export class SearchResponse {
  userResponses: UserResponse[];
  roomResponses: RoomResponse[];

  constructor(userResponses: UserResponse[], roomResponses: RoomResponse[]) {
    this.userResponses = userResponses;
    this.roomResponses = roomResponses;
  }
}

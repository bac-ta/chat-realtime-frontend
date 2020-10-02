import {Injectable, Injector} from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {RoomCreateRequest} from '../models/roomCreateRequest';
import {Observable} from 'rxjs';
import {RoomResponse} from '../models/room-response';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {subscribePresence} from '../strophe';
import {UserType} from '../enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends BaseService<any> {

  roomResponses: RoomResponse[];

  constructor(protected injector: Injector) {
    super(injector);
  }


  crateNewRoomChat(request: RoomCreateRequest): Observable<any> {
    return this.post('/room/create', request);
  }

  getRoomsJoined(): Observable<RoomResponse[]> {
    return this.get('/room/joinedList').pipe(map(response => {
      this.roomResponses = response.body;
      return this.roomResponses;
    }));
  }

  joinRoom(roomName: string): Observable<any> {
    const toJid = roomName + '@' + environment.DOMAIN;
    subscribePresence(toJid);
    const uri = '/room/joined/' + roomName + '/' + UserType.MEMBERS;
    return this.post(uri, {}).pipe();
  }

}



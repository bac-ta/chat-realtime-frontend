import {Injectable, Injector} from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {RoomCreateRequest} from '../models/roomCreateRequest';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends BaseService<any> {
  constructor(protected injector: Injector) {
    super(injector);
  }

  crateNewRoomChat(request: RoomCreateRequest): Observable<any> {
    return this.post('/room/create', request);
  }
}



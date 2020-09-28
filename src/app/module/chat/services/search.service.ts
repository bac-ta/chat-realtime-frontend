import {Injectable, Injector} from '@angular/core';
import {SearchResponse} from '../models/search-response';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';
import {UserResponse} from '../models/user-response';
import {Observable} from 'rxjs';
import {RoomResponse} from '../models/room-response';
import {subscribePresence} from '../strophe';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService<any> {
  constructor(
    protected injector: Injector
  ) {
    super(injector);
  }

  public search(searchText: string, start: number, searchType: Number): Observable<SearchResponse> {

    const observable = this.get('/search?searchText=' + searchText + '&start=' + start + '&searchType=' + searchType, {});

    return observable.pipe(map(res => {
      const body = res.body;

      let userResponses: UserResponse[] = [];
      let roomResponses: RoomResponse[] = [];
      const userResponsesObj = body['userResponses'];
      for (let userElement of userResponsesObj) {
        let userResponse = new UserResponse();
        userResponse.email = userElement['email'];
        userResponse.username = userElement['username'];
        userResponse.name = userElement['name'];
        userResponses.push(userResponse);
      }
      const roomResponsesObj = body['roomResponses'];

      for (let roomElement of roomResponsesObj) {
        let roomResponse = new RoomResponse();
        roomResponse.name = roomElement['name'];
        roomResponse.description = roomElement['description'];
        roomResponse.naturalName = roomElement['naturalName'];
        roomResponses.push(roomResponse);
      }
      return new SearchResponse(userResponses, roomResponses);
    }));
  }

  addFriend(username: string): Observable<any> {
    return this.post('/user/addFriend/' + username, {}).pipe();
  }
}

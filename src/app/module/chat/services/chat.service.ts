import {Injectable, Injector} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {getConnection, receiver, sendMessage, senMessageInRoom, status, subscribePresence} from '../strophe';
import {MessageChat} from '../chat-gui/chat-content/chat-content.component';
import {User} from '../../pre-auth/model/user';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService<any> {
  connection;
  // remove when has load history
  listMsgNotDisplayed: MessageChat[];
  private statusSubject = new Subject<User>();

  constructor(protected injector: Injector) {
    super(injector);
    this.listMsgNotDisplayed = [];
  }

  openConnection(jid, password): void {
    this.connection = getConnection(jid, password);
  }

  disconnect(): void {
    this.connection.disconnect('');
    this.connection.reset();
  }

  getReceiver(): Subject<MessageChat> {
    return receiver;
  }

  sendMsg(msg, to): void {
    to = to + '@' + environment.DOMAIN;
    subscribePresence(to);
    sendMessage(msg, to);
  }

  sendMsgInRoom(msg, to): void {
    to = to + '@' + environment.DOMAIN;

    console.log('room la')
    console.log(to);
    subscribePresence(to);
    senMessageInRoom(msg, to);
  }

  getRoster(): Observable<any> {
    return this.get('/user/getFriends', {}).pipe();
  }

  getNumMessOff(): Observable<any> {
    return this.get('/chat/numOfMessOff', {}).pipe(map(responses => {
      return responses.body;
    }));
  }

  getStatus(): Subject<User> {
    this.statusSubject.subscribe();
    return status;
  }
}

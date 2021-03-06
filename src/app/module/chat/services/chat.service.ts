import {Injectable, Injector} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {getConnection, receiver, sendMessage, status, subscribePresence} from '../strophe';
import {MessageChat} from '../chat-gui/chat-content/chat-content.component';
import {User} from '../../pre-auth/model/user';
import {BaseService} from '../../../core/services/base.service';

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

  getRoster(): Observable<any> {
    return this.get('/user/getFriends', {}).pipe();
  }

  getStatus(): Subject<User> {
    this.statusSubject.subscribe();
    return status;
  }
}

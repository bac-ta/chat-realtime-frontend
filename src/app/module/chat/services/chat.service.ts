import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {getConnection, receiver, roster, sendMessage, status, subscribeUserPresence} from '../strophe';
import {MessageChat} from '../chat-gui/chat-content/chat-content.component';
import {User} from '../../pre-auth/model/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  connection;
  // remove when has load history
  listMsgNotDisplayed: MessageChat[];
  private statusSubject = new Subject<User>();

  constructor() {
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
    sendMessage(msg, to);
  }

  getRoster(): Subject<User> {
    return roster;
  }

  getStatus(): Subject<User> {
    this.statusSubject.subscribe();
    return status;
  }

  subscribePresence(toJId): void {
    subscribeUserPresence(toJId);
  }
}

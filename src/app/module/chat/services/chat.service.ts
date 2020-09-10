import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ChatWindow} from '../chat-gui/chat-gui.component';
import {Strophe, $build, $iq, $msg, $pres} from 'strophe.js';
import {environment} from '../../../../environments/environment';
import {getConnection, receiver, roster, sendMessage, status} from '../strophe';
import {MessageChat} from '../chat-gui/chat-content/chat-content.component';
import {User} from '../../pre-auth/model/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  connection;

  constructor() {

  }

  openConnection(jid, password): void {
    this.connection = getConnection(jid, password);
  }

  disconnect(): void {
    this.connection.disconnect('');
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
    return status;
  }
}

import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ChatWindow} from '../chat-gui/chat-gui.component';
import {Strophe, $build, $iq, $msg, $pres} from 'strophe.js';
import {environment} from '../../../../environments/environment';
import {getConnection, receiver, roster, sendMessage, status} from '../strophe';
import {MessageChat} from '../chat-gui/chat-content/chat-content.component';
import {User} from '../../pre-auth/model/user';
import {BaseService} from "../../../core/services/base.service";
import {AccountService} from "../../pre-auth/services/account.service";
import {Roster} from "../models/roster";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService<any>{
  connection;
  // remove when has load history
  listMsgNotDisplayed: MessageChat[];
  private statusSubject = new Subject<User>();

  constructor(protected injector: Injector, private accountService: AccountService) {
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
    sendMessage(msg, to);
  }

  getRoster(): Observable<any> {
    const user = this.accountService.userValue;
    const customHeaders = {
      'Authorization': 'Bearer ' + user.accessToken
    };

    return this.get('/user/getFriends', customHeaders).pipe();
  }

  getStatus(): Subject<User> {
    this.statusSubject.subscribe()
    return status;
  }
}

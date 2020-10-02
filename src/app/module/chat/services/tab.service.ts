import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ChatWindow} from '../chat-gui/chat-gui.component';
import {AccountService} from "../../pre-auth/services/account.service";
import {MessageBody} from '../models/message-body';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  chatWindows: BehaviorSubject<ChatWindow>;
  activeTab: Subject<string> = new Subject<string>();
  // remove when has load history
  chatWindowName = new Set<string>([]);
  messageBody: BehaviorSubject<MessageBody>;

  constructor(private accountService: AccountService) {
    this.chatWindows = new BehaviorSubject<ChatWindow>({username: accountService.userValue.username});
  }

  addNewChatWindow(chatWindow): void {
    this.chatWindows.next(chatWindow);
  }

  setActiveTab(idx): void {
    this.activeTab.next(idx);
  }

  modifyListWindow(isAppend, name): void {
    if (isAppend) {
      this.chatWindowName.add(name);
    } else {
      this.chatWindowName.delete(name);
    }
  }

  addMessageBody(messageBody): void{
    this.messageBody.next(messageBody);
  }
}

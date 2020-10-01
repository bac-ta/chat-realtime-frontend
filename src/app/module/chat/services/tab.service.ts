import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ChatWindow} from '../chat-gui/chat-gui.component';
import {AccountService} from '../../pre-auth/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  chatWindows: BehaviorSubject<ChatWindow>;
  activeTab: Subject<string> = new Subject<string>();
  // remove when has load history
  chatWindowName = new Set<string>([]);

  constructor(private accountService: AccountService) {
    this.chatWindows = new BehaviorSubject<ChatWindow>({username: accountService.userValue.username, roomID: null});
  }

  addNewChatWindow(chatWindow): void {
    this.chatWindows.next(chatWindow);
  }

  setActiveTab(idx): void {
    this.activeTab.next(idx);
  }

  modifyListWindow(isAppend, prop): void {
    if (isAppend) {
      this.chatWindowName.add(prop);
    } else {
      this.chatWindowName.delete(prop);
    }
  }
}

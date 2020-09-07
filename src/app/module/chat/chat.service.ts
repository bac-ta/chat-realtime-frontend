import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatWindow} from './chat-gui/chat-gui.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatWindows: BehaviorSubject<ChatWindow>;

  constructor() {
    this.chatWindows = new BehaviorSubject<ChatWindow>({username: 'Admin', content: 'default content'});
  }

  addNewChatWindow(chatWindow): void {
    this.chatWindows.next(chatWindow);
    console.log('added');
  }
}

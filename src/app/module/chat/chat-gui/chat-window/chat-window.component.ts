import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../../../pre-auth/services/account.service';
import {MessageChat} from '../chat-content/chat-content.component';
import {User} from '../../../pre-auth/model/user';
import {ChatService} from '../../services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @Input() chatWith: string;
  private currentUser: User;
  private chatWithUser: User;
  chatMsgs: MessageChat[] = [];
  subcriptionRecv: Subscription;

  constructor(private accountService: AccountService,
              private chatService: ChatService) {
    this.currentUser = this.accountService.userValue;
  }

  ngOnInit(): void {
    // remove when has load history
    const msgNotDisplay = this.chatService.listMsgNotDisplayed.filter(item => item.username === this.chatWith);
    msgNotDisplay.forEach(msg => this.chatService.listMsgNotDisplayed
      .splice(this.chatService.listMsgNotDisplayed.findIndex(i => i.username === msg.username), 1));
    this.chatMsgs.push(...msgNotDisplay);
    // remove when has load history
    this.subcriptionRecv = this.chatService.getReceiver().subscribe({
      next: (msg) => {
        if (msg.username === this.chatWith) {
          this.chatMsgs.unshift(msg);
        }
      }
    });
  }

  getDataUserChatWith(): void {
    // call api get by username
  }

  ngOnDestroy(): void {
    this.subcriptionRecv.unsubscribe();
  }

  handleSendMsg(e): void {
    if (e.isMe) {
      e.username = this.currentUser.username;
    }
    this.chatService.sendMsg(e.detail, this.chatWith);
    this.chatMsgs.unshift(e);
  }
}

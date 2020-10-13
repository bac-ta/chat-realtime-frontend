import {Component, Input, OnInit} from '@angular/core';
import {TabService} from '../../services/tab.service';
import {ChatService} from '../../services/chat.service';
import {AccountService} from '../../../pre-auth/services/account.service';

export class MessageChat {
  username: string;
  timeChat: Date;
  detail: string;
  isMe: boolean;
  avatarUrl: string;

  constructor() {
  }
}

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {

  @Input() chatMsgs: MessageChat[] = [];
  @Input() chatWith: string;

  sentDateNext: number;

  constructor(private tabService: TabService,
              private chatService: ChatService,
              private accountService: AccountService) {
  }

  user: string;

  getUsername(): string {
    if (this.accountService.userValue == null) {
      return;
    }
    return this.accountService.userValue.username;
  }

  ngOnInit(): void {
    this.user = this.getUsername();
    this.chatService.getMessage(this.chatWith).subscribe(messageBody => {
      const msgChat = messageBody.map(mb => {
        const mc = new MessageChat();
        mc.username = mb.userNameFrom.replace('@dimagesharevn.develop', '');
        mc.timeChat = mb.sentDate;
        mc.detail = mb.body;
        mc.isMe = (this.user == mc.username);
        return mc;
      });
      this.chatMsgs.push(...msgChat);
      let sentDateFirst = Math.min.apply(Math, messageBody.map(function(o) {
        return o.sentDate;
      }));
      this.sentDateNext = sentDateFirst;
    });
  }

  onScrollUp() {
    this.chatService.getMessage(this.chatWith, this.sentDateNext).subscribe(messageBody => {
      const msgChat = messageBody.map(mb => {
        const mc = new MessageChat();
        mc.username = mb.userNameFrom.replace('@dimagesharevn.develop', '');
        mc.timeChat = mb.sentDate;
        mc.detail = mb.body;
        mc.isMe = (this.user == mc.username);
        return mc;
      });
      this.chatMsgs.push(...msgChat);
      if (messageBody == null) return;
      let sentDate = Math.min.apply(Math, messageBody.map(function(o) {
        return o.sentDate;
      }));
      this.sentDateNext = sentDate;
    });
  }
}

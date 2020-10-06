import {Component, Input, OnInit} from '@angular/core';
import {TabService} from '../../services/tab.service';
import {ChatService} from '../../services/chat.service';

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

  constructor(private tabService: TabService,
              private chatService: ChatService ) { }

  ngOnInit(): void {

    this.chatService.getMessage(this.chatWith).subscribe(msgs => {
      const msgChat = msgs.map(m => {
        const c = new MessageChat();
        c.detail = m.body;
        return c;
      })
      this.chatMsgs.push(...msgChat);
      console.log('msgChat', msgChat);
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';

export class MessageChat {
  username: string;
  timeChat: string;
  detail: string;
  style: {};
  avatarUrl: string;

  constructor(username: string, timeChat: string, detail: string, style: {}, avatarUrl: string) {
    this.username = username;
    this.timeChat = timeChat;
    this.detail = detail;
    this.style = style;
    this.avatarUrl = avatarUrl;
  }
}

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {

  @Input() chatId;
  chatMsgs: MessageChat[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}

import {Component, Input, OnInit} from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {MessageChat} from '../chat-content.component';
import {EmojiService} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {AccountService} from '../../../../pre-auth/services/account.service';

class Text {
  isEmoji: boolean;
  text: string;
}

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.css']
})
export class MessageChatComponent implements OnInit {

  @Input() msg: MessageChat;
  listStr: Text[] = [];
  clzz = '';
  clzzWrapper = '';

  constructor(private emojiService: EmojiService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    if (!this.msg.avatarUrl) {
      this.msg.avatarUrl = '/assets/layout/images/avatar.png';
    }
    if (this.msg.isMe) {
      this.clzz = 'my-message';
      this.clzzWrapper = 'p-flex-row-reverse';
    } else {
      this.clzz = 'other-message';
      this.clzzWrapper = 'p-flex-row';
    }
    const regex = /:(.*?):/g;
    let msg = this.msg.detail;
    const emojis = msg.match(regex);
    if (!emojis) {
      this.listStr.push({isEmoji: false, text: msg});
      return;
    }

    for (const emoji of emojis) {
      const i = msg.indexOf(emoji);
      this.listStr.push({isEmoji: false, text: msg.substring(0, i)});
      if (this.emojiService.getData(emoji, 1, 'facebook')) {
        this.listStr.push({isEmoji: true, text: emoji});
      } else {
        this.listStr.push({isEmoji: false, text: emoji});
      }
      msg = msg.substring(i + emoji.length);
    }
    if (msg.length > 0) {
      this.listStr.push({isEmoji: false, text: msg});
    }
  }

  emojiFallBack = (emoji: any, props: any) =>
    emoji ? `:${emoji.shortNames[0]}:` : props.emoji;
}

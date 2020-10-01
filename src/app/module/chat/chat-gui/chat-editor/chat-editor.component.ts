import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MessageChat} from '../chat-content/chat-content.component';

@Component({
  selector: 'app-chat-editor',
  templateUrl: './chat-editor.component.html',
  styleUrls: ['./chat-editor.component.css'],
})
export class ChatEditorComponent implements OnInit {

  @ViewChild('emoji', {static: false}) emoji: ElementRef;
  message = '';
  @Output() sendMsg: EventEmitter<MessageChat> = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  addEmoji(e): void {
    this.message = this.message + ' ' + e.emoji.colons;
  }

  sendMessage(): void {
    if (!this.message) {
      return;
    }
    const msg = new MessageChat();
    msg.isMe = true;
    msg.detail = this.message;
    msg.timeChat = new Date();
    this.sendMsg.emit(msg);
    this.message = '';
  }

  onKey(e): void {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  }
}

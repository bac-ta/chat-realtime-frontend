import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit {

  constructor(private chatSevice: ChatService) {
  }

  ngOnInit(): void {
  }

  openChat(): void {
    this.chatSevice.addNewChatWindow({username: 'ADMIN', content: 'content'});
  }

}

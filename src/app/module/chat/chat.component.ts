import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {AccountService} from '../pre-auth/services/account.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    const jid = this.accountService.userValue.username + '@' + environment.DOMAIN;
    const password = this.accountService.userValue.password;
    this.chatService.openConnection(jid, password);
  }

  ngOnDestroy(): void {
  }

}

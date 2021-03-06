import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {interval, Subscription} from 'rxjs';
import {User} from '../../pre-auth/model/user';
import {TabService} from '../services/tab.service';
import {SearchComponent} from './search/search.component';
import {StatusService} from '../services/status.service';
import {environment} from '../../../../environments/environment';
import {subscribePresence} from '../strophe';
import {AccountService} from '../../pre-auth/services/account.service';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.css']
})
export class ChatMenuComponent implements OnInit, OnDestroy {

  buddy: User[] = [];
  private subscriptionRoster: Subscription;
  private subscriptionNotify: Subscription;
  private subscriptionTab: Subscription;
  private tabName: string;
  @ViewChild(SearchComponent, {static: false}) searchTypeComponent: SearchComponent;


  usernamesOnline: string [] = [];

  intervalCall: any;

  constructor(private chatService: ChatService,
              private tabService: TabService,
              private statusService: StatusService,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getFriends();
    this.subscriptionRoster = this.chatService.getStatus().subscribe({
      next: (value) => {
        const user = this.buddy.find(u => u.username === value.username);
        if (user) {
          user.status = value.status;
        }
      }
    });

    this.subscriptionNotify = this.chatService.getReceiver().subscribe({
      next: (msg) => {
        const user = this.buddy.find(u => u.username === msg.username);
        if (user && this.tabName !== user.username) {
          user.notify++;
          // remove when has load history
          if (!this.tabService.chatWindowName.has(msg.username)) {
            this.chatService.listMsgNotDisplayed.push(msg);
          }
        }
      }
    });

    this.subscriptionTab = this.tabService.activeTab.subscribe(value => {
      this.tabName = value;
      const user = this.buddy.find(u => u.username === value);
      if (user) {
        user.notify = 0;
      }
    });

    //online user, update list friends
    this.intervalCall = interval(5000).subscribe(() => {
      this.statusService.findUsersOnline().subscribe(response => {
        this.usernamesOnline = response;
      });
      this.getFriends();
    });
  }


  openChat(user): void {
    subscribePresence(user.username + '@' + environment.DOMAIN);
    user.notify = 0;
    this.tabService.addNewChatWindow({username: user.username});
  }

  ngOnDestroy(): void {
    this.subscriptionRoster.unsubscribe();
    this.subscriptionNotify.unsubscribe();
    this.subscriptionTab.unsubscribe();
    if (this.intervalCall) {
      setTimeout(() => this.intervalCall.unsubscribe(), 0);
    }
  }

  getFriends(): void {
    this.subscriptionRoster = this.chatService.getRoster().subscribe(response => {
      for (let friend of response.body.rosterItem) {
        let jid = friend.jid;
        const username = jid.replace('@' + environment.DOMAIN, '');
        let user = new User();
        user.username = username;

        if (this.usernamesOnline.includes(username)) {
          user.status = 'Online';
        }
        let hasInList = false;
        for (let userItem of this.buddy) {
          if (username === userItem.username) {
            userItem.status = user.status;
            hasInList = true;
            break;
          }
        }
        if (!hasInList) {
          this.buddy.push(user);
        }
      }
    });
  }

  refreshFriends(event): void {
    if (event) {
      this.getFriends();
    }
  }
}

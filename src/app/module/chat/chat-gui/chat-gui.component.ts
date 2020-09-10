import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Subscription} from 'rxjs';
import {TabView} from 'primeng';
import {TabService} from '../services/tab.service';

export class ChatWindow {
  username: string;
}

@Component({
  selector: 'app-chat-gui',
  templateUrl: './chat-gui.component.html',
  styleUrls: ['./chat-gui.component.sass']
})
export class ChatGuiComponent implements OnInit, AfterViewInit {

  @ViewChild('tabView') tabView: TabView;
  chatWindows: ChatWindow[] = [];
  chatSubscription: Subscription;
  activeTab = 0;

  constructor(private chatService: ChatService,
              private tabService: TabService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.chatSubscription = this.tabService.chatWindows.subscribe(value => {
      if (this.chatWindows.filter(w => w.username === value.username).length <= 0) {
        this.chatWindows.push(value);
      }
      this.activeTab = this.chatWindows.map(e => e.username).indexOf(value.username);
      if (this.tabView) {
        this.tabView.activeIndexChange.emit(this.activeTab);
      }
      this.tabService.setActiveTab(this.chatWindows[this.activeTab].username);
    });
  }

  ngAfterViewInit(): void {

  }

  handleClose(e): void {
    this.chatWindows.splice(e.index, 1);
    this.activeTab = e.index - 1;
  }

  handleActiveIndexChange(e): void {
    this.activeTab = e;
    this.tabService.setActiveTab(this.chatWindows[this.activeTab].username);
  }

}

import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../chat.service';
import {Subscription} from 'rxjs';
import {TabView} from 'primeng';

export class ChatWindow {
  username: string;
  content: string;
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

  constructor(private chatService: ChatService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.chatSubscription = this.chatService.chatWindows.subscribe(value => {
      this.chatWindows.push(value);
      if (this.tabView) {
        this.tabView.activeIndexChange.emit(0);
      }
    });
  }

  ngAfterViewInit(): void {

  }

  handleClose(e): void {
    // console.log(e);
    // this.chatWindows.splice(e.index, 1);
    this.chatWindows.push({username: 'ADMIN', content: 'content'});
  }

  handleActiveIndexChange(e): void {
    console.log(e)
  }

}

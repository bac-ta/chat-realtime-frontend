import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {Subscription} from 'rxjs';

export class ChatWindow {
  username: string;
  content: string;
}

@Component({
  selector: 'app-chat-gui',
  templateUrl: './chat-gui.component.html',
  styleUrls: ['./chat-gui.component.sass']
})
export class ChatGuiComponent implements OnInit {

  chatWindows: ChatWindow[] = [];
  chatSubscription: Subscription;
  constructor(private chatService: ChatService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.chatSubscription = this.chatService.chatWindows.subscribe(value => {
        this.chatWindows.push(value);
        this.ref.detectChanges();
    });
  }

  handleClose(e): void {
    // console.log(e);
    // this.chatWindows.splice(e.index, 1);
    this.chatWindows.push({username: 'ADMIN', content: 'content'});
  }

}

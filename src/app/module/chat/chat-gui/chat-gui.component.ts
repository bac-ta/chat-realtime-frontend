import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Subscription} from 'rxjs';
import {TabView} from 'primeng';
import {TabService} from '../services/tab.service';

export class ChatWindow {
  username: string;
  roomID: number;
  naturalName: string;
}

@Component({
  selector: 'app-chat-gui',
  templateUrl: './chat-gui.component.html',
  styleUrls: ['./chat-gui.component.sass']
})
export class ChatGuiComponent implements OnInit {

  @ViewChild('tabView') tabView: TabView;
  chatWindows: ChatWindow[] = [];
  chatSubscription: Subscription;
  activeTab = 0;


  constructor(private chatService: ChatService,
              private tabService: TabService) {
  }

  ngOnInit(): void {
    this.chatSubscription = this.tabService.chatWindows.subscribe(value => {

      if (value.username) {
        if (this.chatWindows.filter(w => w.username === value.username).length <= 0) {
          this.chatWindows.push(value);
          this.tabService.modifyListWindow(true, value.username);
        }


        this.activeTab = this.chatWindows.map(e => e.username).indexOf(value.username);
        if (this.tabView) {
          this.tabView.activeIndexChange.emit(this.activeTab);
        }
        this.tabService.setActiveTab(this.chatWindows[this.activeTab].username);
      }
      //For room
      else {
        if (this.chatWindows.filter(w => w.roomID === value.roomID).length <= 0) {
          this.chatWindows.push(value);
          this.tabService.modifyListWindow(true, value.roomID);
          this.tabService.modifyListWindow(true, value.naturalName);
        }

        this.activeTab = this.chatWindows.map(e => e.roomID).indexOf(value.roomID);
        if (this.tabView) {
          this.tabView.activeIndexChange.emit(this.activeTab);
        }
        this.tabService.setActiveTab(this.chatWindows[this.activeTab].roomID);
      }

    });
  }

  handleClose(e): void {

    if (this.chatWindows[e.index].username) {
      this.tabService.modifyListWindow(false, this.chatWindows[e.index].username);
    } else {
      this.tabService.modifyListWindow(false, this.chatWindows[e.index].roomID);
    }
    this.chatWindows.splice(e.index, 1);
    this.activeTab = e.index - 1;
    if (this.chatWindows[this.activeTab].username) {
      const tabName = this.activeTab >= 0 ? this.tabService.setActiveTab(this.chatWindows[this.activeTab].username) : null;
      this.tabService.setActiveTab(tabName);
    } else {
      const tabRoom = this.activeTab >= 0 ? this.tabService.setActiveTab(this.chatWindows[this.activeTab].roomID) : null;
      this.tabService.setActiveTab(tabRoom);
    }
  }

  handleActiveIndexChange(e): void {
    this.activeTab = e;
    if (this.chatWindows[this.activeTab].username) {
      this.tabService.setActiveTab(this.chatWindows[this.activeTab].username);
    } else {
      this.tabService.setActiveTab(this.chatWindows[this.activeTab].roomID);
    }
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-room-header',
  templateUrl: './chat-room-header.component.html',
  styleUrls: ['./chat-room-header.component.css']
})
export class ChatRoomHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() openType = '';//user or room
  constructor() {
  }

  ngOnInit(): void {
  }

}

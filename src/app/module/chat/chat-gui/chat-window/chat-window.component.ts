import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @Input() content: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('dead');
  }

}

import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PickerComponent} from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat-editor',
  templateUrl: './chat-editor.component.html',
  styleUrls: ['./chat-editor.component.css'],
})
export class ChatEditorComponent implements OnInit {

  @ViewChild('emoji', { static: false }) emoji: ElementRef;
  isShow = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  showEmoji(): void {
    this.isShow = true;
    console.log(this.el);
    // this.emoji.nativeElement.focus();
  }

  hideEmoji(e): void {
    console.log(e);
    // this.isShow = false;
  }

  addEmoji(e): void {
    console.log(this.el);
    // this.isShow = false;
  }
}

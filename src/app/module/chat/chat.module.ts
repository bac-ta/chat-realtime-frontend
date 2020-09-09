import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { ChatComponent } from './chat.component';
import {SharedModule} from '../../shared/shared.module';
import { ProfileComponent } from './chat-menu/profile/profile.component';
import { ChatGuiComponent } from './chat-gui/chat-gui.component';
import {ChatService} from './chat.service';
import { ChatWindowComponent } from './chat-gui/chat-window/chat-window.component';
import { ChatHeaderComponent } from './chat-gui/chat-header/chat-header.component';
import { ChatEditorComponent } from './chat-gui/chat-editor/chat-editor.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { ChatContentComponent } from './chat-gui/chat-content/chat-content.component';
import { MessageChatComponent } from './chat-gui/chat-content/message-chat/message-chat.component';



@NgModule({
  declarations: [ChatMenuComponent, ChatComponent, ProfileComponent, ChatGuiComponent, ChatWindowComponent, ChatHeaderComponent, ChatEditorComponent, FileManagerComponent, ChatContentComponent, MessageChatComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }

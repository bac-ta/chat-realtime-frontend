import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MessageService, ToastModule} from 'primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PreAuthModule} from './module/pre-auth/pre-auth.module';
import {CoreModule} from './core/core.module';
import {AuthGuard} from './core/guards/auth.guard';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ChatModule} from './module/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    PreAuthModule,
    CoreModule,
    NgxSpinnerModule,
    ChatModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

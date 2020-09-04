import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule, InputTextModule, MessageService, ToastModule} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { InputTypeComponent } from './shared/ui-components/input-type/input-type.component';
import {config} from './shared/ui-components/config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WrapperInputComponent } from './shared/ui-components/wrapper-input/wrapper-input.component';
import {RippleModule} from 'primeng/ripple';
import {PreAuthModule} from './module/pre-auth/pre-auth.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AuthGuard} from './core/guards/auth.guard';
import { MainContentComponent } from './layout/main-content/main-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    PreAuthModule,
    CoreModule
  ],
  providers: [MessageService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

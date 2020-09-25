import { NgModule } from '@angular/core';
import {PreAuthComponent} from './pre-auth.component';
import {LoginModule} from './login/login.module';
import {RouterModule} from '@angular/router';
import {ForgotPasswordModule} from './forgot-password/forgot-password.module';
import {CreateAccountModule} from './create-account/create-account.module';
import {NewPasswordModule} from './new-password/new-password.module';


@NgModule({
  declarations: [
    PreAuthComponent
  ],
  imports: [
    ForgotPasswordModule,
    LoginModule,
    RouterModule,
    CreateAccountModule,
    NewPasswordModule
  ]
})
export class PreAuthModule { }

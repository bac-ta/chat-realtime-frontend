import { NgModule } from '@angular/core';
import {PreAuthComponent} from './pre-auth.component';
import {LoginModule} from './login/login.module';
import {RouterModule} from '@angular/router';
import {ForgotPaswordModule} from './forgot-passord/forgot-pasword.module';
import {NewPasswordModule} from './new-password/new-password.module';



@NgModule({
  declarations: [
    PreAuthComponent
  ],
  imports: [
    ForgotPaswordModule,
    LoginModule,
    RouterModule,
    NewPasswordModule
  ]
})
export class PreAuthModule { }

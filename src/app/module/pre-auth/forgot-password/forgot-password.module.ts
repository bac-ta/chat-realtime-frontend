import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {ButtonModule, InputTextModule} from 'primeng';
import {RippleModule} from 'primeng/ripple';
import {ForgotPasswordComponent} from './forgot-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-routing.module';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    ForgotPasswordRoutingModule,
    SharedModule
  ]
})
export class ForgotPasswordModule {}


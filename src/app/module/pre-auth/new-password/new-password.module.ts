import { NgModule } from '@angular/core';
import {NewPasswordComponent} from './new-password.component';
import {NewPasswordRoutingModule} from './new-password-routing.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    SharedModule,
    NewPasswordRoutingModule
  ]
})
export class NewPasswordModule { }

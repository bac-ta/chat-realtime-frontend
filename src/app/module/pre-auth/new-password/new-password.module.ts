import {NgModule} from '@angular/core';
import {NewPasswordComponent} from './new-password.component';
import {NewPasswordRoutingModule} from './new-password-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {AbstractControl} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';

// tslint:disable-next-line:typedef
export function fieldMatchValidator(control: AbstractControl) {
  const {password, passwordConfirm} = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return {fieldMatch: {message: 'Password Not Matching'}};
}

@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    FormlyModule.forRoot({
      validators: [
        {name: 'fieldMatch', validation: fieldMatchValidator},
      ]
    }),
    SharedModule,
    NewPasswordRoutingModule
  ]
})
export class NewPasswordModule { }

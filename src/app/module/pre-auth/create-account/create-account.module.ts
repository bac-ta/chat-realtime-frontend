import {NgModule} from '@angular/core';
import {CreateAccountComponent} from './create-account.component';
import {CreateAccountRoutingModule} from './create-account-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export function EmailValidator(control: FormControl): ValidationErrors {
  return !control.value || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(control.value) ? null : {email: true};
}

export function EmailValidatorMessage(err: any, field: FormlyFieldConfig): string {
  return `"${field.formControl.value}" is not a valid Email`;
}

export function fieldMatchValidator(control: AbstractControl): { fieldMatch: { message: string } } {
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
    CreateAccountComponent
  ],
  imports: [
    CreateAccountRoutingModule,
    SharedModule,
    FormlyModule.forRoot({
      validators: [
        {name: 'email', validation: EmailValidator},
        {name: 'fieldMatch', validation: fieldMatchValidator},

      ],
      validationMessages: [
        {name: 'email', message: EmailValidatorMessage},
      ],
    }),
  ],
})
export class CreateAccountModule {
}


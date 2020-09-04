import {ConfigOption} from '@ngx-formly/core';
import {InputTypeComponent} from './input-type/input-type.component';
import {WrapperInputComponent} from './wrapper-input/wrapper-input.component';
import {FormControl, ValidationErrors} from '@angular/forms';

export const config: ConfigOption = {
  types: [
    {name: 'input', component: InputTypeComponent}
  ],
  extras: { lazyRender: true },
  validationMessages: [
    { name: 'required', message: 'This field is required' },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage },
    { name: 'password', message: 'Password is not correct format' }
  ],
  wrappers: [
    { name: 'common-wrapper', component: WrapperInputComponent },
  ],
  validators: [
    { name: 'pass', validation: passwordValidator },
  ],
};

function passwordValidator(control: FormControl): ValidationErrors {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,16}$/g.test(control.value) ? null : { password: true };
}

function minlengthValidationMessage(err, field): string {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

function maxlengthValidationMessage(err, field): string {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

function minValidationMessage(err, field): string {
  return `This value should be more than ${field.templateOptions.min}`;
}

function maxValidationMessage(err, field): string {
  return `This value should be less than ${field.templateOptions.max}`;
}

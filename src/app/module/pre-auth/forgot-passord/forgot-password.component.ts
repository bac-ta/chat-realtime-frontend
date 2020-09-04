import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-forgot-passord',
  templateUrl: './forgot-passord.component.html',
  styleUrls: ['./forgot-passord.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup = new FormGroup({});
  model = {
    email: '',
  };
  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'p-grid',
    fieldGroup: [
      {
        className: 'p-col-12',
        key: 'email',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          label: 'Email',
          required: true,
          icon: 'pi pi-envelope'
        }
      }
    ]
  }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}

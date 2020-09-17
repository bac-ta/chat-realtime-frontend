import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup = new FormGroup({});
  model = {
    password: null,
    password_confirmation: null,
    resetToken: null
  };
  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'p-grid',
    fieldGroup: [
      {
        className: 'p-col-12',
        key: 'password',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          type: 'password',
          label: 'Password',
          required: true,
          icon: 'pi pi-lock'
        },
        // validators: {
        //   validation: ['pass']
        // }
      },
      {
        className: 'p-col-12',
        key: 'password',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          required: true,
          icon: 'pi pi-lock'
        },
        // validators: {
        //   validation: ['pass']
        // }
      }
    ]
  }
  ];

  constructor(
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(params => {
      this.model.resetToken = params.tokens;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}

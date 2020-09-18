import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {errorObject} from 'rxjs/internal-compatibility';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup = new FormGroup({});
  model = {
    resetToken: '',
    password: ''
  };
  fields: FormlyFieldConfig[] = [{
    validators: {
      validation: [
        {name: 'fieldMatch', options: {errorPath: 'passwordConfirm'}},
      ],
    },
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
        key: 'passwordConfirm',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          required: true,
          icon: 'pi pi-lock'
        },
      }
    ]
  }
  ];

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.model.resetToken = params.token;
    });
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      this.accountService.changePassword(this.model).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  // tslint:disable-next-line:typedef
  handleResponse(data){
    this.router.navigateByUrl('/pre-auth/login');
  }
  // tslint:disable-next-line:typedef
  handleError(data){
      this.messageService.add({severity: 'error', summary: 'Email valid', detail: data});
  }
}

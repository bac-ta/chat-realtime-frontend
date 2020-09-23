import {Component, OnInit} from '@angular/core';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  registForm: FormGroup = new FormGroup({});
  model = {
    username: '',
    name: '',
    email: '',
    password: '',
  };

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'p-grid',
    validators: {
      validation: [
        {name: 'fieldMatch', options: {errorPath: 'passwordConfirm'}},
      ],
    },
    fieldGroup: [
      {
        className: 'p-col-12',
        key: 'username',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          label: 'User Name',
          required: true,
          icon: 'pi pi-user',
        },
      },
      {
        className: 'p-col-12',
        key: 'name',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          label: 'Name',
          required: true,
          icon: 'pi pi-id-card',
        },
      },
      {
        className: 'p-col-12',
        key: 'email',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          label: 'Email',
          required: true,
          icon: 'pi pi-envelope',
        },
        validators: {
          validation: ['email'],
        },
      },
      {
        className: 'p-col-12',
        key: 'password',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          type: 'password',
          label: 'PassWord',
          required: true,
          icon: 'pi pi-lock',
        },
      },
      {
        className: 'p-col-12',
        key: 'passwordConfirm',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          type: 'password',
          placeholder: 'Please re-enter your password',
          required: true,
          icon: 'pi pi-lock',
        },
      },
    ]
  }
  ];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registForm.valid) {
      this.accountService.createUser(this.model)
        .pipe()
        .subscribe({
          next: () => {
            this.router.navigate(['/pre-auth/login']);
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Login fail', detail: error});
          }
        });
    }
  }
}

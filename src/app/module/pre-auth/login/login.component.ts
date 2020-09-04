import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {AccountService} from '../services/account.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  model = {
    username: '',
    password: ''
  };
  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'p-grid',
    fieldGroup: [
      {
        className: 'p-col-12',
        key: 'username',
        type: 'input',
        wrappers: ['common-wrapper'],
        templateOptions: {
          label: 'Account',
          required: true,
          icon: 'pi pi-user'
        }
      },
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
        validators: {
          validation: ['pass']
        }
      }
    ]
  }
  ];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.accountService.login(this.model)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Login fail', detail: error});
          }
        });
    }
  }
}

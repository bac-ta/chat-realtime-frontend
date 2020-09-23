import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {finalize, first} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup = new FormGroup({});
  model = {
    email: null,
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

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      this.spinner.show('forgotPassword');
      this.accountService.forgotPassword(this.model)
        .pipe(first(),
          finalize(() => this.spinner.hide('forgotPassword')))
        .subscribe({
          next: () => {
            this.router.navigate(['/pre-auth/login']);
          },
          error: error => {
            if (error === 'OK') {
              this.messageService.add({severity: 'success', summary: 'Send mail successful', detail: error});
            }else{
              this.messageService.add({severity: 'error', summary: 'Invalid email', detail: error});
            }
          }
        });
    }
  }


}

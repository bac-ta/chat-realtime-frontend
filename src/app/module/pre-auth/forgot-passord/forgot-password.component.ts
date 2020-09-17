import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {finalize, first} from 'rxjs/operators';

@Component({
  selector: 'app-forgot-passord',
  templateUrl: './forgot-passord.component.html',
  styleUrls: ['./forgot-passord.component.sass']
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
            this.router.navigate(['/**']);
          },
          error: error => {
            this.messageService.add({severity: 'error', summary: 'Email valid', detail: error});
          }
        });
      // alert(JSON.stringify(this.model));
      // this.accountService.forgotPassword(this.model).subscribe(
      //   data => console.log(data),
      //   error => console.log(error)
      // );
    }
  }

  // handleResponse(res){
  //   this.model.email = null;
  // }
}

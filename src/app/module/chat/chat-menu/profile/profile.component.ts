import {Component, OnInit} from '@angular/core';
import {slideDown} from '../../../pre-auth/animations';
import {AccountService} from '../../../pre-auth/services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    slideDown
  ]
})
export class ProfileComponent implements OnInit {

  stateProfileMenu = 'out';

  constructor(private accountService: AccountService,
              private router: Router,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  onShowProfileMenu(): void {
    this.stateProfileMenu = this.stateProfileMenu === 'out' ? 'in' : 'out';
  }

  onLogout(): void {
    this.accountService.logout()
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['/pre-auth/login']);
        },
        error: error => {
          this.messageService.add({severity: 'error', summary: 'Logout fail', detail: error});
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {slideDown} from '../../../pre-auth/animations';
import {AccountService} from '../../../pre-auth/services/account.service';

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

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onShowProfileMenu(): void {
    this.stateProfileMenu = this.stateProfileMenu === 'out' ? 'in' : 'out';
  }

  onLogout(): void {
    this.accountService.logout();
  }
}

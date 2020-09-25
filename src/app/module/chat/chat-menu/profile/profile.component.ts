import {Component, OnInit} from '@angular/core';
import {slideDown} from '../../../pre-auth/animations';
import {AccountService} from '../../../pre-auth/services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {ProfileService} from '../../services/profile.service';


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
  // url: '';
  displayBasic: boolean;
  model={
    description: '',
    name: '',
    avatar: ''
  }

  constructor(private accountService: AccountService,
              private router: Router,
              private messageService: MessageService,
              private profileService: ProfileService
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
          this.messageService.add({severity: 'error', summary: 'Login fail', detail: error});
        }
      });
  }

  getUsername(): string {
    if (this.accountService.userValue == null) {
      return;
    }
    return this.accountService.userValue.username;
  }

  //dialog-profile
  onShowProfileDetail() {
    this.displayBasic = true;
  }

  file: File = null;
  imageUrl: any = '/assets/layout/images/avatar.png';

  onSelectFile(event) {
    this.profileService.uploadFile(event.file)
      .pipe().subscribe({next : () =>{
        this.router.navigate([this.profileService.updateProfile(this.model)])
      }
    });
  }


}

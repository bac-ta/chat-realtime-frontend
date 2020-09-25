import {Component, OnInit} from '@angular/core';
import {slideDown} from '../../../pre-auth/animations';
import {AccountService} from '../../../pre-auth/services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {ProfileService} from '../../services/profile.service';
import {Strophe} from 'strophe.js';
import error = Strophe.error;


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
  displayBasic: boolean;
  profile = {
    name: '',
    description: '',
    avatar: ''
  };
  file = {
    fileName: '',
    fileUri: ''
  };

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

  url: string | ArrayBuffer;

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.profileService.uploadFile(event.target.files[0])
        .pipe()
        .subscribe((data) => {
          this.file = data;
          this.url = this.file.fileUri;
          this.profile.avatar = this.file.fileName;
        },
      );
    }
    this.profileService.updateProfile(this.profile)
      .pipe()
      .subscribe(()=>{
        this.router.navigate(['/#'])
      })
  }


}

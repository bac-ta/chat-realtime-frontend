import {Component, OnInit} from '@angular/core';
import {slideDown} from '../../../pre-auth/animations';
import {AccountService} from '../../../pre-auth/services/account.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {ProfileService} from '../../services/profile.service';
import {FileResponse} from '../../models/file-response';
import {ProfileResponse} from '../../models/profile-response';
import {environment} from '../../../../../environments/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  profile: ProfileResponse = {
    name: '',
    description: '',
    avatar: ''
  };
  file: FileResponse = {
    file_name: '',
    file_uri: '',
    file_type: '',
    size: 0
  };

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
    this.getData();
  }

  private readonly baseUrl: String;
  displayBasic: boolean;

  constructor(private accountService: AccountService,
              private router: Router,
              private messageService: MessageService,
              private profileService: ProfileService,
  ) {
    this.baseUrl = environment.apiUrl;
  }

  url: string|ArrayBuffer;


  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.profileService.getProfile()
      .pipe()
      .subscribe((data)=>{
        this.profile = data;
        if (this.profile.avatar != null){
          this.url = this.baseUrl + '/file/view-file/'+ this.profile.avatar;
        }
      })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]){
      this.profileService.uploadFile(event.target.files[0])
        .pipe()
        .subscribe((data) => {
          this.file = data;
          this.url = this.file.file_uri;
          this.profile.avatar = this.file.file_name;
          },
        );
    }
  }

  updateProfile(){
    this.profileService.updateProfile(this.profile)
      .pipe()
      .subscribe(()=>{
        this.router.navigate(['/']);
      })
  }

  modalDisplay: boolean;
  mask: boolean = false;
  showAvatar(){
    this.modalDisplay = true;
    this.mask = true;
  }
}

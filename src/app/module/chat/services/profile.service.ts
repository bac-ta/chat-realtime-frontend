import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from '../../pre-auth/services/account.service';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FileResponse} from '../models/file-response';
import {ProfileResponse} from '../models/profile-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<any> {
  constructor(protected injector: Injector, private accountService: AccountService, private router: Router) {
    super(injector);
  }

  uploadFile(file): Observable<FileResponse> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    let formData: FormData = new FormData();
    formData.append('file', file);
    return  this.post('/file/upload-file', {formData}, customHeader)
      .pipe(map(res => {
      let body = res.body;
      let fileName: string = body['file_name'];
      let fileUri: string = body['file_uri'];
      return new FileResponse(fileName, fileUri);
    }));
  }

  updateProfile({name, description, avatar}): Observable<any> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    return  this.put('/profile/update-profile', {name, description, avatar}, customHeader)
     .pipe(map(() => {
      this.router.navigate(['/']);
    }));
  }

  getProfile(): Observable<ProfileResponse>{
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    return  this.get('/profile/get-profile', customHeader)
      .pipe(map(res=> {
      let body = res.body;
      let name: string = body['name'];
      let description: string = body['description'];
      let avatar: string = body['avatar'];
      return new ProfileResponse(name, description, avatar);
      })
    );
  }
}

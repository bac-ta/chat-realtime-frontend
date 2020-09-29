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

  uploadFile({file}): Observable<FileResponse> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    const observable = this.post('/file/upload-file', {file}, customHeader);
    return observable.pipe(map(res => {
      return res.body;
    }));
  }

  updateProfile({name, description, avatar}): Observable<any> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    const observable = this.put('/profile/update-profile', {name, description, avatar}, customHeader);
    return observable.pipe(map(() => {
      this.router.navigate(['/']);
    }));
  }

  getProfile(): Observable<ProfileResponse>{
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    const observable = this.get('/profile/get-profile', customHeader);
    return observable.pipe(map(res=> {
      return res.body;
      })
    );
  }
}
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from '../../pre-auth/services/account.service';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<any> {
  constructor(protected injector: Injector, private accountService: AccountService) {
    super(injector);
  }

  updateProfile({name, description, avatar}): Observable<any> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    const observable = this.put('/profile/update-profile', {name, description, avatar}, customHeader);
    return observable.pipe(map(res => {
      return res.body;
    }));
  }

  uploadFile({file}): Observable<any> {
    const user = this.accountService.userValue;
    const customHeader = {
      'Authorization': 'Bearer ' + user.accessToken
    };
    const observable = this.post('/file/upload-file', {file}, customHeader);
    return observable.pipe(map(res => {
      return res.body;
    }));
  }
}

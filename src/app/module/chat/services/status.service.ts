import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from '../../../core/services/base.service';
import {AccountService} from '../../pre-auth/services/account.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseService<any> {

  constructor(
    protected injector: Injector,
    private accountService: AccountService
  ) {
    super(injector);
  }


  public findUsersOnline(): Observable<string[]> {
    const user = this.accountService.userValue;
    const customHeaders = {
      'Authorization': 'Bearer ' + user.accessToken
    };

    return this.get('/user/online', customHeaders).pipe(map(responses => {
      return responses.body;
    }));
  }
}

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
    protected injector: Injector
  ) {
    super(injector);
  }


  public findUsersOnline(): Observable<string[]> {

    return this.get('/user/online', {}).pipe(map(responses => {
      return responses.body;
    }));
  }
}

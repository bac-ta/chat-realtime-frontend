import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<User> {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    super(injector);
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login({username, password}): Observable<any> {
    return this.post('/auth/login', {username, password})
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const user = new User();
        user.username = username;
        user.password = password;
        user.accessToken = res.body.accessToken;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout(): Observable<any> {
    const user = this.userValue;
    console.log(user);

    const customHeaders = {
      'Authorization': 'Bearer ' + user.accessToken
    };

    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    return this.delete('/auth/logout', customHeaders)
      .pipe(map(() => {
        this.router.navigate(['/pre-auth/login']);
      }));
  }

  createUser({username, name, email, password}): Observable<any> {
    return this.post('/user/create', {username, name, email, password})
      .pipe(map(() => {
        this.router.navigate(['/pre-auth/login']);
      }));
  }
}

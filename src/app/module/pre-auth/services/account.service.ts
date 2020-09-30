import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {BaseService} from '../../../core/services/base.service';
import {catchError, map} from 'rxjs/operators';
import {NewPassword} from '../model/new-password';
import {ChatService} from '../../chat/services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<User> {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private newPasswordSubject: BehaviorSubject<NewPassword>;
  public newPassword: Observable<NewPassword>;

  constructor(
    private router: Router,
    protected injector: Injector,
    private chatService: ChatService
  ) {
    super(injector);
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
    this.newPasswordSubject = new BehaviorSubject<NewPassword>(new NewPassword());
    this.newPassword = this.newPasswordSubject.asObservable();
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
    this.chatService.disconnect();
    const user = this.userValue;

    if (user == null) {
      this.router.navigate(['/pre-auth/login']);
      return;
    }

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

  forgotPassword({email}): Observable<any> {
    return this.post('/user/forgot-password', {email})
      .pipe(map(() => {
          this.router.navigate(['/pre-auth/login']);
        }));
  }

  changePassword({resetToken, password}): Observable<any> {
    return this.put('/user/reset-password', {resetToken, password})
      .pipe(map(() => {
        this.router.navigate(['/pre-auth/login']);
      }));
  }
}

import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {BaseService} from '../../../core/services/base.service';
import {catchError, map} from 'rxjs/operators';
import {RequestPasswordReset} from '../model/request-password-reset';
import {NewPassword} from '../model/new-password';
@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<User> {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private passwordResetSubject: BehaviorSubject<RequestPasswordReset>;
  public passwordReset: Observable<RequestPasswordReset>;
  private newPasswordSubject: BehaviorSubject<NewPassword>;
  public newPassword: Observable<NewPassword>;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    super(injector);
    this.passwordResetSubject = new BehaviorSubject<RequestPasswordReset>(new RequestPasswordReset());
    this.passwordReset = this.passwordResetSubject.asObservable();
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

  forgotPassword({email}): Observable<any> {
    return this.post('/user/forgot-password', {email})
      .pipe(map(res => {
          const passwordReset = new RequestPasswordReset();
          passwordReset.email = email;
          JSON.stringify(passwordReset);
          this.passwordResetSubject.next(passwordReset);
        }
        )
      );
  }

  changePassword({resetToken, password}): Observable<any> {
    return this.put('/user/reset-password', {resetToken, password})
      .pipe(map(res => {
        const newPassword = new NewPassword();
        newPassword.resetToken = resetToken;
        newPassword.password = password;
        JSON.stringify(newPassword);
        this.newPasswordSubject.next(newPassword);
        return newPassword;
      }));
  }
}

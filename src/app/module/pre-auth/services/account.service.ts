import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BaseService} from '../../../core/services/base.service';
import {catchError, map} from 'rxjs/operators';
import {RequestPasswordReset} from '../model/request-password-reset';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<User> {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private passwordResetSubject: BehaviorSubject<RequestPasswordReset>;
  public passwordReset: Observable<RequestPasswordReset>;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    super(injector);
    this.passwordResetSubject = new BehaviorSubject<RequestPasswordReset>(JSON.parse(sessionStorage.getItem('forgotPassword')));
    this.passwordReset = this.passwordResetSubject.asObservable();
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

  forgotPassword(email) {
    return this.post('/user/forgot-password', email)
      .pipe(map(res => {
          const passwordReset = new RequestPasswordReset();
          passwordReset.email = email;
          sessionStorage.setItem('forgotPassword', JSON.stringify(passwordReset));
          this.passwordResetSubject.next(passwordReset);
        }
        )
      );
  }
  // tslint:disable-next-line:typedef
  // forgotPassword(email) {
  //   return this.post('/user/forgot-password', email);
  // }
  // verifyUser(data): Observable<any> {
  //   return this.post('/user/forgot-password', data).pipe(
  //     catchError((error: HttpErrorResponse) => throwError(error))
  //   );
  // }

  logout(): void {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/pre-auth/login']);
  }
}

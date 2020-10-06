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

  uploadFile(file: File): Observable<FileResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.upLoadFile('/file/upload-file', formData)
      .pipe(map(res => {
        return res.body;
      }));
  }

  updateProfile({name, description, avatar}): Observable<any> {
    return this.put('/profile/update-profile', {name, description, avatar})
     .pipe(map(() => {
      this.router.navigate(['/']);
    }));
  }

  getProfile(): Observable<ProfileResponse>{
    return this.get('/profile/get-profile')
      .pipe(map(res=> {
        return res.body;
      })
    );
  }
}

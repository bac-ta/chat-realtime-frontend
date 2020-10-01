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
    return  this.post('/file/upload-file', {formData})
      .pipe(map(res => {
      let body = res.body;
      let fileName: string = body['file_name'];
      let fileUri: string = body['file_uri'];
      return new FileResponse(fileName, fileUri);
    }));
  }

  updateProfile({name, description, avatar}): Observable<any> {
    return  this.put('/profile/update-profile', {name, description, avatar})
     .pipe(map(() => {
      this.router.navigate(['/']);
    }));
  }

  getProfile(): Observable<ProfileResponse>{
    return  this.get('/profile/get-profile')
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

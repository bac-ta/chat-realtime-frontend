import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected http: HttpClient = this.injector.get(HttpClient);
  private readonly baseUrl: string;
  constructor(protected injector: Injector) {
    this.baseUrl = environment.apiUrl;
  }

  public get(url, customHeaders = {}): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders(Object.assign({
      'Content-Type': 'application/json',
    }, customHeaders));
    return this.http.get<T>(this.baseUrl + url, {
      headers,
      observe: 'response'
    });
  }

  public post(url: string, data, customHeaders = {}): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders(Object.assign({
      'Content-Type': 'application/json',
    }, customHeaders));
    return this.http.post<T>(this.baseUrl + url, data, {
      headers,
      observe: 'response'
    });
  }

  public put(url: string, data, customHeaders = {}): Observable<HttpResponse<T>> {
    const headers = new HttpHeaders(Object.assign({
      'Content-Type': 'application/json',
    }, customHeaders));
    return this.http.put<T>(this.baseUrl + url, data, {
      headers,
      observe: 'response'
    });
  }
}

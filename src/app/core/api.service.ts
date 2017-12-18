import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Dog } from './../core/dog';
import { DogDetail } from './../core/dog-detail';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private _API = 'http://localhost:1337/api';
  private _accessToken = localStorage.getItem('access_token');

  constructor(
    private http: HttpClient,
    public auth: AuthService) { }

  getDogs$(): Observable<Dog[]> {
    return this.http
      .get(`${this._API}/dogs`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`)
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getDogByRank$(rank: number): Observable<DogDetail> {
    return this.http
      .get(`${this._API}/dog/${rank}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`)
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1 || err.message.indexOf('UnauthorizedError') > -1) {
      this.auth.logout();
      this.auth.login();
    }
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }

}

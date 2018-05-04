import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { Dog } from './../core/dog';
import { DogDetail } from './../core/dog-detail';

@Injectable()
export class ApiService {
  private _API = `${environment.apiRoot}api`;

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getDogs$(): Observable<Dog[]> {
    return this.http
      .get(`${this._API}/dogs`)
      .pipe(
        catchError((err, caught) => this._onError(err, caught))
      );
  }

  getDogByRank$(rank: number): Observable<DogDetail> {
    return this.http
      .get(`${this._API}/dog/${rank}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.accessToken}`)
      })
      .pipe(
        catchError((err, caught) => this._onError(err, caught))
      );
  }

  private _onError(err, caught) {
    let errorMsg = 'Error: Unable to complete request.';
    if (err instanceof HttpErrorResponse) {
      errorMsg = err.message;
      if (err.status === 401 || errorMsg.indexOf('No JWT') > -1 || errorMsg.indexOf('Unauthorized') > -1) {
        this.auth.login();
      }
    }
    return _throw(errorMsg);
  }

}

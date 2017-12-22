import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Dog } from './../../core/dog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styles: []
})
export class DogsComponent implements OnInit {
  pageTitle = 'Popular Dogs';
  dogsList$: Observable<Dog[]>;
  loading = true;
  error: boolean;

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService) {
      this.dogsList$ = api.getDogs$().pipe(
        map(res => this._dataSuccess(res)),
        catchError(err => this._dataError(err))
      );
    }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  private _dataSuccess(res: Dog[]): Dog[] {
    this.loading = false;
    return res;
  }

  private _dataError(err: any): Observable<any> {
    this.loading = false;
    this.error = true;
    return Observable.throw('An error occurred fetching dogs data.');
  }

}

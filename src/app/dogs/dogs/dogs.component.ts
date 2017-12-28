import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../core/api.service';
import { Dog } from './../../core/dog';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html'
})
export class DogsComponent implements OnInit {
  pageTitle = 'Popular Dogs';
  dogsList$: Observable<Dog[]>;
  loading = true;
  error: boolean;

  constructor(
    private title: Title,
    private api: ApiService
  ) {
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

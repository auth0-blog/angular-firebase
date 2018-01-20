import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../core/api.service';
import { Dog } from './../../core/dog';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

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
      tap(val => this._onNext(val)),
      catchError((err, caught) => this._onError(err, caught))
    );
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  private _onNext(val: Dog[]) {
    this.loading = false;
  }

  private _onError(err, caught): Observable<any> {
    this.loading = false;
    this.error = true;
    return Observable.throw('An error occurred fetching dogs data.');
  }

}

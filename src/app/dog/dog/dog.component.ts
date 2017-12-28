import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../core/api.service';
import { DogDetail } from './../../core/dog-detail';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styles: [`
    .dog-photo {
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      min-height: 250px;
      width: 100%;
    }
  `]
})
export class DogComponent implements OnInit, OnDestroy {
  paramSub: Subscription;
  dog$: Observable<DogDetail>;
  loading = true;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private title: Title) { }

  ngOnInit() {
    this.paramSub = this.route.params
      .subscribe(
        params => {
          this.dog$ = this.api.getDogByRank$(params.rank).pipe(
            map(res => this._dataSuccess(res)),
            catchError(err => this._dataError(err))
          );
        }
      );
  }

  private _dataSuccess(res: DogDetail): DogDetail {
    this.loading = false;
    return res;
  }

  private _dataError(err: any): Observable<any> {
    this.loading = false;
    this.error = true;
    return Observable.throw('An error occurred fetching detail data for this dog.');
  }

  getPageTitle(dog: DogDetail): string {
    const pageTitle = `#${dog.rank}: ${dog.breed}`;
    this.title.setTitle(pageTitle);
    return pageTitle;
  }

  getImgStyle(url: string) {
    return `url(${url})`;
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

}

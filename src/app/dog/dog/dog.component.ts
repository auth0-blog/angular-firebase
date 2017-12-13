import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs/Observable';
import { DogDetail } from './../../core/dog-detail';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styles: [`
    .dog-photo {
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      border-radius: .2rem;
      min-height: 250px;
    }
  `]
})
export class DogComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  dog$: Observable<DogDetail>;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    private title: Title) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe(
        params => this.dog$ = this.api.getDogByRank$(params['rank'])
      );
  }

  getImgStyle(url: string) {
    return `url(${url})`;
  }

  getPageTitle(dog: DogDetail): string {
    const pageTitle = `#${dog.rank}: ${dog.breed}`;
    this.title.setTitle(pageTitle);
    return pageTitle;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs/Observable';
import { Dog } from './../../core/dog';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styles: []
})
export class DogComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  dog: Dog;
  dogSub: Subscription;
  pageTitle: string;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    private title: Title) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .subscribe(
        params => {
          this._getDog(params['rank']);
        }
      );
  }

  private _getDog(rank) {
    this.dogSub = this.api.getDogByRank$(rank)
      .subscribe(dog => {
        this.dog = dog;
        this.pageTitle = `#${this.dog.rank}: ${this.dog.breed}`;
        this.title.setTitle(this.pageTitle);
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.dogSub.unsubscribe();
  }

}

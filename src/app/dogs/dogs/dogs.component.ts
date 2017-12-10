import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
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

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService) {
      this.dogsList$ = api.getDogs$();
    }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Dog } from './../../core/dog';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styles: []
})
export class DogsComponent implements OnInit {
  dogsList$: Observable<Dog[]>;

  constructor(
    public auth: AuthService,
    private api: ApiService) {
      this.dogsList$ = api.getDogs$();
    }

  ngOnInit() {
  }

}

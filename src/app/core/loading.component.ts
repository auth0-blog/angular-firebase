import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <p class="text-center">
      Loading...
    </p>
  `,
  styles: []
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

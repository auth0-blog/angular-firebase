import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <p class="text-center m-0">
      <img
        class="py-2"
        src="/assets/images/loading.svg">
    </p>
  `,
  styles: [`
    img {
      display: inline-block;
      height: 80px;
      width: 80px;
    }
  `]
})
export class LoadingComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}

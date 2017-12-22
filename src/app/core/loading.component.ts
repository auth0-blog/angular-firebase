import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div [ngClass]="{'inline': inline, 'text-center': !inline, 'py-2': !inline }">
      <img src="/assets/images/loading.svg">
    </div>
  `,
  styles: [`
    .inline {
      display: inline-block;
    }
    img {
      height: 80px;
      width: 80px;
    }
    .inline img {
      height: 24px;
      width: 24px;
    }
  `]
})
export class LoadingComponent {
  @Input() inline: boolean;
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <p class="alert alert-danger">
      <strong>Error:</strong> There was an error retrieving data.
    </p>
  `,
  styles: []
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

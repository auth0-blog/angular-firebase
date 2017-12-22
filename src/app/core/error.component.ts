import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <p class="alert alert-danger">
      <strong>Error:</strong> There was an error retrieving data.
    </p>
  `
})
export class ErrorComponent {
}

import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    img {
      border-radius: 100px;
      width: 30px;
    }
    .loading { line-height: 31px; }
    .home-link { color: #212529; }
    .home-link:hover { text-decoration: none; }
  `]
})
export class HeaderComponent {

  constructor(public auth: AuthService) {}

}

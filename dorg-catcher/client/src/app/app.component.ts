import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isOverlayVisible = true;
  isLoggedIn = false;

  constructor(
    private loginService: LoginService) {

      this.loginService.logging.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });

      this.isOverlayVisible = true;

      if (window.location.href.search("login") == -1) {
        this.isLoggedIn = this.loginService.checkLogin();
        this.isOverlayVisible = false;
      } else {
        this.isLoggedIn = true;
        this.isOverlayVisible = false;
      }
  }
}

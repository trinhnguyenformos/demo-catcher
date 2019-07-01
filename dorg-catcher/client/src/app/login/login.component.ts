import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    login: null,
    password: null
  };

  errorMessage = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.changeAuth(false);
  }

  login() : void {
    console.log("login---", this.user);
    if (this.user.login !== null && this.user.password !== null) {
      this.loginService.changeAuth(true);
      this.router.navigate(['index']);
    } else {
      this.loginService.changeAuth(false);
      this.errorMessage = "Login failed. Please try again or contact <a href=\"mailto:admin@admin.com\">admin@admin.com</a>.";
    }

//    this.loginService.login(this.user.login, this.user.password).subscribe(result => {
//      this.loginService.changeAuth(result.isActive);
//      this.errorMessage = result.isActive == false ? "Login failed. Please try again or contact <a href=\"mailto:support@rokolabs.com\">support@rokolabs.com</a>." : "";
//      if (result.isActive) {
//        window.location.href = 'http://localhost:4200' + "/#/index";
//      }
//      }, (err) => {
//        console.log(err);
//        this.loginService.changeAuth(false);
//        this.errorMessage = this.getLoginErrorMessage(err);
//      }
//    );
  }

  getLoginErrorMessage(err) : string {
    let error = err.error;
    if (err.status === 404) {
      error = "Your username or password was incorrect. Please try again or contact <a href=\"mailto:support@rokolabs.com\">support@rokolabs.com</a>."
    } else if (err.status === 406) {
      error = "Your account has been deactive. Please contact <a href=\"mailto:support@rokolabs.com\">support@rokolabs.com</a>."
    } else if (err.status === 500) {
      error = "Internal Server Error. Please contact <a href=\"mailto:support@rokolabs.com\">support@rokolabs.com</a>."
    } else {
      //error = "Your account has been suspended due to too many invalid login attempts. Please contact <a href=\"mailto:support@rokolabs.com" + "\">support@rokolabs.com</a> to restore your access.";
      error = "Login failed. Please try again or contact <a href=\"mailto:support@rokolabs.com\">support@rokolabs.com</a>."
    }
    return error;
  }
}

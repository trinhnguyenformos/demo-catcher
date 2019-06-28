import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/' + 'account';
  @Output() logging: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getUsername() {
    return 'admin@admin.com';
  }

  getUser() {
    let user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      return user;
    }
    else {
      return {
        isAuthenticated: false,
        roles: null
      };
    }
  }

  setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  changeAuth(loggedIn) {
    let user: any = this.getUser();
    user.isAuthenticated = loggedIn;
    this.setUser(user);
    this.logging.emit(loggedIn);
  }

  login(email, password) {
    let params = new HttpParams();
    params = params.append('userName', email);
    //params = params.append('hashedPassword', Md5.hashStr(password).toString());

    //return this.http.get<any>(this.baseUrl + '/user/login', { params: params });
    return {
      login: email,
      isActive: true,
      isAuthenticated: true
    };
  }

  logout() {
    return this.http.get<any>(this.baseUrl + '/user/logout').subscribe(
      results => {
        var loggedIn = !results.data.status;
        this.changeAuth(loggedIn);
        return loggedIn;
      }, ( err ) => {
        console.log("logout", err);
      }
    );
  }

  checkLogin() {
    let loggedIn = true;
    let user: any = this.getUser();
    if (!user.isAuthenticated) {
      //window.location.href = config.app_name + "/#/login";
      loggedIn = false;
    }
    return loggedIn;
  }
}

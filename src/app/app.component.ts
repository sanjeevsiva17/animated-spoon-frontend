import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { empty } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-frontend';

  constructor(public cookieService: CookieService, public router: Router) {
  }

  public logout: any = () => {
    this.cookieService.delete("authtoken")
    this.router.navigate(["/login"]);
  }

  public isLogin: any = () => {
    var isLoggedin = true;
    console.log(this.cookieService.get('authtoken'));
    isLoggedin = this.cookieService.get('authtoken') == null || this.cookieService.get('authtoken').length == 0 ? false : true;
    return isLoggedin;
  }
}


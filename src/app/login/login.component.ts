import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService, public appService: AppService, public router: Router) { }

  public username: String
  public password: String
  ngOnInit(): void {
    this.checkIfAuthToken();
  }

  public checkIfAuthToken: any = () => {

    if (this.cookieService.get('authtoken')) {
      this.router.navigate(["/landing"]);
    }
  }

  public login() {
    console.log(this.username, this.password)

    this.appService.login(this.username, this.password)
      .subscribe(

        (apiResponse) => {
          console.log(apiResponse)
          if (apiResponse) {

            localStorage.setItem('userId', apiResponse['userId']);
            console.log(localStorage.getItem('userId'));
            let authtoken = apiResponse["token"];
            this.cookieService.set('authtoken', authtoken, 30, '/', "localhost");

            this.router.navigate(['/landing'])

          } else {

            window.scroll(0, 0)
          }
        },
        (error) => {

          console.log(error);
          window.scroll(0, 0);
          return null;
        })
  }

}

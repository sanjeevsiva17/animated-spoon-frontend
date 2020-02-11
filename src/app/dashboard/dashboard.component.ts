import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public appService: AppService, public cookieService: CookieService, public router: Router) { }

  ngOnInit(): void {
    this.checkIfAuthTokenAndGetImages();

  }

  public imagesQueue: any = [];



  public checkIfAuthTokenAndGetImages: any = () => {


    if (!this.cookieService.get('authtoken')) {
      this.router.navigate(["/login"]);
    }
    else {
      var userId = localStorage.getItem("userId");
      this.appService.getImages(userId, this.cookieService.get('authtoken'))
        .subscribe(

          (apiResponse) => {
            console.log(apiResponse)
            if (apiResponse) {
              console.log(apiResponse)
              this.imagesQueue = apiResponse;
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
}



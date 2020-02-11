import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(public appService: AppService, public cookieService: CookieService, public router: Router) { }

  ngOnInit(): void {
    this.checkIfAuthToken();
  }

  public imagesQueue: any = [];
  public imageUrls: any = [];


  public checkIfAuthToken: any = () => {

    if (!this.cookieService.get('authtoken')) {
      this.router.navigate(["/login"]);
    }
  }

  //Api call to Process Images and update the catalog with given zsn
  public uploadImagesForProcessing = () => {

    this.appService.uploadFiles(this.imagesQueue, this.cookieService.get('authtoken'))
      .subscribe(

        (apiResponse) => {
          console.log(apiResponse)
          if (apiResponse) {
            this.appService.writeFiles(apiResponse["img"], this.cookieService.get('authtoken'))
              .subscribe(
                (apiResponse) => {
                  console.log(apiResponse)
                  this.router.navigate(["/dashboard"])
                }
              );
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


  //Add images to the queue once they are selected
  public addToImagesQueue($event) {

    let files: FileList = $event.target.files;

    for (let i = 0; i < files.length; i++) {

      var reader = new FileReader();
      reader.onload = ($event: any) => {
        this.imagesQueue.push(files[i]);
        this.imageUrls.push($event.target.result);
      }

      reader.readAsDataURL($event.target.files[i]);
    }
    

    console.log("imagesQueue is ");
    console.log(this.imagesQueue[0]);
  }

}

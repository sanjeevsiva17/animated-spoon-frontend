import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient, public router: Router) { }

  public writeFiles: any = (url, auth) => {
    var data = {}
    data["userId"] = 2
    data["imageUrl"] = url

    console.log(data)
    return this.http.post('http://localhost:8000/api/v1/write?auth=' + auth, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZWxsb3dvcmxkIiwiaWF0IjoxNTgxMzk4ODY2LCJleHAiOjE1ODE0MTY4NjZ9.d425yIqNfDkaCfnUtlgNtycnNQYRsm4xvBIJzfpA5zBzrV8C99QJjtnKiBLI5t5pnnDDyKT_mDJr5bN68XnE0A'
        }
      })
  }

  public uploadFiles: any = (files, auth) => {

    let formData: FormData = new FormData();

    formData.append(`file`, files[0]);

    return this.http.post(`http://localhost:8000/api/v1/upload/file` + '?auth=' + auth, formData, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZWxsb3dvcmxkIiwiaWF0IjoxNTgxMzk4ODY2LCJleHAiOjE1ODE0MTY4NjZ9.d425yIqNfDkaCfnUtlgNtycnNQYRsm4xvBIJzfpA5zBzrV8C99QJjtnKiBLI5t5pnnDDyKT_mDJr5bN68XnE0A'
      }
    });
  }

  public login: any = (username, password) => {
    var data = {}
    data["username"] = username
    data["password"] = password

    console.log(data)
    return this.http.post('http://localhost:8000/authenticate', data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }

  public getImages: any = (userId, auth) => {
    return this.http.get('http://localhost:8000/api/v1/userid/' + userId + '?auth=' + auth,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }
}

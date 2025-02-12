import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { SignUpDto } from '../interfaces/Dtos/signUpDto';
import { loginRequestDto as loginRequest } from '../interfaces/Dtos/loginRequestDto';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private tokenString !: string

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:5056/api"

  signUpUser(obj: SignUpDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<SignUpDto>(`${this.baseUrl}/Person/SavePerson`, obj, httpOptions);
  }


  authenticate(obj : loginRequest) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post<any>(`${this.baseUrl}/Auth/Authenthicate`, obj, httpOptions)
  }

  getAuthUser() : Observable<any> {
    // console.log(this.token)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenString}`
      })
    }
    return this.http.get<any>(`${this.baseUrl}/Auth/GetAuthUser`, httpOptions)
  }

  getUserByFullName(fullname : string) : Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let tempObj = {
      fullName : fullname
    }
    return this.http.post<any>(`${this.baseUrl}/Person/GetUsersByFullName`, tempObj, httpOptions)
  }

  set token(token : string) {
    this.tokenString = token
  }

  get token() : string {
    return this.tokenString
  }
}

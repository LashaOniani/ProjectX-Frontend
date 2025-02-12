import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  baseUrl : string = "http://localhost:5056/api/Group";

  constructor(private http : HttpClient) { }

  get_categories() : Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any>(`${this.baseUrl}/GetFaculties`, httpOptions)
  }
}

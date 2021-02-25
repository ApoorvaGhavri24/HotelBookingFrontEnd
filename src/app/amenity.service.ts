import {Room} from './Room';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable(
  {
    providedIn:'root'
  }
)
export class AmenityService {
  private headers: HttpHeaders;

  baseURL = 'https://localhost:44337/api';


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

   }
   public  getAmenity(): Observable<any> {
    return this.http.get(this.baseURL + '/amenity', {headers: this.headers});
  }
   public  getAmenities(): Observable<any> {
    return this.http.get(this.baseURL + '/amenity', {headers: this.headers});
  }
  public  getAmenityById(id): Observable<any> {
    return this.http.get(this.baseURL +  '/amenity/' + id, {headers: this.headers});
  }
}

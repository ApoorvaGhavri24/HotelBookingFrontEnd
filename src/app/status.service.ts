import { Injectable } from '@angular/core';
import {Status} from './Status';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private headers: HttpHeaders;

  
  baseURL: string = "https://localhost:44337/api/Status";

 
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }
  public  getStatus() : Observable<any> {
    return this.http.get(this.baseURL, {headers: this.headers})
  }
  public  getStatusbyId(id) : Observable<any> {
    return this.http.get(this.baseURL+ '/' + id, {headers: this.headers})
  }
}

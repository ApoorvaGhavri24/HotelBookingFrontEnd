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

  baseURL = 'https://localhost:44337/api';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }
  public  getStatus(): Observable<any> {
    return this.http.get(this.baseURL + '/status', {headers: this.headers});
  }
  public  getStatusbyId(id): Observable<any> {
    return this.http.get(this.baseURL + '/status/'  + id, {headers: this.headers});
  }
  public  getStatusnew(): Observable<any> {
    return this.http.get(this.baseURL + '/status', {headers: this.headers});
  }
}

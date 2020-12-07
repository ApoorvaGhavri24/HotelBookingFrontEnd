import { Injectable } from '@angular/core';
import {RoomAminity} from './RoomAminity';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RoomAminityService {

  private headers: HttpHeaders;

  baseURL = 'https://localhost:44337/api/RoomAminities';


  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }
  public  getRoomAmenities(): Observable<any> {
    return this.http.get(this.baseURL, {headers: this.headers});
  }
  public  getRoomAmenitiesbyId(id): Observable<any> {
    return this.http.get(this.baseURL + '/' + id, {headers: this.headers});
  }
  public updateRoomAmenities(roomamenity: RoomAminity) {
    return this.http.put(this.baseURL + '/' + roomamenity.id, roomamenity, {headers: this.headers});
  }

  public addRoomAmenities(roomamenity: RoomAminity): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(roomamenity);
    console.log(body);
    return this.http.post(this.baseURL , body, {'headers': headers});
  }
  public  getAmenity(): Observable<any> {
    return this.http.get(this.baseURL + '/amenity', {headers: this.headers});
  }



}

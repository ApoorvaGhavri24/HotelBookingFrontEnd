import {Room} from './Room'
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
 export  class  RoomService{
    private headers: HttpHeaders;

  
    baseURL: string = "https://localhost:44337/api/Rooms";
 
    constructor(private http: HttpClient) {
      this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    }
 
    public  getRooms() : Observable<any> {
        return this.http.get(this.baseURL, {headers: this.headers})
      }
      public  getRoombyId(id) : Observable<any> {
        return this.http.get(this.baseURL+ '/' + id, {headers: this.headers})
      }
      public updateRoom(room:Room) {
        return this.http.put(this.baseURL + '/' + room.id, room, {headers: this.headers});
      }


      public  GetRoombyroomnumber(rno) : Observable<any> {
        return this.http.get(this.baseURL+ '/GetRoombyroomnumber/' + rno, {headers: this.headers})
      }
      public addRoom(room:Room): Observable<any> {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(room);
        console.log(body)
        return this.http.post(this.baseURL , body,{'headers':headers})
      }
}

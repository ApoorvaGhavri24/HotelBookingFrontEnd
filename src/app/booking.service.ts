import { Injectable } from '@angular/core';
import {Booking} from './Booking';
import {newbooking} from './newbooking';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private headers: HttpHeaders;

  baseURL = 'https://localhost:44337/api';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }
  public  getBookingbyId(id): Observable<any> {
    return this.http.get(this.baseURL + '/getBookingbById/' + id, {headers: this.headers});
  }
  public  getBookingbycheckindate(date): Observable<any> {
    return this.http.get(this.baseURL + '/getBookingbycheckin/' + date, {headers: this.headers});
  }
  public  getBookingbycheckoutdate(date): Observable<any> {
    return this.http.get(this.baseURL + '/getBookingbycheckout/' + date, {headers: this.headers});
  }
  public  Occupancy(date): Observable<any> {
    return this.http.get(this.baseURL + '/occupancy/' + date, {headers: this.headers});
  }
  public  GetBookingbyRoomnumber(id): Observable<any> {
    return this.http.get(this.baseURL + '/getBookingbyRoomnumber/' + id, {headers: this.headers});
  }

  public UpdateBooking(booking: Booking) {
    return this.http.put(this.baseURL + '/updateBooking/' + booking.id, booking, {headers: this.headers});
  }
  public  getBooking(): Observable<any> {
    return this.http.get(this.baseURL + '/getBookings', {headers: this.headers}).pipe(
      map((response: any) => {
        // adjust data before return
        return response;
      })
    );
  }
  public getAvailableRooms(booking: Booking): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(booking);
    // console.log(body)
    return this.http.put(this.baseURL + '/getBooking2', body, {'headers': headers});
  }
  public addBooking(booking: Booking): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(booking);
    console.log(body);
    return this.http.post(this.baseURL + '/addBooking' , body, {'headers': headers});
  }
}

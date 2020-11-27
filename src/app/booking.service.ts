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

  baseURL = 'https://localhost:44337/api/Bookings';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }
  public  getBookingbyId(id): Observable<any> {
    return this.http.get(this.baseURL + '/' + id, {headers: this.headers});
  }
  public  getBookingbycheckindate(date): Observable<any> {
    return this.http.get(this.baseURL + '/GetBookingbycheckin/' + date, {headers: this.headers});
  }
  public  getBookingbycheckoutdate(date): Observable<any> {
    return this.http.get(this.baseURL + '/GetBookingbycheckout/' + date, {headers: this.headers});
  }
  public  Occupancy(date): Observable<any> {
    return this.http.get(this.baseURL + '/Occupancy/' + date, {headers: this.headers});
  }
  public  GetBookingbyRoomnumber(id): Observable<any> {
    return this.http.get(this.baseURL + '/GetBookingbyRoomnumber/' + id, {headers: this.headers});
  }

  public UpdateBooking(booking: Booking) {
    return this.http.put(this.baseURL + '/' + booking.id, booking, {headers: this.headers});
  }
  public  getBooking(): Observable<any> {
    return this.http.get(this.baseURL, {headers: this.headers}).pipe(
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
    return this.http.put(this.baseURL + '/GetBooking2', body, {'headers': headers});
  }
  public addBooking(booking: Booking): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(booking);
    console.log(body);
    return this.http.post(this.baseURL , body, {'headers': headers});
  }
}

import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { RoomService } from '../Room.service';
import {Room} from '../Room'
import { UserService } from '../user.service';
import { User } from '../User';
import { StatusService } from '../status.service';
import {newbooking} from '../newbooking';
import {Booking} from '../Booking';
import { Status } from '../Status';
import { ActivatedRoute , Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {formatDate , DatePipe} from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {
  CookieService
} from 'ngx-cookie-service';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.css']
})
export class BookingRoomComponent implements OnInit {
  loading = false;
  curBooking = new Booking();
   Bookings: Array<newbooking> = new Array<newbooking>();
   p = 1;
  errorMessage;
  ismanager  = false;
  username = '';
  password = '';
  key = 'guestLastName';
  reverse = false;
  isuser = false;
  constructor(public statusservice: StatusService, public roomservice: RoomService, private route: ActivatedRoute,
              public userservice: UserService , private router: Router, public service: RoomService  ,
              public bookingservice: BookingService, private cookieService: CookieService)
  {
  }


 /* getBookings2()  {
    var bookingvar = [new Booking()];
    this.bookingservice.getBooking().subscribe(items => {
      items.map(item => {
        this.Bookings=item;
        console.log(this.Bookings);
      });
    }
  );
  return this.bookingservice.getBooking();

  }*/
// called to get bookings and to get details of room assigned and the boooking status
 getBookings() {

    let bookingvar = [new Booking()];
    this.loading = true;
    this.errorMessage = '';
    this.bookingservice.getBooking()
      .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          this.Bookings = response ;
          for (let i = 0; i < this.Bookings.length; i++) {
            this.roomservice.getRoombyId(this.Bookings[i]['roomId'])
            .subscribe(data => {
              console.log(data);
              this.Bookings[i].room = data;
              // this.router.navigateByUrl('/Room');
              this.statusservice.getStatusbyId(this.Bookings[i]['statusId'])
              .subscribe(data2 => {
                console.log(data2);
                this.Bookings[i].status = data2;
                // this.router.navigateByUrl('/Room');
              }) ;
            }) ;
          }
          bookingvar = response;
          this.display(bookingvar);

          // console.log(this.Bookings);
          return response;
        },
        (error) => {
          console.error('Request failed with error');
          this.errorMessage = error;
          this.loading = false;
        },
        () => {
          console.error('Request completed') ;
          this.loading = false;
        });
    return bookingvar ;

  }


  display(book: newbooking[]): void
  {
    this.Bookings = book;
    console.log('last names');
    for (let i = 0; i < this.Bookings.length; i++) {
      console.log( this.Bookings[i]['guestLastName']);
    }
  }

 /* display2()
  {
    var t = new Date();
    var t2;
    t2 = (formatDate(t, 'yyyy-MM-dd', 'en'));
    t= t2;

    console.log('last names');
    console.log(t);
    for (let i = 0; i < this.Bookings.length; i++) {
      console.log("hi " + this.Bookings[i]['checkInDate']);
      if(this.Bookings[i]['checkInDate']>t)
      {
        console.log('checkin expired');
      }
    }
  }*/

  EditBooking(id: number): void
  {
    this.router.navigateByUrl('/Booking/edit/' + id);
  }


   ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
    this.isuser = this.userservice.isUser(this.username, this.password);
    if (!this.isuser)
    {
      this.router.navigateByUrl('/');
    }
    this.getBookings();
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
    console.log(this.key);
  }

}

import { Component, OnInit } from '@angular/core';
import {formatDate , DatePipe} from '@angular/common';
import {RoomService} from 'c:/Users/EI11763/RoomBooking/src/app/Room.service';
import {Booking} from 'c:/Users/EI11763/RoomBooking/src/app/Booking';
import {AmenityService} from 'c:/Users/EI11763/RoomBooking/src/app/amenity.service';
import {RoomAminityService} from 'c:/Users/EI11763/RoomBooking/src/app/room-aminity.service';
import {Amenity} from 'c:/Users/EI11763/RoomBooking/src/app/Amenity';
import {RoomAminity} from 'c:/Users/EI11763/RoomBooking/src/app/RoomAminity';
import {newbooking} from 'c:/Users/EI11763/RoomBooking/src/app/newbooking';
import { ToastrService } from 'ngx-toastr';

import {Room} from 'c:/Users/EI11763/RoomBooking/src/app/Room';
import { ActivatedRoute , Router} from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from 'c:/Users/EI11763/RoomBooking/src/app/user.service';
import {
  CookieService
} from 'ngx-cookie-service';

import { BookingService } from '../booking.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  occupancyist: Array<number> = new Array<number>(8); // list to store occupancy rates for next 7 days
  occupanctdates: Array<string> = new Array<string>(8); // list to store dates for next 7 days

  lineChartData: ChartDataSets[] = [
    { data: this.occupancyist, label: 'Occupancy Rates' },
  ];

  lineChartLabels: Label[] ;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';



  Todaycheckins: Array<newbooking> = new Array<newbooking>();
  TodaycheckOuts: Array<newbooking> = new Array<newbooking>();
  updatebooking = new Booking();
  amenitybooking = new Booking();
  amenityroom = new Room();
  public rooms: Room[];

 // updateamenity = new Amenity();
  amenitylist: Array<Amenity> = new Array<Amenity>();
  emptycheckinlist = false;
  emptycheckoutlist = false;
  username = '';
  password = '';
  errorMessage;
  dropdownval;
  isuser = false;

  showaddamenity = false;
  showbutton  = false;
  showname = false;
  room = new Room();
  roomamenity = new RoomAminity();
  constructor(private datePipe: DatePipe, private router: Router, private route: ActivatedRoute,
              public service: BookingService , public roomservice: RoomService, private cookieService: CookieService ,
              public userservice: UserService, public amenityservice: AmenityService, public roomAminityService: RoomAminityService
            , private toastr: ToastrService )
  { }

  showSuccess(): void {
    this.toastr.success('Hello world!', 'Toastr fun!',
    {
      enableHtml :  true
    }
  );
  }
  showError(): void {
  this.toastr.error('everything is broken', 'Major Error', {
  timeOut: 3000
  });
  }
  ngOnInit(): void {
    this.getoccupancyrate();
   // getting username and password stored in cookies and checking of the user is a valid user or not
    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
    this.isuser = this.userservice.isUser(this.username, this.password);
    if (!this.isuser)
    {
      this.router.navigateByUrl('/');
    }
    const t = formatDate(new Date(), 'yyyy-MM-ddT00:00:00', 'en');
    // subscribing to get observable data
    // subscribed to get the amenities available
    this.amenityservice.getAmenity()
    .subscribe(
      (response) => {
        console.log('amenity list  received');
        this.amenitylist = response;
       // this.updateamenity.label
        console.log(response);
      },
      (error) => {
        console.log('amenity error :');
        console.error(error);
      },
      () => {
        console.error('amenity Request completed');
      });

    // subscribed to get the bookings whose checkin date is current date
    this.service.getBookingbycheckindate(t)
    .subscribe(
      (response) => {                           // next() callback
        console.log('response received');
        console.log(response);
        this.Todaycheckins = response;
        if (this.Todaycheckins.length == 0)
       {
         this.emptycheckinlist = true;
         console.log('empty checkin list');
       }
        for (let checkintoday of  this.Todaycheckins) {
        this.roomservice.getRoombyId(checkintoday.roomId)
        .subscribe(data => {
          console.log(data);
          checkintoday.room = data;
          // this.router.navigateByUrl('/Room');
        }) ;
      }
      },
      (error) => {                              // error() callback
        console.error('Request failed with error');
        console.log(error);
      },
      () => {                                   // complete() callback
        console.error('Request completed');      // This is actually not needed
      });

    // subscribed to get the bookings whose chekout date is current date
    this.service.getBookingbycheckoutdate(t)
    .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          console.log(response);
          this.TodaycheckOuts = response;
          if (this.TodaycheckOuts.length == 0)
          {
            this.emptycheckoutlist = true;
            console.log('ebmpty checkin list');
          }
          for (let checkoutToday of  this.TodaycheckOuts) {
          this.roomservice.getRoombyId(checkoutToday.roomId)
          .subscribe(data => {
            console.log(data);
            checkoutToday.room = data;
            // this.router.navigateByUrl('/Room');
          }) ;
        }
        },
        (error) => {                              // error() callback
          console.error('Request failed with error');
          console.log(error);
        },
        () => {                                   // complete() callback
          console.error('Request completed');      // This is actually not needed
        });

    }


    // called when manager / clerk clicks on checkin button and id of current booking is passed and status is changed to checkin

    Checkin(id: number): void
    {
      this.service.getBookingbyId(id)
      .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          this.updatebooking = response;
          this.updatebooking.statusId =  2;
          this.service.UpdateBooking(this.updatebooking)
          .subscribe(data => {
            console.log(data);
            console.log('checked in ');
            window.location.reload();
                }) ;
        },
        (error) => {                              // error() callback
          console.error('Request failed with error');
        },
        () => {                                   // complete() callback
          console.error('Request completed');      // This is actually not needed
        });
    }

// called when amenity is changed from the dropdown
    amenityChange(): void{
      this.showaddamenity = false;
      this.showname = false;
      console.log('dropdown value ::' + this.dropdownval);
      // used to get boooking based on roomnumber inorder to display name of the checked in guest
      this.roomservice.GetRoombyroomnumber(this.amenityroom.roomNumber)
      .subscribe(
        (response) => {                           // next() callback
         this.room = response;
         this.roomamenity.roomId = this.room.id;
         console.log(this.room);
         this.service.GetBookingbyRoomnumber(this.room.id)
          .subscribe(data => {
            this.showaddamenity = true;
            this.showbutton = true;
            this.showname = true;
            this.amenitybooking = data;
                }) ;
        },
        (error) => {
          this.showaddamenity = true;
          this.showbutton = false;
          this.showname = false;
          // error() callback
          console.error('Request failed with error');
        },
        () => {
          this.showaddamenity = true;
          // complete() callback
          console.error('Request completed');
        });

    }


   // called to assign amenities to the room
    AssignAmenity(): void
    {
      // used to get the seected amenity
      this.roomamenity.amenityId = this.dropdownval;
      this.roomAminityService.addRoomAmenities(this.roomamenity)
      .subscribe(data => {
        console.log(data);
        if (data.id <= 1)
        {
          console.log('not added');
        }
        else
        {
          console.log('added');
        }
       // this.router.navigateByUrl('/Room');
      })  ;
    }

 // used to get occupancy rate of nect 7 days
    getoccupancyrate(): void
    {

      const t = new Date() ;
      const t1 = formatDate(t, 'yyyy-MM-ddT00:00:00', 'en');
      this.service.Occupancy(t1)
      .subscribe(
        (response) => {
        console.log('Occupancy list received :::  ');
        for ( let i = 0 ; i < 8 ; i ++)
        {
          const nextDay = new Date();
          nextDay.setDate(nextDay.getDate() + i);
          console.log('next date');
          console.log(nextDay);
          this.occupanctdates[i] = formatDate(nextDay, 'yyyy-MM-dd', 'en');
        }
        this.lineChartLabels = this.occupanctdates;
        this.occupancyist = response;
        this.lineChartData = [
          { data: this.occupancyist, label: 'Occupancy Rates' },
        ];
        console.log(this.occupancyist);
        },
        (error) => {
          console.error('Request failed with error');
          console.log(error);
        },
        () => {
          console.error('Request completed');
        });
    }
    // called when manager / clerk clicks on checkout button and id of current booking is passed and status is changed to checkout
    Checkout(id: number): void
    {
      this.service.getBookingbyId(id)
      .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          this.updatebooking = response;
          this.updatebooking.statusId =  3;
          this.service.UpdateBooking(this.updatebooking)
          .subscribe(data => {
            console.log(data);
            console.log('checked out ');
            window.location.reload();
            }) ;
        },
        (error) => {                              // error() callback
          console.error('Request failed with error');
        },
        () => {                                   // complete() callback
          console.error('Request completed');   // This is actually not needed
        });

    }

}

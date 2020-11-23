import { Component, OnInit } from '@angular/core';
import {formatDate ,DatePipe} from '@angular/common';
import {RoomService} from 'c:/Users/EI11763/RoomBooking/src/app/Room.service';
import {Booking} from 'c:/Users/EI11763/RoomBooking/src/app/Booking';
import {AmenityService} from 'c:/Users/EI11763/RoomBooking/src/app/amenity.service';
import {RoomAminityService} from 'c:/Users/EI11763/RoomBooking/src/app/room-aminity.service';
import {Amenity} from 'c:/Users/EI11763/RoomBooking/src/app/Amenity';
import {RoomAminity} from 'c:/Users/EI11763/RoomBooking/src/app/RoomAminity';
import {newbooking} from 'c:/Users/EI11763/RoomBooking/src/app/newbooking';
import {Room} from 'c:/Users/EI11763/RoomBooking/src/app/Room';
import { ActivatedRoute ,Router} from '@angular/router';
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
  occupancyist: Array<number> = new Array<number>(8);
  occupanctdates: Array<string> = new Array<string>(8);

  lineChartData: ChartDataSets[] = [
    { data:this.occupancyist, label: 'Occupancy Rates' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June' ,'July','August'];

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
  Occupancycheckinlist: Array<newbooking> = new Array<newbooking>();
  TodaycheckOuts: Array<newbooking> = new Array<newbooking>();
  updatebooking = new Booking();
  amenitybooking = new Booking();
  amenityroom = new Room();
  public rooms :Room[];

 // updateamenity = new Amenity();
  amenitylist : Array<Amenity> = new Array<Amenity>();
  emptycheckinlist: boolean=false;
  emptycheckoutlist: boolean=false;
  username = '';
  password='';
  errorMessage;
  dropdownval;
  isuser:boolean=false;

  show:boolean = false;
  showbutton:boolean = false;
  showname=false;
  room = new Room();
  roomamenity = new RoomAminity();
  constructor(private datePipe: DatePipe,private router: Router, private route: ActivatedRoute, public service:BookingService , public roomservice:RoomService,private cookieService: CookieService ,public userservice: UserService,public amenityservice: AmenityService,public roomAminityService:RoomAminityService) 
  { }

  ngOnInit(): void {
    this.getoccupancyfromapi()
    this.amenityroom.roomNumber
    this.username = this.cookieService.get('username');
    this.password =this.cookieService.get('password'); 
    this.isuser = this.userservice.isUser(this.username,this.password);
    if(!this.isuser)
    {
      this.router.navigateByUrl('/');
    }
    let t = formatDate(new Date(), 'yyyy-MM-ddT00:00:00', 'en');
    
    this.service.GetBookingbyRoomnumber(340)
    .subscribe(
      (response) => {                           //next() callback
        console.log('amenity  received');
        console.log(response)
      // this.amenitybooking = response;
        console.log(  this.amenitybooking)
      },
      (error) => {                              //error() callback
        console.error('Request failed with amenity error')
        console.log(error)
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })

    console.log(t)
    this.amenityservice.getAmenities()
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received');
       this.amenitylist = response;
       //this.updateamenity.label
        console.log(response);
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })  

    this.service.getBookingbycheckindate(t)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received');
        console.log(response)
       this.Todaycheckins = response;
       if(this.Todaycheckins.length == 0)
       {
         this.emptycheckinlist = true
         console.log('empty checkin list')
       }
       for (let i = 0; i < this.Todaycheckins.length; i++) {
        this.roomservice.getRoombyId(this.Todaycheckins[i]['roomId'])
        .subscribe(data => {
          console.log(data)
         this.Todaycheckins[i].room = data;
          // this.router.navigateByUrl('/Room');
         
        }) ;
        
      }
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      console.log(error)
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })

    this.service.getBookingbycheckoutdate(t)
    .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
          console.log(response)
         this.TodaycheckOuts = response;
         if(this.TodaycheckOuts.length == 0)
          {
            this.emptycheckoutlist = true
            console.log('ebmpty checkin list')
          }
         for (let i = 0; i < this.TodaycheckOuts.length; i++) {
          this.roomservice.getRoombyId(this.TodaycheckOuts[i]['roomId'])
          .subscribe(data => {
            console.log(data)
           this.TodaycheckOuts[i].room = data;
            // this.router.navigateByUrl('/Room');
          }) ;
          
        }
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          console.log(error)
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })

    }



    Checkin(id:number)
    {
      this.service.getBookingbyId(id)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
          this.updatebooking = response;
          this.updatebooking.statusId =  2;
          this.service.UpdateBooking(this.updatebooking)
          .subscribe(data => {
            console.log(data)
            console.log('checked in ')
            window.location.reload()
                }) ;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })
    }


    changeValue() {
      this.show=false;
      this.showname= false;
      console.log('dropdown value ::' + this.dropdownval)
      this.roomservice.GetRoombyroomnumber(this.amenityroom.roomNumber)
      .subscribe(
        (response) => {                           //next() callback
         this.room = response;
         this.roomamenity.roomId = this.room.id
         console.log(this.room)
          this.service.GetBookingbyRoomnumber(this.room.id)
          .subscribe(data => {
            this.show=true;
            this.showbutton=true;
            this.showname= true;
            this.amenitybooking = data;
                }) ;
        },
        (error) => { 
          this.show=true;    
          this.showbutton=false;
          this.showname= false;
          //error() callback
          console.error('Request failed with error')
        
        },
        () => { 
          this.show=true;    
          //complete() callback
          console.error('Request completed')      //This is actually not needed 
     
        })

    }



    AssignAmenity()
    {
      this.roomamenity.amenityId = this.dropdownval;
      this.roomAminityService.addRoomAmenities(this.roomamenity)
      .subscribe(data => {
        console.log(data);
        if(data.id<=1)
        {
          console.log("not added");
        }
        else
        {
          console.log("added");
        }
       // this.router.navigateByUrl('/Room'); 
      })  ;
      
    }


    getoccupancyfromapi()
    {

      let t = new Date() ;
      let t1 = formatDate(t, 'yyyy-MM-ddT00:00:00', 'en');
      this.service.Occupancy(t1)
      .subscribe(
        (response) => {   
      
        console.log('Occupancy list received :::  ');
        for(let i =0;i<8;i++)
        {
          var nextDay = new Date();
          nextDay.setDate(nextDay.getDate()+i);//next() callback
          console.log('next date')
          console.log(nextDay)
         this.occupanctdates[i] = formatDate(nextDay, 'yyyy-MM-dd', 'en'); 
        }
        this.lineChartLabels= this.occupanctdates
        this.occupancyist = response
        this.lineChartData= [
          { data:this.occupancyist, label: 'Occupancy Rates' },
        ];
      
        console.log(this.occupancyist)
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          console.log(error)
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        }) 
    }
    

    Checkout(id:number)
    {
      this.service.getBookingbyId(id)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
          this.updatebooking = response;
          this.updatebooking.statusId =  3;
          this.service.UpdateBooking(this.updatebooking)
          .subscribe(data => {
            console.log(data)
            console.log('checked out ')
            window.location.reload()
            }) ;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })

    }



}

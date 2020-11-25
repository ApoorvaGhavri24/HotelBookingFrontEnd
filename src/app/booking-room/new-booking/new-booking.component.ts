import {Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Room} from 'c:/Users/EI11763/RoomBooking/src/app/Room';
import {RoomService} from 'c:/Users/EI11763/RoomBooking/src/app/Room.service';
import {Booking} from 'c:/Users/EI11763/RoomBooking/src/app/Booking';
import {newbooking} from 'c:/Users/EI11763/RoomBooking/src/app/newbooking';
import {BookingService} from 'c:/Users/EI11763/RoomBooking/src/app/booking.service';
import {StatusService} from 'c:/Users/EI11763/RoomBooking/src/app/status.service';
import { ActivatedRoute ,Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/Status';
import {formatDate ,DatePipe} from '@angular/common';
import { UserService } from 'c:/Users/EI11763/RoomBooking/src/app/user.service';

import { ThrowStmt } from '@angular/compiler';
import {  
  CookieService  
} from 'ngx-cookie-service'; 

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})

export class NewBookingComponent implements OnInit {
  @ViewChild('contactForm', {static: false}) contactForm: NgForm;
  model;
  checkInmonth;
  checkInDay;
  checkInyear;

  todayMonth;
  todayDate;
  todayYear;

  checkoutMonth;
  checkoutDay;
  checkoutYear;
minDate = { year: 2020, month: 11, day: 6 };
checkindate ={ year: 2020, month: 11, day: 6 };
chckoutdate  ={ year: 2020, month: 11, day: 6 };
showCancel:boolean = false;
showCheckin:boolean = false;
showBookroom:boolean = false;
showCheckOut:boolean = false;
room = new Room();
availrooms :Room[];
closeResult: string;
updatedsucc:boolean =false;
Bookings :Booking[];
curBooking =new Booking();
curBookingcomp =new Booking();
//status = new Status();
invalidadultcount:boolean = false;
bookingdone:boolean=false;
roomfound:boolean = false;
invalidcheckout:boolean = false;
message;
editBooking;
public idnew;
bookroom= new Room();
ismanager : boolean = false;
username = '';
password='';
errorMessage;
isuser:boolean=false;

  constructor( public service: BookingService,public userservice: UserService  ,private route: ActivatedRoute,private router: Router,public statusservice: StatusService, public roomservice: RoomService,private datePipe: DatePipe,private modalService: NgbModal,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.password =this.cookieService.get('password'); 
  
    this.isuser = this.userservice.isUser(this.username,this.password);
    if(!this.isuser)
    {
      this.router.navigateByUrl('/');
    }
//setting mindate as current date for checkin and ckeckout in calendar
    var currentdate = (formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.todayYear =(currentdate).toString().substring(4, 0) ;
    this.todayMonth =(currentdate).toString().substring(7, 5) ;
    this.todayDate =(currentdate).toString().substring(10, 8) ;
    this.minDate.year = Number(this.todayYear);
    console.log('year::'+this.todayYear);
    this.minDate.month = Number(this.todayMonth);
    console.log('year::'+this.todayMonth);
    this.minDate.day = Number(this.todayDate);
    console.log('year::'+this.todayDate);
    console.log('today date after change: '+currentdate);

    console.log('min date after change: '+this.minDate);
  
    let id = this.route.snapshot.params.id;
    this.idnew = id;
    if(id==0)
    {
      this.editBooking = false;
      console.log('hello id=0');
      this.curBooking= new Booking();
    }
    else
    {
      //get booking based on id to be editted
      this.editBooking = true;
      this.service.getBookingbyId(this.idnew)
      .subscribe(
      (response) => {                           //next() callback
       console.log('response received');
       this.curBookingcomp = response; 

       let  curdate = (formatDate(new Date(), 'yyyy-MM-dd', 'en'));
       let editcheckindate = formatDate(this.curBookingcomp.checkInDate, 'yyyy-MM-dd', 'en');
       let editcheckoutdate = formatDate(this.curBookingcomp.checkOutDate, 'yyyy-MM-dd', 'en');

       console.log('current date :'+curdate);
       console.log('checkin date date :'+editcheckindate);
      if((curdate>=editcheckindate)&&(curdate<=editcheckoutdate)&&(this.curBookingcomp.statusId == 2))
      {
          this.showCheckOut= true;
      }
       if((editcheckindate == curdate)&&(this.curBookingcomp.statusId == 1) )
       {
         this.showCheckin = true;
         this.showCancel = true;
         console.log("today checkin date");
       }
      
        if((this.curBookingcomp.statusId == 1))
        {
          this.showCancel = true;
        }
        this.curBooking = Object.assign<{},Booking>({}, this.curBookingcomp)
        //setting datepicker value to the  checkin date
        let t1 = (formatDate(this.curBooking.checkInDate, 'yyyy-MM-dd', 'en'));
        this.contactForm.controls["dp"].setValue(t1)  
           //setting datepicker value to the  checkout date
        let t2 = (formatDate(this.curBooking.checkOutDate, 'yyyy-MM-dd', 'en'));
        this.contactForm.controls["dp2"].setValue(t2)  
      
        this.checkindate.year = this.checkInyear;
        this.checkindate.month = this.checkInmonth;
        this.checkindate.day = this.checkInDay;
        console.log('oroginal checkin');
        console.log(this.curBooking.checkInDate)
        console.log('checkin date ::::');
        //this.curBooking.checkInDate.setDate = this.checkindate
        console.log(this.checkindate)
    
         },
      (error) => {                              //error() callback
        console.error('Request failed with error')
    
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })

    }
    
  }


  Checkin(content)
  {
    this.curBookingcomp.statusId = 2;
    this.service.UpdateBooking(this.curBookingcomp)
    .subscribe(data => {
      console.log(data)
      this.message = "Checked In successfully  !!";
      this.updatedsucc = true;
    console.log(this.message);
      // this.router.navigateByUrl('/Room');
    }) ;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  Checkout(content)
  {
    this.curBookingcomp.statusId = 3;
    this.service.UpdateBooking(this.curBookingcomp)
    .subscribe(data => {
      console.log(data)
      this.message ="Checked Out successfully  !!";
      this.updatedsucc = true;
    console.log(this.message);
      // this.router.navigateByUrl('/Room');
    }) ;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  
  CancelBooking(content)
  {
    this.curBookingcomp.statusId = 4;
    this.service.UpdateBooking(this.curBookingcomp)
    .subscribe(data => {
      console.log(data)
      this.message = "Booking cancelled  !!";
      this.updatedsucc = true;
    console.log(this.message);
      // this.router.navigateByUrl('/Room');
    }) ;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  validateadultcount(event: number) {
    this.invalidadultcount = false;
        if (event <1 &&  event!=null) {
        this.invalidadultcount = true;
        } else {
          this.invalidadultcount = false;
    
        }
  }


  assignbooking(booking:Booking[])
  {
    this.Bookings = booking;
 
    console.log('inside assignbooking');
    console.log(this.Bookings);
    this.getcheapestroom(this.availrooms, this.Bookings);

  }


  assignrooms(rooms:Room[])
  {
    this.availrooms = rooms;
    console.log('inside assignrooms');
    console.log(this.availrooms);
    var bookingvar = [new Booking()];
  
    this.service.getBooking()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
     this.Bookings = response;
        bookingvar = response;
        this.assignbooking(bookingvar);
          //console.log(this.Bookings);  
        });
  }

/*called to get the cheapest available room based on checkin and checkout date
 and display appropriate message if room not avaiable*/
  getcheapestroom(availrooms: Room[], bookings: Booking[] )
  {
    this.roomfound = false;
    var roomnotavail=false;
    
    console.log('inside bookings');
    console.log(availrooms);
    console.log(bookings);
    for (let i = 0; i < this.availrooms.length; i++) {
      roomnotavail=false;
      for (let j = 0; j < this.Bookings.length; j++)
      {
      console.log('inside loop')
        //if(this.availrooms[i]['id'] == this.Bookings[j]['roomId'])
        {
          var t = new Date();
          var t1;
          var t2;
            console.log('true' +this.Bookings[j]['guestFirstName']);
           // console.log('checkout date'+(formatDate(this.Bookings[j]['checkInDate'], 'yyyy-MM-dd', 'en')));
              t1 = (formatDate(this.Bookings[j]['checkInDate'], 'yyyy-MM-dd', 'en'));
              
           t2 = (formatDate(this.Bookings[j]['checkOutDate'], 'yyyy-MM-dd', 'en'));
          
            if((this.availrooms[i].id == this.Bookings[j].roomId))
            {
              console.log('inside room id')
              if(((this.curBookingcomp.checkInDate>=t1)&&(this.curBookingcomp.checkInDate<=t2))||((this.curBookingcomp.checkOutDate>=t1) &&this.curBookingcomp.checkOutDate<=t2))
              {
             
                console.log('inside date')
                if((this.curBookingcomp.statusId!=4))
                {
                  console.log('checkin date'+t1);
                  console.log('checkout date'+t2);
                 console.log('bw dates');
                 console.log('d1'+this.Bookings[j]['checkInDate']);
                 console.log('d2'+this.Bookings[j]['checkOutDate']);
                 roomnotavail=true;
                }
              }
       
            }
            else{
             // this.bookroom = this.availrooms[i];
             // this.roomfound = true;
              //break;
            }

        }
  
      }

   if(!roomnotavail)
   {
    this.bookroom = this.availrooms[i];
    this.roomfound = true;
    break;
   }
    } 
    if(!roomnotavail)
    {
      console.log('available room is this:');
      console.log(this.bookroom);
      this.showBookroom = true;
    }
   
  }


  getallBookings() {
     
    var bookingvar = [new Booking()];
  
    this.service.getBooking()
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
     this.Bookings = response;
        bookingvar = response;
        this.assignbooking(bookingvar);
          //console.log(this.Bookings);
         
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })

  }
 //method to get available rooms from api based on adult and child capacity
  getavailableRooms ()
  {
    var roomtemp =[new Room()];
    this.service.getAvailableRooms(this.curBookingcomp)
    .subscribe(data => {
      roomtemp = data;
      this.availrooms = data;
      this.assignrooms(roomtemp);
      return roomtemp;
      // this.router.navigateByUrl('/Room');
    }) ;
     
  }
//
  BookNewRoom(content)
  {
    
    this.curBookingcomp.roomId = this.bookroom.id
    this.curBookingcomp.statusId = 1
    this.service.addBooking(this.curBookingcomp)
    .subscribe(data => {
    
      console.log(data);
      if(data.id<=1)
      {
        this.bookingdone= false;
        this.message  ="Room not Booked!!";
        console.log("not added");
      }
      else
      {
        this.bookingdone= true;
        this.message  =" Room Booked successfully!!";
        console.log("added");     

      }
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
     // this.router.navigateByUrl('/Room'); 

    })  ;
  
  }


 //called when  getavailablerooms button is clicked
 /*checkout  date is compared with checkin date and if checkout date is less
 than checkin date mesaage is displayed otherwise method to get available rooms is called
 */
 
  onclickgetrooms()
  {
    var cbci =this.curBooking.checkInDate
    var cbco =this.curBooking.checkOutDate
    this.curBookingcomp = Object.assign<{},Booking>({}, this.curBooking)
   //this.curBookingcomp = this.curBooking
    //this.curBookingcomp = <newbooking> JSON.parse(JSON.stringify(this.curBooking));
    //this.curBookingcomp.checkInDate = this.contactForm.controls["dp"].value;
    //this.curBookingcomp.checkOutDate = this.contactForm.controls["dp2"].value;
   // console.log(this.contactForm.controls["dp"].value['year'])
   
    console.log('curbooking component :')
    console.log(this.curBookingcomp)
    this.checkInyear =(this.curBookingcomp.checkInDate['year']);
    this.checkInmonth =(this.curBookingcomp.checkInDate['month']) -1;
    console.log(this.checkInmonth);
    this.checkInDay =(this.curBookingcomp.checkInDate['day']);
    var t ;
     var t2; 
  
    this.curBookingcomp.checkInDate =new Date(this.checkInyear, this.checkInmonth,this.checkInDay);
    console.log(this.curBookingcomp.checkInDate);
    t = (formatDate(this.curBookingcomp.checkInDate, 'yyyy-MM-dd', 'en'));
    this.curBookingcomp.checkInDate = t;
   //this.contactForm.controls["dp"].setValue(cbci);
   //this.contactForm.controls["dp2"].setValue(cbco);
    //console.log(this.datePipe.transform(this.curBooking.checkInDate,"yyyy-MM-dd"));
    this.checkoutYear =(this.curBookingcomp.checkOutDate['year']);
    this.checkoutMonth =(this.curBookingcomp.checkOutDate['month']) -1;
    console.log(this.checkInmonth);
    this.checkoutDay =(this.curBookingcomp.checkOutDate['day']);
    this.curBookingcomp.checkOutDate =new Date(this.checkoutYear, this.checkoutMonth,this.checkoutDay);
    console.log(this.curBookingcomp.checkOutDate);
    t2 = (formatDate(this.curBookingcomp.checkOutDate, 'yyyy-MM-dd', 'en'));
    this.curBookingcomp.checkOutDate = t2;

    console.log(this.curBookingcomp);
    if(this.curBookingcomp.checkInDate>this.curBookingcomp.checkOutDate)
   {
     this.invalidcheckout = true;
     this.message = 'checkout date cannot be greater than checkin date';
   }
   else
   {
    this.invalidcheckout = false;
    this.getavailableRooms(); 
   }


  }
 




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  onSubmit(contactForm) {
    console.log(contactForm.value);
  }
 


}

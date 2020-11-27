import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Room.service';
import {Room} from '../Room';
import { UserService } from '../user.service';
import { User } from '../User';
import { StatusService } from '../status.service';
import { Status } from '../Status';
import { ActivatedRoute , Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {
  CookieService
} from 'ngx-cookie-service';

@Component({
  selector: 'app-hotel-room',
  templateUrl: './hotel-room.component.html',
  styleUrls: ['./hotel-room.component.css']
})
export class HotelRoomComponent implements OnInit {
  key = 'roomNumber'; // set default
  reverse = false;
  message = '';
  closeResult: string;
  loading = false;
  editField: string;
  ismanager  = false;
  username = '';
  password = '';
  errorMessage;
  isuser = false;
  title = 'appSimpleRoute';
  p = 1;
  value = '';
  public rooms: Room[];
  public statuses: Status[];
  room = new Room();


  constructor( public statusservice: StatusService, public service: RoomService , private route: ActivatedRoute,
               public userservice: UserService , private router: Router, private cookieService: CookieService ,
               private modalService: NgbModal)
   {

   }

 // called at  time of inline editting along with the id event and property name
   changeValue(id: number,  property: string , event: any): void {
     // this.room.adultsCapacity = event.target.textContent;
    this.editField = event.target.textContent;
    console.log(event.target.textContent);
    console.log('id' + id);
    console.log('room details');

    this.service.getRoombyId(id)
       .subscribe(
         (response) => {                           // next() callback
           console.log('response received');
           this.room = response;
           console.log('value received');
           console.log(this.room);
           // if property in adultcapacity then  update the adultcapacity value
           if (property == 'adultsCapacity')
           {
             console.log('hello adult');
             this.room.adultsCapacity =   +event.target.textContent;
             console.log(this.room);
           }
           if (property == 'childrenCapacity')
           {
            console.log('hello child');
            this.room.childrenCapacity =  + event.target.textContent;
            console.log(this.room);
           }
           if ( property == 'price')
           {
            console.log('hello price');
            this.room.price =  + event.target.textContent;
            console.log(this.room);
           }
           if (this.room.childrenCapacity == null){
            this.room.childrenCapacity = 0;
          }
           this.service.updateRoom(this.room)
        .subscribe(data => {
          console.log('updated data');
          console.log(this.room);
          // this.router.navigateByUrl('/Room');
        }) ;
         });
  }
  getstatus(): void
  {
    this.loading = true;
    this.errorMessage = '';
    this.statusservice.getStatus()
      .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          this.statuses = response;
          console.log('status');
          console.log(this.statuses);
        },
        (error) => {                              // error() callback
          console.error('Request failed with error');
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   // complete() callback
          console.error('Request completed');  // This is actually not needed
          this.loading = false;
        });

  }

 // called to get the available rooms
   getRooms(): void {
    this.loading = true;
    this.errorMessage = '';
    this.service.getRooms()
      .subscribe(
        (response) => {                           // next() callback
          console.log('response received');
          this.rooms = response;
          console.log(this.rooms);
        },
        (error) => {                              // error() callback
          console.error('Request failed with error');
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   // complete() callback
          console.error('Request completed');    // This is actually not needed
          this.loading = false;
        });

  }
 // called when roomnumberlink is clicked inorder to  redirect to
 // editscreen if manager is loggedin otherwise display  message because clerk cabbit edit
  Editroom(content , id: number): void
  {
    this.ismanager = this.userservice.isManager(this.username, this.password);
    if (this.ismanager)
    {
      this.router.navigateByUrl('/Room/edit/' + id);
    }
    else
    {
      this.message = 'Sorry!! you cannot edit';
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }
 // called when clicked on Addroom button
  AddRoom(content): void
  {
    this.ismanager = this.userservice.isManager(this.username, this.password);
    if (this.ismanager)
    {
      // if manager then redirected to add screen
      this.router.navigateByUrl('/Room/edit/0');
    }
    else
    {
      // clerk cannot add room so message displayed
      this.message = 'Sorry!! you cant Add Room';
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }

  open(content , id: number): void {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason == ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.getstatus();
    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
    this.getRooms();
    this.isuser = this.userservice.isUser(this.username, this.password);
    if (!this.isuser)
    {
      this.router.navigateByUrl('/');
    }
  }


  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }
}

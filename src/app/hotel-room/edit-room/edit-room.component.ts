import {Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {Room} from 'c:/Users/EI11763/RoomBooking/src/app/Room';
import {RoomService} from 'c:/Users/EI11763/RoomBooking/src/app/Room.service';
import { ActivatedRoute ,Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import {  
  CookieService  
} from 'ngx-cookie-service'; 


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})

export class EditRoomComponent implements OnInit {
 

  loading: boolean = false;
  roomadded:boolean= false;
  updatedsucc:boolean = false;
  errorMessage;
  editroom;
  message;
  title = 'appSimpleRoute';
  p: number = 1;
  value: string = ""; 
  closeResult: string;
  wrong:boolean =false;
  //@ViewChild('contactForm',null) contactForm: NgForm;
  room= new Room();
  public idnew;
  constructor( private cookieService: CookieService,public service: RoomService,private route: ActivatedRoute,private router: Router,private modalService: NgbModal) {

  }
  validateWhite(event: number) {
    this.wrong = false;
    if (event <1 &&  event!=null) {
    this.wrong = true;
    } else {
      this.wrong = false;

    }
  }

  open(content) {
    if(this.editroom)
    {
      this.UpdateRoom();
    }
    else
    {
      this.addRoom();
    }
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
 
  addRoom() {
    
      if(this.room.childrenCapacity==null){
        this.room.childrenCapacity=0;
      }
      console.log(this.room);
      this.service.addRoom(this.room)
      .subscribe(data => {
        console.log(data);
        if(data.id<=1)
        {
          this.message  ="Room not added!!";
          console.log("not added");
        }
        else
        {
          this.message  =" Room added!!";
          console.log("added");
          this.roomadded = true;
        }
        
       // this.router.navigateByUrl('/Room'); 
  
      })  ;
      
  }

  UpdateRoom()
  {
 
    if(this.room.childrenCapacity==null){
      this.room.childrenCapacity=0;
    }
    this.service.updateRoom(this.room)
    .subscribe(data => {
      console.log(data)
      this.message = "Room Updated !!";
      this.updatedsucc = true;
      // this.router.navigateByUrl('/Room');
    }) ;
  
   // this.router.navigateByUrl('/Room');
  }
 
  getRooms() {

  }

  ngOnInit(): void {
    console.log('input value');
    console.log(this.cookieService.get('username'));
    if(this.cookieService.get('username') !='apoorva')
    {
      console.log('insise cookieservice');
      this.router.navigateByUrl('/');
    }
    this.loading = true;
    this.errorMessage = "";
    let id = this.route.snapshot.params.id;
    this.idnew = id;
    if(id==0)
    {
      this.editroom = false;
    }
    else
    {
      this.editroom = true;
    }
   console.log(id);
   this.service.getRoombyId(this.idnew)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received');
         
          this.room = response; 
          console.log(this.room);
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
          this.loading = false; 
        })
  }

}

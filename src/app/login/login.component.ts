import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { ActivatedRoute ,Router} from '@angular/router';

import {  
  CookieService  
} from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:User[];
  usnameinput:'';
  passwordinput:'';
  notvalid:boolean=false;
  istrue:boolean;
  userService;
  constructor(public service: UserService , private cookieService: CookieService ,private route: ActivatedRoute,private router: Router) {
    this.userService=new UserService();
   }

   //check if user is valid user and if  true then store username and passwod in cookies
  public checkuser()
  {
    this.notvalid = false;
    this.istrue = this.service.isUser(this.usnameinput,this.passwordinput);
    console.log(this.usnameinput);
    console.log(this.passwordinput);
    console.log(this.istrue);
    if(this.istrue)
    {
        this.router.navigateByUrl('/Room');
        this.cookieService.set('username', this.usnameinput); 
        this.cookieService.set('password', this.passwordinput); 


    }
    else{
       this.notvalid = true;
       this.cookieService.set('username', ''); 
       this.cookieService.set('password', ''); 


    }
  }
  ngOnInit(): void {
    this.notvalid = false;
    this.cookieService.set('username',''); 
    this.cookieService.set('password', ''); 
    console.log(this.cookieService.get('username'));
 
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import {newbooking} from './newbooking';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HotelRoomComponent } from './hotel-room/hotel-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomService } from './Room.service';
import { StatusService } from './status.service';
import { AmenityService } from 'C:/Users/EI11763/ProjectGit/HotelBookingFrontEnd/src/app/Amenity.service';
import { RoomAminityService } from './room-aminity.service';
import { ToastrModule } from 'ngx-toastr';
import { BookingService } from './booking.service';
import { UserService } from './user.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { EditRoomComponent } from './hotel-room/edit-room/edit-room.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {
  CookieService
} from 'ngx-cookie-service';
import { BookingRoomComponent } from './booking-room/booking-room.component';
import { NewBookingComponent } from './booking-room/new-booking/new-booking.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HotelRoomComponent,
    DashboardComponent,
    EditRoomComponent,
    LoginComponent,
    BookingRoomComponent,
    NewBookingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        positionClass:  'toast-top-center',
        closeButton: true,
        preventDuplicates: true,
      }
    ), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule ,
    NgbModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule
  
  ],

  providers: [AmenityService, RoomService , UserService , CookieService, StatusService, BookingService, DatePipe, RoomAminityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

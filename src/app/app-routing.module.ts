import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelRoomComponent } from './hotel-room/hotel-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditRoomComponent } from './hotel-room/edit-room/edit-room.component';
import { BookingRoomComponent } from './booking-room/booking-room.component'; 
import { NewBookingComponent } from './booking-room/new-booking/new-booking.component'; 
import{LoginComponent} from './login/login.component'
const routes: Routes = [
  {
  path: 'Booking',
  children: [
    {
      path: '',
      component: BookingRoomComponent
    },
    {
        path: 'edit/:id',
        component: NewBookingComponent
    }
  
  ]
},
  {
    
    path: 'Room',
    children: [
      {
        path: '',
        component: HotelRoomComponent
      },
      {
          path: 'edit/:id',
          component: EditRoomComponent
      }
    
    ]
},
{path: '', component: LoginComponent},
{
  path: 'Dashboard',
  component: DashboardComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

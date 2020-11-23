import {Room} from './Room'
import {Status} from './Status'
export  class  newbooking  { 
    id: number;
    guestLastName: string;
    guestFirstName: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfAdults: number;
    numberOfChildren: number;
    roomId:number;
    statusId :number;
    room:Room;
    status:Status;

}
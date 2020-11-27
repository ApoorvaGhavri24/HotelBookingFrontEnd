import { Injectable } from '@angular/core';
import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 users: User[];
  constructor() {
    this.users = [
      new User(1, 'apoorva', '1234@evry' , 'manager'),
      new User(2, 'kavya', '1234@evry' , 'clerk'),
      new User(3, 'rahul', '1234@evry' , 'clerk'),
   ];

  }


  public isUser(username: string , password: string): boolean
  {

        for (let curuser of this.users)
      {
        if (curuser.username === username && curuser.password === password)
        {
            return true;
        }
      }
        return false;
  }
  public isManager(username: string , password: string): boolean
  {

        for (let curuser of this.users)
      {
        if (curuser.username === username && curuser.password === password && curuser.role === 'manager')
        {
            return true;
        }
      }
        return false;
  }
  public getUsers(): User[]
  {
    return this.users;
  }
  public IsClerk(username: string , password: string): boolean
  {

        for ( let curuser of this.users)
      {
        if (curuser.username === username && curuser.password === password && curuser.role === 'clerk')
        {
            return true;
        }

      }
        return false;

  }
}

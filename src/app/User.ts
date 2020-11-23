export class User { 
 
    constructor(Id:number, username: string ,  password:string , role:string) {
        this.Id=Id;
        this.username=username;
        this.password=password;
        this.role=role;

    }
 
    Id:number ;
    username: string ;
    password:string;
    role:string;
 
}
import { Component, OnInit } from '@angular/core';

// 7. Import Service
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private UserService: UsersService ) { 

  }
  ngOnInit(): void {

  }

  register(event:any): void{

    

  }

}

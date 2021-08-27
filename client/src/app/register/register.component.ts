import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeCompaonent: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  users: any;
  constructor(private accountService: AccountService) {

   }

  ngOnInit(): void {
  }

  cancel(){ 
    this.cancelRegister.emit(false);
    console.log("cancel register com");
  }

  register(){ 
    this.accountService.register(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    }, error => {console.log(error);});
    console.log(this.model);
    console.log("register");
  }


}

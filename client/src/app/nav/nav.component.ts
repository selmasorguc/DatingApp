import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$: Observable<User>;
  user: User;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {
    this.currentUser$ = new Observable<User>();
   }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.user = this.accountService.getLoggedInUser();
  }
  
  login(){
    this.accountService.login(this.model).subscribe(response =>{  
      this.router.navigateByUrl('/members'); 
      this.user = this.accountService.getLoggedInUser();        
     }, error => {
       console.log(error);
      })
  }

  logout(){ 
    this.accountService.logout();
    this.router.navigateByUrl('/members');
  }
  
}

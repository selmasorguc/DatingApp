import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeCompaonent: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[];
  users: any;
  
  constructor(public accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.inititializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  inititializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'], 
      knownAs: ['', Validators.required], 
      dateOfBirth: ['', Validators.required], 
      city: ['', Validators.required],  
      country: ['', Validators.required],   
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    }
  }

 

  cancel() {
    this.cancelRegister.emit(false);
    console.log("cancel register com");
  }

  // register() {
  //   this.accountService.register(this.registerForm.value).subscribe(response =>{
  //     this.router.navigateByUrl('/members');
  //     this.cancel();
  //   }, error => {
  //     console.log(error);
  //     this.validationErrors = error;
  //   });
  // }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      this.router.navigateByUrl('/members');
      this.cancel();
      localStorage.setItem('user', JSON.stringify(this.registerForm.value));
    }, error => {
      console.log(error);
      this.validationErrors = error;
    });
  }


}

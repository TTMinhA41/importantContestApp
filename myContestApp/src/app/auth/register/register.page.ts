import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validator, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl,
    name: new FormControl,
    username: new FormControl,
    password: new FormControl,
    confirmPassword: new FormControl
  })

  constructor(
    private _location: Location
  ) { }

  ngOnInit() {
  }
  goBack(){
    this._location.back();
  }

}

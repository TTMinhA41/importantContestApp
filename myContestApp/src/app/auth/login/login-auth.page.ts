import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validator } from '@angular/forms';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.page.html',
  styleUrls: ['./login-auth.page.scss'],
})
export class LoginAuthPage implements OnInit {

  users: any = [
    { id: 1, phone: "0986916246", email: "nhuquynh.06086@gmail.com",  password: 'admin1234' },
  ]

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
  loginForm = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit() {
  }
  logInTo(){
    let toPhone = this.loginForm.value.phone;
    let bePhone = this.users[0].phone;
    let toPass = this.loginForm.value.password;
    let bePass = this.users[0].password;
    
    if( toPhone === bePhone && toPass === bePass){
      console.log("Logined");
      this.router.navigate(['/tabs/tab1']);
    }
    else{
      console.log("Failed");
    }
  }
  routeToRegister(){
    this.router.navigate(['/auth/register']);
  }
}
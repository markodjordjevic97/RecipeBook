import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, authService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authentification: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;


  constructor(private authService: authService) { }

  ngOnInit(): void {
    this.authentification = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,
        Validators.minLength(6), Validators.maxLength(20)])
    })

  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authService.mode.next({logMode: this.isLoginMode});
  }
  onSubmit() {
    if(!this.authentification.valid) {
      return;
    }
    const email = this.authentification.value.email
    const password = this.authentification.value.password;

    this.isLoading = true;

    let authObs: Observable <AuthResponseData>

    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    }
    else {
      authObs = this.authService.signUp(email,password);
    }

    authObs.subscribe(
              resData => {
            this.isLoading = false;
          }, errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
          });

    this.authentification.reset();
  }

}

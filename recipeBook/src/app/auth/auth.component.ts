import {Component, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, authService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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

  constructor(private authService: authService,
              private router: Router) { }

  ngOnInit(): void {
    this.authentification = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,
        Validators.minLength(6), Validators.maxLength(20)])
    })

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
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
                this.router.navigate(['recipes']);
          }, errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
          });

    this.authentification.reset();
  }

}

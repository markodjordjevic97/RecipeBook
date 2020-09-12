import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class authService {

  user = new BehaviorSubject<User>(null);
  private expTimer: any;

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
   return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
              tap(resData => {
              this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
              }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
        tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }))
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.expTimer){
      clearTimeout(this.expTimer);
    }
    this.expTimer = null;
  }

  autoLogout(expDuration: number) {
   this.expTimer = setTimeout(() =>{
      this.logout();
    },expDuration);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    }  = JSON.parse(localStorage.getItem('userData'));
    if(!userData)
      return;
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  private handleAuth(email: string, id: string, token: string, exipresIn: number){
    const expirationDate = new Date(new Date().getTime() + exipresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(exipresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred'
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'That email is not found'
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'That not correct password for that email.'
        break
      }
      case 'USER_DISABLED': {
        errorMessage = 'The user account has been disabled by an administrator. '
        break;
      }
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email exists already.'
        break;
      }
      case 'OPERATION_NOT_ALLOWED': {
        errorMessage = 'That operation is not allowed'
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage = 'Thats some unusual acitivity';
      }
      default: {
        break;
      }
    }
      return throwError(errorMessage);
  }
}

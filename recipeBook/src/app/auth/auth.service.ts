import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "./user.model";

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

  private handleAuth(email: string, id: string, token: string, exipresIn: number){
    const expirationDate = new Date(new Date().getTime() + exipresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
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

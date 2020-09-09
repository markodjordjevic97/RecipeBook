import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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
 public mode = new Subject();
  isLogin = true;
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
   return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(
          errorReq => {
            let erroMessage = 'An error occured';
            if(!errorReq.error || !errorReq.error.error)
                return throwError(erroMessage);
            switch (errorReq.error.error.message) {
              case 'EMAIL_EXISTS': {
                erroMessage = 'This email exists already.'
                break;
              }
              case 'OPERATION_NOT_ALLOWED': {
                erroMessage = 'That operation is not allowed'
                break;
              }
              case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
                erroMessage = 'Thats some unusual acitivity';
              }
            }
            return throwError(erroMessage);
          }
        )
   )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEMlDo1gifMRBbSkT9Xam165QY8t87kWw',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(errorRes => {
        let errorMessage = 'An error occured'
        if(!errorRes.error || !errorRes.error.error)
            throwError(errorMessage);
        switch (errorRes.error.error.message) {
          case 'EMAIL_NOT_FOUND': {
            errorMessage = 'Thats email is not found'
            break;
          }
          case 'INVALID_PASSWORD': {
            errorMessage = 'Thats not correct password for that email.'
            break
          }
          case 'USER_DISABLED': {
            errorMessage = 'The user account has been disabled by an administrator. '
            break;
          }
          return throwError(errorMessage);
        }
      }))
  }
}

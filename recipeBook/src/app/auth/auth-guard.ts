import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {authService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private auth: authService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.user.pipe(
      take(1),
      map(user => {
      const isAuth =  !!user;
      if(isAuth)
        return true;
      return this.router.createUrlTree(['/auth']);
    }));
  }

}

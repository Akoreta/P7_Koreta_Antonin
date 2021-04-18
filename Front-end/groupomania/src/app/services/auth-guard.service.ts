import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.userService.isAuthSubject.subscribe(
          (auth) => {
            if (auth) {
              observer.next(true)
            } else {
              this.router.navigate(['/home'])
            }
          }
        )
      }
    )
  }
}




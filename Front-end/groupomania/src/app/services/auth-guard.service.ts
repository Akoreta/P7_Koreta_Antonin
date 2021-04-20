import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, private userService: UserService , private http : HttpClient) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.userService.isAuthSubject.subscribe(
          (auth) => {
            if (auth) {
              observer.next(true)
            } else if (localStorage.getItem('token')) {
this.http.get('http://localhost:3000/user/getUserData').toPromise()
  .then(() => {
    observer.next(true);
  })
  .catch(() => {
    this.router.navigate(['/home'])
  })
            } else {
              this.router.navigate(['/home']);
            }
          }
        )
      }
    )
  }
}




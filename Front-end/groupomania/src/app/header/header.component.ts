import {Component, OnInit} from '@angular/core';
import {faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isAuth: boolean;
  authSubscription: Subscription;
  isCollapsed = false;
  faToggle = faAlignJustify;

  constructor(private userService: UserService ,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.authSubscription = this.userService.isAuthSubject.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
    if (localStorage.getItem('token')){
      this.http.get('http://localhost:3000/user/getUserData').toPromise()
        .then(() => this.isAuth = true)
        .catch(() => this.isAuth = false);
    }
  }

  logout() {
    this.userService.logout();
  }


}

import {Component, OnInit} from '@angular/core';
import {faAlignJustify, faPlusCircle, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  authSubscription: Subscription;
  srcLogo = './assets/logo.png';
  title = 'Groupomania';
  isCollapsed = false;
  faPlus = faPlusCircle;
  faUser = faUserCircle;
  faToggle = faAlignJustify;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.userService.isAuthSubject.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  logout() {
    this.userService.logout();
  }


}

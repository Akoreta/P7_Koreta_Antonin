import {Component, OnInit} from '@angular/core';
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter,} from "@fortawesome/free-brands-svg-icons";
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faBuilding = faBuilding;
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.userService.isAuthSubject.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    )
  }

  logout() {
    this.userService.logout();
  }

}

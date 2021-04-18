import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostService} from "../services/post.service";
import {Post} from "../models/post.model";
import {Router} from "@angular/router";
import {faEdit , faCheck} from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect/dist/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit {
  faEdit = faEdit;
  faCheck = faCheck;
  post: Post[];
  like: number;
  postSubscription: Subscription;
  likeSubscription: Subscription;
  loadingSubscription: Subscription;
  loading: boolean;
  profilUser: User;

  constructor(private postService: PostService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.profilUser = this.userService.getProfilUser();
    this.postSubscription = this.postService.postSubject.subscribe(
      (result) => {
        this.post = result;
      }
    )
    this.loadingSubscription = this.postService.loadingSubject.subscribe(
      (result) => {
        this.loading = result
      }
    )
    this.postService.getAllPost();
    const target = document.querySelector('.pseudoHome');
    const typewriter = new Typewriter(target, {
      loop: false,
      delay: 80,
      cursorClassName:'d-none'
    });

    typewriter
      .typeString(this.profilUser.pseudo)
      .start()
  }


}

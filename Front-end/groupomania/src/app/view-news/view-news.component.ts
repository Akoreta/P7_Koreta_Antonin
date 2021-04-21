import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PostService} from '../services/post.service';
import {Post} from '../models/post.model';
import {Router} from '@angular/router';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit {
  faCheck = faCheck;
  post: Post[];
  like: number;
  postSubscription: Subscription;
  likeSubscription: Subscription;
  loadingSubscription: Subscription;
  loading: boolean;
  profilUser: User;

  constructor(private postService: PostService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.http.get('http://localhost:3000/user/getUserData').toPromise()
        .then((response: User) => {
          this.profilUser = response;
          this.animTitle();
        })
        .catch((err) => console.log(err));
    } else {
      this.profilUser = this.userService.getProfilUser();
      this.animTitle();
    }

    this.loading = true;
    this.postSubscription = this.postService.postSubject.subscribe(
      (result) => {
        this.post = result;
      }
    );

    this.loadingSubscription = this.postService.loadingSubject.subscribe(
      (result) => {
        this.loading = result;
      }
    );
    this.postService.getAllPost();
  }

  animTitle() {
    const target = document.querySelector('.pseudoHome');
    const typewriter = new Typewriter(target, {
      loop: false,
      delay: 80,
      cursorClassName: 'd-none'
    });
    typewriter
      .typeString(this.profilUser.pseudo)
      .start();
  }
}

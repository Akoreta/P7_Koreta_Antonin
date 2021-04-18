import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostService} from "../services/post.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-by-pseudo',
  templateUrl: './post-by-pseudo.component.html',
  styleUrls: ['./post-by-pseudo.component.scss']
})
export class PostByPseudoComponent implements OnInit {
  post: any;
  postSubscription: Subscription;
  loading: boolean;
  id: string;


  constructor(private http: HttpClient, private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id');

    this.postSubscription = this.postService.postByPseudoSubject.subscribe(
      (result) => {
        this.post = result
        if (this.post.length === 0) {
          this.router.navigate(['post'])
        }
      }
    )
    this.postService.getPostByAuteur(this.id);
    this.loading = false;
  }


}

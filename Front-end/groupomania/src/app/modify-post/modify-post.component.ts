import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Subscription} from "rxjs";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
  profilUser: User;
  id: string;
  post: Post;
  postSubscription: Subscription;
  postForm: FormGroup;
  imagePreview: string;


  constructor(private postService: PostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserAsync().then((result: User) => this.profilUser = result)
    this.id = this.route.snapshot.paramMap.get('id');
    this.postSubscription = this.postService.postByIdSubject.subscribe(
      (result: Post) => {
        this.post = result
        this.initForm();
      }
    )
    this.postService.getPostById(this.id);
  }


  initForm() {
    this.postForm = this.formBuilder.group(
      {
        title_post: [this.post.title_post, [Validators.required, Validators.minLength(2)]],
        description_post: [this.post.description_post, [Validators.required, Validators.minLength(2)]],
        image_url_post: ['']
      }
    )
  }

  onSubmitForm() {
    const newPost = {
      auteur_post: this.profilUser.pseudo,
      title_post: this.postForm.value.title_post,
      description_post: this.postForm.value.description_post
    };

    this.postService.modifyPost(this.id, newPost, this.postForm.value.image_url_post).then(() => this.postService.getAllPost().then(() => this.router.navigate(['post'])))
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.get('image_url_post').setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


}

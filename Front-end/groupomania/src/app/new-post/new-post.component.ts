import {Component, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {PostService} from '../services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {User} from '../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  post: Post[];
  postForm: FormGroup;
  errMessage: string;
  imagePreview: string;
  profilUser: User;
  newPostMode: string;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient, private router: Router,
              private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserAsync()
      .then((response: User) => {
        this.profilUser = response;
        this.initForm();
      } );
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title_post: ['', [Validators.required, Validators.minLength(2)]],
      description_post: ['', [Validators.required, Validators.minLength(5)]],
      image_url_post: ['']
    });
  }

  onSubmitForm() {
    const newPost = new Post();
    newPost.auteur_post = this.profilUser.pseudo;
    newPost.title_post = this.postForm.value.title_post;
    newPost.description_post = this.postForm.value.description_post;
    this.postService.createPost(newPost, this.postForm.value.image_url_post).then(() => this.router.navigate(['post']));
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
    console.log(this.postForm.value.image_url_post);
  }


}

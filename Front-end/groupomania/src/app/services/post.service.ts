import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {Post} from "../models/post.model";
import {Comment} from "../models/comment.model";
import * as moment from 'moment';
import {Router} from "@angular/router";

const date = moment();

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post: Post[];
  comment : Comment[];
  postById: Post;
  hasLikeSubject = new Subject<number>();
  postSubject = new Subject<Post[]>();
  postByPseudoSubject = new Subject<any>();
  postByIdSubject = new Subject<Post>();
  commentSubject = new Subject<Comment[]>();
  loadingSubject = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }


  getAllPost() {
    return new Promise((resolve, reject) =>{
      this.loadingSubject.next(true);
      this.http.get<Post[]>("http://localhost:3000/post/ ").subscribe(
        (response: Post[]) => {
          this.post = response;
          for (let i = 0; i < this.post.length; i++) {
            let datePost = this.post[i].date_post;
            let date = moment(datePost).locale("fr").utc().calendar();
            this.post[i].date_post = date;
            if (this.post[i].image_url_post === null) {
              this.post[i].image_url_post = "http://localhost:3000/images/icon.png1617028749363.png"
            }
          }
          this.postSubject.next(this.post);
          this.loadingSubject.next(false)
resolve(response)
        }
      )
    })

  }

  getPostByAuteur(auteurId: string) {
    let post;
    this.http.get('http://localhost:3000/post/byPseudo/' + auteurId).subscribe(
      (response) => {
        post = response;
        for (let i = 0; i < post.length; i++) {
          let datePost = post[i].date_post;
          let date = moment(datePost).locale("fr").utc().calendar();
          post[i].date_post = date;
          if (post[i].image_url_post === null) {
            post[i].image_url_post = "http://localhost:3000/images/icon.png1617028749363.png"
          }
        }
        this.postByPseudoSubject.next(post)
      }
    )
  }

  createPost(post: Post, image: File) {
    return new Promise(((resolve, reject) => {
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      formData.append('image', image);
      this.http.post('http://localhost:3000/post/new', formData).subscribe(
        (response: { message: string }) => {
          resolve(response)
          console.log('Post create')
        },
        (error => {
          reject(error)
        })
      );
    }));
  }

  modifyPost(id: string, post: any, image: File) {

    return new Promise(((resolve, reject) => {
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      formData.append('image', image);
      this.http.put('http://localhost:3000/post/' + id, formData).subscribe(
        (response: { message: string }) => {
          resolve(response)
        },
        (err) => {
          reject(err)
        }
      )
    }))
  }

  deletePost(id: string) {
    this.http.delete('http://localhost:3000/post/' + id).toPromise()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  like(postId: string, like: number, userId) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      const likeObject = {
        user_id: userId,
        like: like
      }
      this.http.post('http://localhost:3000/like/' + postId, likeObject, httpOptions).toPromise()
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })
  }

  getPostById(id: string) {

    this.http.get('http://localhost:3000/post/getOne/' + id ).toPromise()
      .then((response: Post) => {
        this.postById = response;
        this.postByIdSubject.next(this.postById)
      })
      .catch((err) => console.log(err))
  }


  sendNewCommentaire(id:string , newComment){
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      this.http.post('http://localhost:3000/comment/new/' + id, newComment ,httpOptions).toPromise()
        .then((result) => {
          resolve(result)
        })
        .catch((err) => reject(err));
    }))
  }

  deleteComment(id:string , value:number){
    return new Promise(((resolve, reject) => {
      const deleteObject = {
        comment_id:value
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body:deleteObject
      }



      this.http.delete('http://localhost:3000/comment/' + id ,httpOptions).toPromise()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }))
  }


}

/*  SELECT  `post`.* , (SELECT COUNT(*) FROM  `like_table` WHERE  `like_table`.`post_id` =  `post`.`post_id`) AS  'count_like'
  FROM `post`
  WHERE  `post`.`post_id` = 'c7c217bf6e8f48ddaa02f9da98f18689'*/

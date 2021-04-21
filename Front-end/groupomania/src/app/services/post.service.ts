import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  post: Post[];
  comment: Comment[];
  postById: Post;
  postSubject = new Subject<Post[]>();
  postByPseudoSubject = new Subject<any>();
  postByIdSubject = new Subject<Post>();
  commentSubject = new Subject<Comment[]>();
  loadingSubject = new Subject<boolean>();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getAllPost() {
    return new Promise((resolve, reject) => {
      this.loadingSubject.next(true);
      this.http.get<Post[]>('http://localhost:3000/post/ ').subscribe(
        (response: Post[]) => {
          this.post = response;
          for (const item of this.post) {
            const datePost = item.date_post;
            const date = moment(datePost).locale('fr').utc().calendar();
            item.date_post = date;
            if (item.image_url_post === null) {
              item.image_url_post = 'http://localhost:3000/images/icon.png1617028749363.png';
            }
          }
          this.postSubject.next(this.post);
          this.loadingSubject.next(false);
          resolve(response);
        }
      );
    });

  }

  getPostByAuteur(auteurId: string) {
    let post;
    this.http.get('http://localhost:3000/post/byPseudo/' + auteurId).subscribe(
      (response) => {
        post = response;
        for (const item of post) {
          const datePost = item.date_post;
          const date = moment(datePost).locale('fr').utc().calendar();
          item.date_post = date;
          if (item.image_url_post === null) {
            item.image_url_post = 'http://localhost:3000/images/icon.png1617028749363.png';
          }
        }
        this.postByPseudoSubject.next(post);
      }
    );
  }

  createPost(post: Post, image: File) {
    return new Promise(((resolve, reject) => {
      const formData = new FormData();
      formData.append('post', JSON.stringify(post));
      formData.append('image', image);
      this.http.post('http://localhost:3000/post/new', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error => {
          reject(error);
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
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    }));
  }

  deletePost(id: string) {
    return new Promise(((resolve, reject) => {
      this.http.delete('http://localhost:3000/post/' + id).toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    }));
  }

  like(postId: string, like: number, userId) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      const likeObject = {
        user_id: userId,
        like
      };
      this.http.post('http://localhost:3000/like/' + postId, likeObject, httpOptions).toPromise()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  getPostById(id: string) {
    this.http.get('http://localhost:3000/post/getOne/' + id).toPromise()
      .then((response: Post) => {
        this.postById = response;
        this.postByIdSubject.next(this.postById);
      })
      .catch((err) => console.log(err));
  }

  sendNewComment(id: string, newComment) {
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post('http://localhost:3000/comment/new/' + id, newComment, httpOptions).toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    }));
  }

  deleteComment(id: string, value: number) {
    return new Promise(((resolve, reject) => {
      const deleteObject = {
        comment_id: value
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: deleteObject
      };

      this.http.delete('http://localhost:3000/comment/' + id, httpOptions).toPromise()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }));
  }
}

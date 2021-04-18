import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthSubject = new BehaviorSubject<boolean>(false);
  private users: User[];
  private token : string;
  private userId: string;
  private ProfilUser: User;


  constructor(private http: HttpClient, private router: Router) {
  }


  getProfilUser() {
    return this.ProfilUser;
  }

  getUserAsync() {
    return new Promise((resolve => {
      const result = this.ProfilUser;
      resolve(result);
    }))
  }

  getToken() {
return this.token;
  }

  logout() {
    this.ProfilUser.userId = null;
    this.ProfilUser.token = null;
    this.ProfilUser.email = null;
    this.ProfilUser.pseudo = null;
    this.isAuthSubject.next(false);
    this.router.navigate(['login']);
  }

  newUser(postObject: User) {
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      };

      this.http.post("http://localhost:3000/user/register", postObject, httpOptions).toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch(err => {
         reject(err)
        })
    }))
  }


  loginUser(postObject: { password: string; pseudo: string }) {
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      };

      this.http.post('http://localhost:3000/user/login', postObject, httpOptions).toPromise()
        .then((result: User) => {
          this.ProfilUser = result;
          this.token = result.token;
          this.isAuthSubject.next(true);
          resolve(result);
        })
        .catch((err) => {
          if (err.status === 401) {
            err = 'Connexion refusée'
          }
          reject(err);
        })

    }))
  }


  deleteUser(postObject) {
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      };
      this.http.post('http://localhost:3000/user/', postObject, httpOptions).toPromise()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }))

  }


}

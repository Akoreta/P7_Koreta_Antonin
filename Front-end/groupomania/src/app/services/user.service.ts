import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthSubject = new BehaviorSubject<boolean>(false);
  private token: string;
  private ProfilUser: User;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getProfilUser() {
    return this.ProfilUser;
  }

  getDateCreationUser() {
    return moment(this.ProfilUser.dateCreation).locale('fr').format('L');
  }

  getUserAsync() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        this.http.get('http://localhost:3000/user/getUserData').toPromise()
          .then((response: User) => {
            this.ProfilUser = response;
            resolve(this.ProfilUser);
          })
          .catch((err) => reject(err));
      } else {
        const result = this.ProfilUser;
        resolve(result);
      }
    });
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.ProfilUser.user_id = null;
    this.ProfilUser.token = null;
    this.ProfilUser.email = null;
    this.ProfilUser.pseudo = null;
    this.isAuthSubject.next(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  newUser(postObject: User) {
    return new Promise(((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        })
      };

      this.http.post('http://localhost:3000/user/register', postObject, httpOptions).toPromise()
        .then((result) => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }));
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
          localStorage.setItem('token', result.token);
          this.isAuthSubject.next(true);
          resolve(result);
        })
        .catch((err) => {
          if (err.status === 401) {
            err = 'Connexion refusée';
          }
          reject(err);
        });

    }));
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
    }));
  }

  getTokenLocal() {
    return localStorage.getItem('token');
  }
}

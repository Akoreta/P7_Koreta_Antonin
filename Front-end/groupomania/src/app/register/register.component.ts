import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users: User[];
  userForm: FormGroup;
  errMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const loginObject = {
      pseudo: this.userForm.get('pseudo').value,
      password: this.userForm.get('password').value
    };
    this.userService.newUser(formValue)
      .then(() => {
        this.userService.loginUser(loginObject)
          .then(() => {
            this.router.navigate(['/post']);
          })
          .catch((err) => this.errMessage = err );
      })
      .catch((err) => {
        if (err.status === 400){
          this.errMessage = 'Votre mot de passe doit contenir au minimum 5 caractères, à savoir : au moins une lettre majuscule , une lettre minuscule et au moins un chiffre';
        }
        else if (err.status === 401){
          this.errMessage = 'Email ou pseudo déjà existant';
        }
        else {
          this.errMessage = 'Erreur';
        }
      });
  }


}

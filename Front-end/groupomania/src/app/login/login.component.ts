import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = true;
  loginForm: FormGroup;
  errMsg: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.initForm();
    this.loading = false;
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.loginForm.value;
    this.userService.loginUser(formValue)
      .then((response) => {
        this.router.navigate(['post']);
      })
      .catch((err) => this.errMsg = err);
  }

}

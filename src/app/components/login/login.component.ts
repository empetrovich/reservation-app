import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FireBaseCodeErrorsService } from '../../services/fire-base-code-errors.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginUser: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private fireBaseErrors: FireBaseCodeErrorsService,
    private authService: AuthService
  ) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {}

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;
    const userData = Object.assign(this.loginUser.value, {email: email});

    this.loading = true;
    this.authService
      .signWithEmailAndPassword(userData)
      .then((user) => {
        if(user.user?.emailVerified) {
          //localStorage.setItem('token', 'true');
          this.router.navigate(['/reservation-form']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(this.fireBaseErrors.codeErrors(error.code), 'Error');
      });

  }


}
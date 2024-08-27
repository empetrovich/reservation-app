import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FireBaseCodeErrorsService } from '../../services/fire-base-code-errors.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  registerUser: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private fireBaseErrors: FireBaseCodeErrorsService,
    private authService: AuthService
  ) {
    this.registerUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confirmPassword = this.registerUser.value.confirmPassword;

    const userData = Object.assign(this.registerUser.value, {email: email});

    if (password !== confirmPassword) {
      this.toastr.error("The passwords entered were not the same.", 'Error');
      return;
    }
  
    this.loading = true;
    this.authService
      .registerWithEmailPassword(userData)
      .then(() => {
        //add user to localstorage
        this.authService.verifyEmail().then(() => {
            this.toastr.info('An email verification has been sent.', "Email Verification");
            this.router.navigate(['/login']);
          });
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(this.fireBaseErrors.codeErrors(error.code), 'Error');
      });

  }


}

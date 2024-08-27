import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FireBaseCodeErrorsService } from '../../services/fire-base-code-errors.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent implements OnInit {
  recoverUser: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private fireBaseErrors: FireBaseCodeErrorsService
  ) {
    this.recoverUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  ngOnInit(): void {
    
  }

  recover() {
    const email = this.recoverUser.value.email;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.toastr.info('We sent you a password recovery email.', 'Password Recovery');
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(this.fireBaseErrors.codeErrors(error.code), 'Error');
      })
  }

}

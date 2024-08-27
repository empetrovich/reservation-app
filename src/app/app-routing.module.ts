import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'reservation-form', component: ReservationFormComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

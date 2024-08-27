import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  constructor(private afAuth:AngularFireAuth, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if(user  && user.emailVerified) {
        this.dataUser = user;
      } else {
        this.router.navigate(['/login']);
      }
    });

  }

  /*this.authService.isVerified()
    .then((user) => {
      //this.router.navigate(['/dashboard']);
      console.log(user);
    }).catch((error) => {
      console.log(error);
      this.router.navigate(['/login']);
  });*/

  logOut() {
    this.authService.signOut().then(() => {
      //localStorage.removeItem('token');
      this.router.navigate(['/login'])
    });
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  registerWithEmailPassword(user : {email: string, password: string}) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
  }

  signWithEmailAndPassword(user : {email: string, password: string}) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  verifyEmail() {
    return this.afAuth.currentUser.then(user => user?.sendEmailVerification());
  }

/*isVerified() {
    return this.afAuth.currentUser.then(user => user?.emailVerified);
  }*/

  signOut() {
    return this.afAuth.signOut();
  }

}

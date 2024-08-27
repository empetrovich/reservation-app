import { Injectable } from '@angular/core';
import { FireBaseCodeErrorsEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FireBaseCodeErrorsService {

  constructor() { }

  codeErrors(code: string) {
    switch (code) {
      // email already exists
      case FireBaseCodeErrorsEnum.EmailAlreadyInUse:
        return 'A user with the same email already exists.'

      // weak password
      case FireBaseCodeErrorsEnum.WeakPassword:
        return 'The password you entered was too weak.'

      // invalid email
      case FireBaseCodeErrorsEnum.InvalidEmail:
        return 'An invalid email was entered.'

      // invalid credentials
      case FireBaseCodeErrorsEnum.InvalidCredential:
        return 'Invalid credentials entered.'

      default:
        return 'An unexpected error occurred.'
    }
  }

}

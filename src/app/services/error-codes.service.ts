import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodesService {

  constructor() { }

  
  // CONTROL DE ERRORES REGISTRO

  registerErrors(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El usuari@ ya existe';
      case 'auth/weak-password':
        return 'La contraseña es demasiado corta, mínimo 6 carácteres';
      case 'auth/invalid-email':
        return 'El formato del email es incorrecto';
      default:
        return 'No se pueden dejar campos en blanco';
    }

  }

   // CONTROL DE ERRORES LOGIN

   userLoginErrors(code: string) {
    switch (code) {
      case 'auth/user-not-found':
        return 'El usuari@ no ha sido encontrad@';
      case 'auth/wrong-password':
        return 'El password es incorrecto';
      default:
        return 'No se pueden dejar campos en blanco';

    }
    
  }

 


}

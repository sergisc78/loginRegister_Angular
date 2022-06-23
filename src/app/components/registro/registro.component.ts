import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorCodesService } from 'src/app/services/error-codes.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  userRegister: FormGroup;


  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorservice: ErrorCodesService) {

    this.userRegister = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
      repeatPass: ['', Validators.required],
    })


  }

  ngOnInit(): void {
  }

  // REGISTRO
  
  register() {

    const email = this.userRegister.value.email;
    const password = this.userRegister.value.password;
    const repeatPass = this.userRegister.value.repeatPass;


    // SI LOS PASSWORDS NO COINCIDEN

    if (password != repeatPass) {
      this.toastr.error('Los passwords no coinciden', 'Error', {
        timeOut: 5000,
      });
      return;
    }


    // REGISTRAR UN USUARIO Y CONTROLAR LOS ERRORES

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.verifyEmail();
    }).catch((error) => {

      this.toastr.error(this.errorservice.registerErrors(error.code), 'Error', {
        timeOut: 5000,
      });

    });

  }

  // VERIFICAR EL EMAIL AL REGISTRARSE

  verifyEmail() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info('Le hemos enviado un email para verficar la cuenta de correo electrónico', 'Verificar email', {
          timeOut: 5000,
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000
        );

      });
  }



}

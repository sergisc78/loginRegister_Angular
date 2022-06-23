import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodesService } from 'src/app/services/error-codes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorcodes: ErrorCodesService) {

    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {
  }


  login() {

    const email = this.userLogin.value.email;
    const password = this.userLogin.value.password;


    

    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {

      // SI ESTÁ VERIFICADO EL EMAIL, SE REDIRECCIONA A DASHBOARD, SINO A VERIFICAR EMAIL
      
      if (user.user?.emailVerified) {
        this.toastr.success('Datos correctos', 'Bienvenid@', {
          timeOut: 5000,
        });
        this.toastr.success('Redireccionando a dashboard', 'Redirección');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 5000)
      } else {
        this.toastr.success('Redireccionando a verificar email', 'Redirección');
        setTimeout(() => {
          this.router.navigate(['/verificar-email']);
        }, 5000);
      }

    }).catch((error) => {
      this.toastr.error(this.errorcodes.userLoginErrors(error.code), 'Error');

      console.log(error);

    });
  }



}

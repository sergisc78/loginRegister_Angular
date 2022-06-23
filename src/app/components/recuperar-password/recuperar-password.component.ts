import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorCodesService } from 'src/app/services/error-codes.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recoverPass: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorcodes: ErrorCodesService) {

    this.recoverPass = this.fb.group({
      email: ['', Validators.required,Validators.email]
    })
  }

  ngOnInit(): void {
  }

  recover() {
    const email = this.recoverPass.value.email;

    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.toastr.success('Le enviamos un email para restablecer su password', 'Recuperación de contraseña', {
        timeOut: 5000,
      });
      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000)
    }).catch((error)=>{
      this.toastr.error(this.errorcodes.registerErrors(error.code), 'Error');
    });
  }

}

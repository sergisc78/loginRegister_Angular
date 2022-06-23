import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path:'login',component:LoginComponent },
  {path:'registro',component:RegistroComponent },
  {path:'recuperar-password',component:RecuperarPasswordComponent },
  {path:'verificar-email',component:VerificarCorreoComponent },
  {path:'dashboard',component:DashboardComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

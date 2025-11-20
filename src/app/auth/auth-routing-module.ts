import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponentComponent } from './registerComponent/registerComponent.component';
import { ResetPasswordComponentComponent } from './resetPasswordComponent/resetPasswordComponent.component';
import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponentComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponentComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

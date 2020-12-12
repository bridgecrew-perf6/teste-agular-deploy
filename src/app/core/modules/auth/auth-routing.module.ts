import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouteLink } from './shared/enum/auth-route-link.enum';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AuthRouteLink.LOGIN,
    pathMatch: 'full',
  },
  {
    path: AuthRouteLink.LOGIN,
    component: AuthLoginComponent,
  },
  {
    path: AuthRouteLink.FORGOT_PASS,
    component: ForgotPasswordComponent,
  },
  {
    path: AuthRouteLink.ACTIVATE,
    component: ActivateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

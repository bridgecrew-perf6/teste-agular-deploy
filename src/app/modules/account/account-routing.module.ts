import { AuthGuard } from './../../core/modules/auth/shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRouteLink } from './shared/enums/account-route-link.enum';
import { AccountComponent } from './account.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AccountComponent,
      },
      {
        path: AccountRouteLink.ACCOUNTS,
        component: AccountListComponent,
      },
      {
        path: AccountRouteLink.CREATE_ACCOUNT,
        component: AccountRegisterComponent,
      },
      {
        path: AccountRouteLink.CHANGE_PASSWORD,
        component: AccountChangePasswordComponent,
      },
      {
        path: ':id',
        component: AccountRegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

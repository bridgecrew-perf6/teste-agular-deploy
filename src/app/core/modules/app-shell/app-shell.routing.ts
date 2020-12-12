import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellNavRouteLink } from './app-shell-nav-route-link.enum';
import { AppShellComponent } from './app-shell.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: AppShellNavRouteLink.HOME,
        loadChildren: () =>
          import('../../../modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../../../modules/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppShellRoutes {}

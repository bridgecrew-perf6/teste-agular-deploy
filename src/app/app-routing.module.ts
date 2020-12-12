import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteLink } from './core/enums/app-route-link.enum';
import { AuthGuard } from './core/modules/auth/shared/services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRouteLink.APP },
  {
    path: AppRouteLink.APP,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./core/modules/app-shell/app-shell.module').then(
        (m) => m.AppShellModule
      ),
  },
  {
    path: AppRouteLink.AUTH,
    loadChildren: () =>
      import('./core/modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

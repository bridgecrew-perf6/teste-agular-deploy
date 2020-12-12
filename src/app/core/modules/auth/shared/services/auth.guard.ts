import { Injectable, isDevMode } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
} from '@angular/router';
import { AuthJWTService } from './auth-jwt.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authJwtService: AuthJWTService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): Observable<boolean> {
    return this.authJwtService.isLoggedIn$.pipe(
      map((login) => {
        if (login) {
          return true;
        }
        if (isDevMode()) {
          console.warn('User has not any of required authorities: ');
        }
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}

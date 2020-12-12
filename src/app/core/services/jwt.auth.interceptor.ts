import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthJWTService } from '../modules/auth/shared/services/auth-jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authJWT: AuthJWTService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authJWT.isLoggedIn$.getValue()) {
      request = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authJWT.authJWT.id_token}`,
        }),
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: HttpEvent<any>) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authJWT.logout();
            }
          }
        }
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthModel } from '../interfaces/auth.model';
import { Store } from '@ngrx/store';
import { Logout } from 'app/reducers/clear-state';
import { AuthJWTM } from '../interfaces/auth-jwt.model';
import { HttpApiService } from 'app/core/services/http-api.service';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { getAccount } from 'app/modules/account/shared/store/account.actions';

@Injectable({ providedIn: 'root' })
export class AuthJWTService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private accountEmmiter = new BehaviorSubject(null);
  onAccountChange = this.accountEmmiter.asObservable();
  jwtDecoded: any;
  authJWT: AuthJWTM;
  isLoggedIn: boolean;

  constructor(
    private httpApiService: HttpApiService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private logoutStore: Store<Logout>,
    private router: Router,
    private accountStore: Store<{ account: Account }>
  ) {}

  get getAccount(): string {
    const { sub } = this.jwtDecoded;
    return sub;
  }

  getToken(): string {
    return (
      this.$localStorage.retrieve('authenticationToken') ||
      this.$sessionStorage.retrieve('authenticationToken') ||
      ''
    );
  }

  login(credentials: AuthModel): Observable<void> {
    return this.httpApiService
      .post<AuthModel>('authenticate', credentials)
      .pipe(
        map((response) =>
          this.authenticateSuccess(response, credentials.rememberMe)
        )
      );
  }

  logout(): Observable<void> {
    return new Observable((observer) => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.logoutStore.dispatch(new Logout());
      this.router.navigateByUrl('/auth/login');
    });
  }

  private authenticateSuccess(response: AuthJWTM, rememberMe: boolean): void {
    this.authJWT = response;
    this.jwtDecoded = jwt_decode(this.authJWT.id_token);
    this.isLoggedIn$.next(true);
    this.accountStore.dispatch(
      getAccount({
        name: this.jwtDecoded.sub,
      })
    );
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', this.authJWT);
    } else {
      this.$sessionStorage.store('authenticationToken', this.authJWT);
    }
  }
}

import { AccountModel } from 'app/modules/account/shared/interfaces/account.model';
import { AccountChangePassword } from '../interfaces/account-change-password.model';
import { Observable } from 'rxjs';
import { HttpApiService } from 'app/core/services/http-api.service';
import { Injectable } from '@angular/core';
import { AccountResetPasswordFinish } from '../interfaces/account-reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  constructor(private httpApiService: HttpApiService) {}

  getAccount(payload: string): Observable<AccountModel> {
    return this.httpApiService.getWithUrl<AccountModel>('users', payload);
  }

  getAccounts(): Observable<AccountModel[]> {
    return this.httpApiService.get<AccountModel[]>('users', null);
  }

  registerAccount(payload: AccountModel): Observable<AccountModel> {
    return this.httpApiService.post<AccountModel>('register', payload);
  }

  updateAccount(payload: AccountModel): Observable<AccountModel> {
    return this.httpApiService.put<AccountModel>('users', payload);
  }

  deleteAccount(login: string): Observable<string> {
    return this.httpApiService.delete('users', login);
  }

  changePassword(payload: AccountChangePassword): Observable<number> {
    return this.httpApiService.post<AccountChangePassword>(
      'account/change-password',
      payload
    );
  }

  resetPasswordInit(payload: string): Observable<string> {
    return this.httpApiService.post<string>(
      'account/reset-password/init',
      payload
    );
  }

  resetPasswordFinish(
    payload: AccountResetPasswordFinish
  ): Observable<AccountResetPasswordFinish> {
    return this.httpApiService.post<AccountResetPasswordFinish>(
      'account/reset-password/init',
      payload
    );
  }

  activateAccount(payload): Observable<string> {
    return this.httpApiService.post('account/activate-by-login', payload);
  }
}

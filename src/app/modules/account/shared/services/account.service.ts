import { ComponentEventHandler } from './../../../../core/abstract-clasess/component-event-handler/component-event-handler';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountModel } from '../interfaces/account.model';
import { AccountAction } from '../enums/account-action.enum';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends ComponentEventHandler<
  AccountAction,
  AccountModel
> {
  constructor() {
    super();
  }

  registerNewAccount(payload: AccountModel): Observable<any> {
    return of({
      ...payload,
      login: payload.login.trim(),
      authorities: ['ROLE_USER'],
      firstName: payload.firstName.trim().split(' ')[0],
      lastName:
        payload.firstName.trim().split(' ').length > 1
          ? payload.firstName.trim().split(' ')[1]
          : '',
      createdBy: 'system',
      imageUrl: '',
      langKey: 'pt-br',
      lastModifiedBy: 'system',
      activated: true,
      createdDate: new Date(),
      lastModifiedDate: null,
      password: payload.password,
    });
  }
}

import { AccountModel } from './../interfaces/account.model';
import { AccountService } from './../services/account.service';
import { AccountApiService } from './../services/account-api.service';
import { getRandomColor } from 'app/core/utils/random-color';
import { of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, switchMap, flatMap } from 'rxjs/operators';

import * as accountActions from './account.actions';
import { Store } from '@ngrx/store';
import { selectAccount, clearAccount } from './account.actions';
import { MessageSnackBarComponent } from 'app/core/layout/components/message-snack-bar/message-snack-bar.component';

// Salvar no banco com color para evitar setar cor

const addRandonColorAtUser = (account: AccountModel[]) => {
  return account.map((us: AccountModel) => ({
    ...us,
    color: getRandomColor(),
  }));
};

@Injectable()
export class AccountStoreEffects {
  constructor(
    private accountApiService: AccountApiService,
    private actions$: Actions,
    private accountStore: Store<{ account: AccountModel }>,
    private accountService: AccountService,
    private snackBar: MessageSnackBarComponent
  ) {}

  loadAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.getAccount),
      switchMap((account: any) => {
        return this.accountApiService.getAccount(account.name).pipe(
          map((acc: any) => {
            this.accountStore.dispatch(
              selectAccount({ selectedAccountId: acc.id })
            );
            return accountActions.getAccountSuccess({
              account: acc,
            });
          }),
          catchError((error) => of(accountActions.actionFailure({ error })))
        );
      })
    );
  });

  postRegisterEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.createAccount),
      switchMap((payload) =>
        this.accountService.registerNewAccount(payload.account)
      ),
      switchMap((accountRegister) =>
        this.accountApiService.registerAccount(accountRegister).pipe(
          map(() => {
            const msg = 'Usuário criado com sucesso';
            this.handleSuccess(msg, 'green-snackbar');
            this.accountStore.dispatch(clearAccount());
            return accountActions.createAccountSuccess({
              msg,
            });
          }),
          catchError((error) => {
            return of(accountActions.actionFailure({ error }));
          })
        )
      )
    );
  });

  putAccountEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.updateAccount),
      switchMap(({ account }) =>
        this.accountApiService.updateAccount(account).pipe(
          map((accountUpdated) => {
            this.handleSuccess(
              'Usuário atualizado com sucesso',
              'green-snackbar'
            );
            this.accountStore.dispatch(clearAccount());
            return accountActions.updateAccountSuccess({
              account: accountUpdated,
            });
          }),
          catchError((error) => {
            return of(accountActions.actionFailure({ error }));
          })
        )
      )
    );
  });

  loadAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.getAccounts),
      switchMap(() => this.accountApiService.getAccounts()),
      map((accountWithoutColors) => {
        const accounts: any = addRandonColorAtUser(accountWithoutColors);
        return accountActions.getAccountsSuccess({ accounts });
      }),
      catchError((error) => of(accountActions.actionFailure({ error })))
    );
  });

  deleteAccount$ = createEffect(() => {
    let id;
    return this.actions$.pipe(
      ofType(accountActions.deleteAccount),
      switchMap((resp) => {
        id = resp.id;
        return this.accountApiService.deleteAccount(resp.login);
      }),
      map(() => {
        this.handleSuccess('Deletado com Sucesso', 'red-snackbar');
        return accountActions.deleteAccountSuccess({ id });
      }),

      catchError((error) => of(accountActions.actionFailure({ error })))
    );
  });

  activateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.activateAccount),
      switchMap(({ account }) =>
        this.accountApiService.activateAccount(account).pipe(
          map((id) => {
            this.accountStore.dispatch(clearAccount());
            return accountActions.activateAccountSuccess({ id });
          }),
          catchError((error) => of(accountActions.actionFailure({ error })))
        )
      )
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.changePasswordAccount),
      switchMap(({ accountChangePassword }) =>
        this.accountApiService.changePassword(accountChangePassword).pipe(
          map((id) => {
            this.handleSuccess(
              'Senha atualizada com sucesso',
              'green-snackbar'
            );
            return accountActions.changePasswordAccountSuccess({ id });
          }),
          catchError((error) => of(accountActions.actionFailure({ error })))
        )
      )
    );
  });

  private handleSuccess(message: string, color: string) {
    this.snackBar.openSnackBar(message, 'Close', color);
  }
}

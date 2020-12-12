import { AccountModel } from './../interfaces/account.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { accountAdapter, State } from './state';

export const selectAccountState = createFeatureSelector<State>('account');

export const selectAllAccountItems: (
  state: object
) => AccountModel[] = accountAdapter.getSelectors(selectAccountState).selectAll;

export const selectTotalAccountItems = createSelector(
  selectAccountState,
  (state: State): number => {
    return state.total;
  }
);

const selectSelectedAccountId = createSelector(
  selectAccountState,
  (state: State): string | number => state.selectedAccountId
);

const selectSelectedAccountIdToEdit = createSelector(
  selectAccountState,
  (state: State): string | number => state.selectedAccountIdToEdit
);

export const selectCurrentAccount = createSelector(
  selectAllAccountItems,
  selectSelectedAccountId,
  (allAccounts: AccountModel[], selectedAccountId: string | number) => {
    if (allAccounts && selectedAccountId) {
      const Account = allAccounts.find(
        (p) => Number(p.id) === Number(selectedAccountId)
      );
      return Account;
    } else {
      return null;
    }
  }
);

export const selectCurrentAccountToEdit = createSelector(
  selectAllAccountItems,
  selectSelectedAccountIdToEdit,
  (allAccounts: AccountModel[], selectedAccountIdToEdit: string | number) => {
    if (allAccounts && selectedAccountIdToEdit) {
      const Account = allAccounts.find(
        (p) => Number(p.id) === Number(selectedAccountIdToEdit)
      );
      return Account;
    } else {
      return null;
    }
  }
);

export const selectAccountError = createSelector(
  selectAccountState,
  (state: State): any => state.error
);

export const selectAccountIsLoading = createSelector(
  selectAccountState,
  (state: State): boolean => state.isLoading
);

export const selectAccountsLoading = createSelector(
  selectAccountState,
  (state: State): boolean => state.loadingAccounts
);

export const selectCreateAccountIsLoading = createSelector(
  selectAccountState,
  (state) => state.isLoading
);

export const selectChangePasswordStatus = createSelector(
  selectAccountState,
  (state) => state.changePassword
);

export const selectCreateAccountStatus = createSelector(
  selectAccountState,
  (state: State): boolean => state.creating
);

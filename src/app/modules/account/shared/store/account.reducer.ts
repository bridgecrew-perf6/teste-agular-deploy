import { Action, createReducer, on } from '@ngrx/store';
import * as accountActions from './account.actions';
import { accountAdapter, initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(accountActions.loadAccount, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(accountActions.actionFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      savedOk: false,
      creating: false,
      error,
    };
  }),

  on(accountActions.getAccountSuccess, (state, action) => {
    return accountAdapter.addOne(action.account, {
      ...state,
      ...{ isLoading: false, savedOk: true },
    });
  }),
  on(accountActions.clearAccountSaveOk, (state) => ({
    ...state,
    ...{ savedOk: false, changePassword: false },
  })),
  on(accountActions.selectAccount, (state, { selectedAccountId }) => {
    return {
      ...state,
      selectedAccountId,
    };
  }),
  on(
    accountActions.selectAccountToEdit,
    (state, { selectedAccountIdToEdit }) => {
      return {
        ...state,
        selectedAccountIdToEdit,
      };
    }
  ),
  on(accountActions.createAccount, (state) => ({
    ...state,
    ...{ isLoading: true, error: null, creating: false },
  })),
  on(accountActions.createAccountSuccess, (state) => ({
    ...state,
    ...{ isLoading: false, error: null, creating: true },
  })),
  on(accountActions.updateAccount, (state) => {
    return { ...state, ...{ isLoading: true, error: null, creating: false } };
  }),
  on(accountActions.updateAccountSuccess, (state, action) => {
    return accountAdapter.upsertOne(action.account, {
      ...state,
      ...{ isLoading: false, error: null, creating: true },
    });
  }),
  on(accountActions.getAccounts, (state) => {
    return { ...state, ...{ loadingAccounts: true } };
  }),
  on(accountActions.getAccountsSuccess, (state, action) => {
    return accountAdapter.setAll(action.accounts, {
      ...state,
      ...{ loadingAccounts: false, error: null },
    });
  }),
  on(accountActions.deleteAccount, (state) => {
    return { ...state, ...{ loadingAccounts: true } };
  }),
  on(accountActions.deleteAccountSuccess, (state, action) => {
    return accountAdapter.removeOne(action.id, {
      ...state,
      ...{ loadingAccounts: false },
    });
  }),

  on(accountActions.activateAccount, (state, action) => {
    return { ...state, ...{ loadingAccounts: true } };
  }),

  on(accountActions.activateAccountSuccess, (state, action) => {
    return accountAdapter.updateOne(
      {
        id: action.id,
        changes: { activated: !state.entities[action.id].activated },
      },
      { ...state, ...{ loadingAccounts: false } }
    );
  }),
  on(accountActions.clearAccount, (state) => ({
    ...state,
    ...{ creating: false },
  })),
  on(accountActions.changePasswordAccount, (state) => ({
    ...state,
    isLoading: true,
    error: false,
  })),
  on(accountActions.changePasswordAccountSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: false,
    changePassword: true,
  })),
  on(accountActions.changePasswordAccountError, (state) => ({
    ...state,
    isLoading: false,
    error: true,
    changePassword: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}

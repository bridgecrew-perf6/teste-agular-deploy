import { AccountModel } from './../interfaces/account.model';
import { createAction, props } from '@ngrx/store';
import { AccountActivated } from '../interfaces/account-activated.model';
import { AccountChangePassword } from '../interfaces/account-change-password.model';

export enum AccountActionType {
  Load = '[Account Component] Load',
  SearchAccounts = '[Account Component] Search Account',
  UpdateAccount = '[Account Component] Update Account',
  UpdateAccountSuccess = '[Account Component] Update Account Success',
  GetAccount = '[Account Component] Get Account',
  GetAccountSucess = '[Account Component] Get Account Success',
  UpdateTotal = '[Account Component] Update Total',
  DeleteAccount = '[Account] Delete Account',
  DeleteAccountSuccess = '[Account] Delete Account Success',
  ActionFailure = '[Account API] Execute action failure',
  LoadSuccess = '[Account API] Load Success',
  Refresh = '[Account Page] Refresh',
  Selected = '[Account Page] Select',
  SelectedToEdit = '[Account] Account Selected',
  SubmitSuccess = '[Account API] Submit Success',
  ClearAccountSave = '[Account] Clear Account Saved OK',
  CreateAccount = '[Account Register] Create Account',
  CreateAccountSucess = '[Account Register] Create Account Success',
  GetAccounts = '[Account Component] Get Accounts',
  GetAccountsSucess = '[Account Component] Get Accounts Success',
  ActivateAccount = '[Account Auth] Get Activate Account',
  ActivateAccountSuccess = '[Account Auth] Get Activate Account Success',
  ChangePasswordAccount = '[Account] Change Password Account',
  ChangePasswordAccountSuccess = '[Account] Change Password Account Success',
  ChangePasswordAccountError = '[Account] Change Password Account Error',
  ClearAccount = '[Account Clear]',
}

export const loadAccount = createAction(
  AccountActionType.Load,
  props<{ account: string }>()
);

export const getAccount = createAction(
  AccountActionType.GetAccount,
  props<{ name: string }>()
);
export const getAccountSuccess = createAction(
  AccountActionType.GetAccountSucess,
  props<{ account: AccountModel }>()
);

export const getAccounts = createAction(AccountActionType.GetAccounts);

export const getAccountsSuccess = createAction(
  AccountActionType.GetAccountsSucess,
  props<{ accounts: AccountModel[] }>()
);

export const actionFailure = createAction(
  AccountActionType.ActionFailure,
  props<{ error: string }>()
);

export const updateTotal = createAction(
  AccountActionType.UpdateTotal,
  props<{ total: number }>()
);

export const loadSuccess = createAction(
  AccountActionType.LoadSuccess,
  props<{ account: AccountModel }>()
);

export const submitSuccess = createAction(
  AccountActionType.SubmitSuccess,
  props<{ msg: string }>()
);

export const refresh = createAction(AccountActionType.Refresh);

export const selectAccount = createAction(
  AccountActionType.Selected,
  props<{ selectedAccountId: string | number }>()
);

export const selectAccountToEdit = createAction(
  AccountActionType.SelectedToEdit,
  props<{ selectedAccountIdToEdit: string | number }>()
);

export const updateAccount = createAction(
  AccountActionType.UpdateAccount,
  props<{ account: AccountModel }>()
);

export const updateAccountSuccess = createAction(
  AccountActionType.UpdateAccountSuccess,
  props<{ account: AccountModel }>()
);

export const deleteAccount = createAction(
  AccountActionType.DeleteAccount,
  props<{ id: number; login: string }>()
);

export const deleteAccountSuccess = createAction(
  AccountActionType.DeleteAccountSuccess,
  props<{ id: number }>()
);

export const clearAccountSaveOk = createAction(
  AccountActionType.ClearAccountSave
);

export const createAccount = createAction(
  AccountActionType.CreateAccount,
  props<{ account: AccountModel }>()
);

export const createAccountSuccess = createAction(
  AccountActionType.CreateAccountSucess,
  props<{ msg: string }>()
);

export const activateAccount = createAction(
  AccountActionType.ActivateAccount,
  props<{ account: AccountActivated }>()
);

export const activateAccountSuccess = createAction(
  AccountActionType.ActivateAccountSuccess,
  props<{ id: string }>()
);

export const changePasswordAccount = createAction(
  AccountActionType.ChangePasswordAccount,
  props<{ accountChangePassword: AccountChangePassword }>()
);

export const changePasswordAccountSuccess = createAction(
  AccountActionType.ChangePasswordAccountSuccess,
  props<{ id: number }>()
);

export const changePasswordAccountError = createAction(
  AccountActionType.ChangePasswordAccountError
);

export const clearAccount = createAction(AccountActionType.ClearAccount);

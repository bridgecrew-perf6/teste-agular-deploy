import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AccountModel } from '../interfaces/account.model';

export const accountAdapter: EntityAdapter<AccountModel> = createEntityAdapter<
  AccountModel
>({
  selectId: (model) => model.id.toString(),
});
export interface State extends EntityState<AccountModel> {
  isLoading?: boolean;
  error?: any;
  total?: number;
  selectedAccountId?: string | number;
  selectedAccountIdToEdit?: string | number;
  savedOk: boolean;
  loadingAccounts: boolean;
  creating: boolean;
  changePassword: boolean;
}

export const initialState: State = accountAdapter.getInitialState({
  isLoading: false,
  loadingAccounts: false,
  error: null,
  selectedAccountIdToEdit: null,
  total: 0,
  savedOk: false,
  creating: null,
  changePassword: false,
});

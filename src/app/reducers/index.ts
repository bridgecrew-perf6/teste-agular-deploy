import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as account } from '../modules/account/shared/store/account.reducer';
import { clearState } from './clear-state';
import { storeFreeze } from 'ngrx-store-freeze';
// import { reducer as company } from '../modules/company/shared/store/company.reducer';

// tslint:disable-next-line: no-empty-interface
export interface State {}

export const reducers: ActionReducerMap<State> = {
  // company,
  account,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, clearState]
  : [];

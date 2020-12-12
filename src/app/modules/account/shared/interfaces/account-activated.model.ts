import { AccountModel } from './account.model';
export interface AccountActivated extends AccountModel {
  activated: boolean;
  login: string;
}

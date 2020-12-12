import {
  selectAccountToEdit,
  updateAccount,
} from './../shared/store/account.actions';
import { AccountService } from './../shared/services/account.service';
import { AccountModel } from './../shared/interfaces/account.model';

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import {
  takeUntil,
  filter,
  take,
  switchMap,
  tap,
} from 'rxjs/internal/operators';

import { fuseAnimations } from '@fuse/animations';
import { Store, select } from '@ngrx/store';
import {
  createAccount,
  clearAccount,
} from 'app/modules/account/shared/store/account.actions';
import {
  selectCreateAccountStatus,
  selectCurrentAccountToEdit,
} from 'app/modules/account/shared/store/account.selectors';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AccountRegisterComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  loading: boolean;
  pageType: string;
  account: AccountModel;
  subscription = new Subscription();

  private id: string;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private accountStore: Store<{ account: Account }>,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.whichPageMode();
    this.initForm();
    this.initState();

    this.initStateEdit();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public saveAccount(): void {
    const account = {
      ...this.accountForm.value,
      id: this.id,
      authorities: ['ROLE_USER'],
    };
    this.accountStore.dispatch(updateAccount({ account }));
  }
  public addAccount(): void {
    this.accountStore.dispatch(
      createAccount({ account: this.accountForm.value })
    );
  }

  private initForm(): void {
    this.accountForm = this._formBuilder.group({
      login: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });
  }

  private initState(): void {
    this.accountStore
      .pipe(
        select(selectCreateAccountStatus),
        takeUntil(this.onDestroy$),
        filter((status) => !!status),
        tap((status) => {
          this.loading = status;
          if (status) {
            this.accountStore.dispatch(clearAccount());
            this.router.navigate(['/app/account/accounts']);
          }
        })
      )
      .subscribe();
  }

  private initStateEdit() {
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      this.accountStore.dispatch(
        selectAccountToEdit({ selectedAccountIdToEdit: this.id })
      );

      this.accountStore
        .pipe(
          select(selectCurrentAccountToEdit),
          takeUntil(this.onDestroy$),
          tap((account: AccountModel) => {
            this.account = account;
            this.accountForm = this._formBuilder.group({
              login: [this.account.login, Validators.required],
              firstName: [this.account.firstName, Validators.required],
              email: [
                this.account.email,
                [Validators.required, Validators.email],
              ],
              password: ['', Validators.required],
              passwordConfirm: [
                '',
                [Validators.required, confirmPasswordValidator],
              ],
            });
          })
        )
        .subscribe();
    }
  }

  private whichPageMode(): string {
    return (this.pageType = this.route.snapshot.params.id ? 'edit' : 'new');
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

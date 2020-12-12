import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  changePasswordAccount,
  clearAccount,
} from '../shared/store/account.actions';
import { AccountChangePassword } from '../shared/interfaces/account-change-password.model';
import { Observable, Subject } from 'rxjs';
import {
  selectAccountIsLoading,
  selectChangePasswordStatus,
} from '../shared/store/account.selectors';
import { filter, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'account-change-password',
  templateUrl: './account-change-password.component.html',
  styleUrls: ['./account-change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountChangePasswordComponent implements OnDestroy {
  accountPasswordForm: FormGroup;
  loading$: Observable<boolean>;
  changePasswordStatus$: Observable<boolean>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public matDialogRef: MatDialogRef<AccountChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private accountStore: Store<{ accounts }>
  ) {
    this.accountPasswordForm = this.createAccountPasswordForm();
    this.loading$ = this.accountStore.pipe(select(selectAccountIsLoading));
    this.changePasswordStatus$ = this.accountStore.pipe(
      select(selectChangePasswordStatus)
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  createAccountPasswordForm(): FormGroup {
    return this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  changePasswordHandler() {
    const payload: AccountChangePassword = this.accountPasswordForm.value;

    this.accountStore.dispatch(
      changePasswordAccount({ accountChangePassword: payload })
    );

    this.changePasswordStatus$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((status) => status),
        tap(() => {
          this.accountStore.dispatch(clearAccount());
          this.matDialogRef.close();
        })
      )
      .subscribe();
  }
}

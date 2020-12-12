import { AccountService } from './../shared/services/account.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Store, select } from '@ngrx/store';
import {
  getAccounts,
  createAccount,
  deleteAccount,
  activateAccount,
} from '../shared/store/account.actions';
import { Observable, Subscription, Subject } from 'rxjs';
import { AccountModel } from '../shared/interfaces/account.model';
import { ComponentEvent } from 'app/core/abstract-clasess/component-event-handler/component-event';
import { AccountAction } from '../shared/enums/account-action.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectAccountsLoading,
  selectAllAccountItems,
  selectCurrentAccount,
} from '../shared/store/account.selectors';
import { RolesService } from 'app/core/services/roles.service';
import { filter, pluck, tap, takeUntil } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class AccountListComponent implements OnInit, OnDestroy {
  tableDisplayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'activated',
    'action',
  ];
  accounts$: Observable<AccountModel[]>;
  loading$: Observable<boolean>;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  roles: string[];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private accountStore: Store<{ accounts: AccountModel[] }>,
    private rolesService: RolesService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accountService.onEvent
      .pipe(
        takeUntil(this.onDestroy$),
        tap((event) => {
          this.childComponentsActionReducer(event);
        })
      )
      .subscribe();

    this.initStore();
    this.verifyRoles();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private initStore(): void {
    this.accountStore.dispatch(getAccounts());
    this.loading$ = this.accountStore.pipe(select(selectAccountsLoading));
    this.accounts$ = this.accountStore.pipe(select(selectAllAccountItems));
  }

  private verifyRoles(): void {
    this.accountStore
      .pipe(
        select(selectCurrentAccount),
        takeUntil(this.onDestroy$),
        filter((item) => !!item),
        pluck('authorities'),
        tap((roles: string[]) => {
          this.roles = roles;
          this.rolesService.update(roles);
        })
      )
      .subscribe();
  }

  private deleteAccount(account): void {
    const id = account.data.id;
    const login = account.data.login;

    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });

    this.confirmDialogRef.componentInstance.confirmMessage =
      'Tem certeza que deseja deletar?';

    this.confirmDialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.accountStore.dispatch(
            deleteAccount({
              id,
              login,
            })
          );
        }
        this.confirmDialogRef = null;
      });
  }

  private activateAccount({ data }): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false,
    });
    const value: string = data.activated ? 'ativar' : 'desativar';
    this.confirmDialogRef.componentInstance.confirmMessage = `Tem certeza que deseja ${value} esta conta? `;

    this.confirmDialogRef
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result) => {
        if (result) {
          this.accountStore.dispatch(activateAccount({ account: data }));
        }
        this.confirmDialogRef = null;
      });
  }

  private childComponentsActionReducer(
    event: ComponentEvent<AccountAction, AccountModel>
  ) {
    switch (event.action) {
      case AccountAction.DETAIL:
        this.router.navigate(['../', event.data.id], {
          relativeTo: this.activatedRoute,
        });
        break;
      case AccountAction.DELETE:
        this.deleteAccount(event);
        break;

      case AccountAction.ACTIVATE:
        this.activateAccount(event);
        break;
      default:
        break;
    }
  }
}

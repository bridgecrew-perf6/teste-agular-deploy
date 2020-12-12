import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil, filter, pluck, tap } from 'rxjs/operators';

import { FuseNavigationItem } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Store, select } from '@ngrx/store';
import { selectCurrentAccount } from 'app/modules/account/shared/store/account.selectors';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'fuse-nav-vertical-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class FuseNavVerticalGroupComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  classes = 'nav-group nav-item';

  @Input()
  item: FuseNavigationItem;

  // Private
  // tslint:disable-next-line: variable-name
  private _unsubscribeAll: Subject<any>;
  isAdmin = false;

  constructor(
    // tslint:disable-next-line: variable-name
    private _changeDetectorRef: ChangeDetectorRef,
    // tslint:disable-next-line: variable-name
    private _fuseNavigationService: FuseNavigationService,
    private accountStore: Store<{ account: Account }>
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.accountStore
      .pipe(
        select(selectCurrentAccount),
        filter((item) => !!item),
        pluck('authorities'),
        tap((roles: string[]) => {
          this.isAdmin = roles.some((role) => role === 'ROLE_ADMIN');
        }),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
    // Subscribe to navigation item
    merge(
      this._fuseNavigationService.onNavigationItemAdded,
      this._fuseNavigationService.onNavigationItemUpdated,
      this._fuseNavigationService.onNavigationItemRemoved
    )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

import { fuseAnimations } from '@fuse/animations';
import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountModel } from '../shared/interfaces/account.model';
import { AccountService } from '../shared/services/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableEventHandler } from 'app/core/abstract-clasess/table-event/table-event-handler';
import { AccountAction } from '../shared/enums/account-action.enum';
import { AccountActivated } from '../shared/interfaces/account-activated.model';

@Component({
  selector: 'app-account-list-table',
  templateUrl: './account-list-table.component.html',
  styleUrls: ['./account-list-table.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class AccountListTableComponent extends TableEventHandler
  implements AfterViewInit, OnDestroy {
  @Input() displayedColumns: string[];
  @Input() data: AccountModel[];
  @Input() roles: string[];

  subscription = new Subscription();

  constructor(private accountService: AccountService) {
    super();
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.onTableEvent.subscribe(({ action, data }) => {
        this.accountService.dispatchAction({
          action,
          data,
        });
      })
    );

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginatorRef.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  activatedHandler({ activated, login }: AccountModel): void {
    const account: AccountActivated = {
      login,
      activated: !activated,
    };
    this.accountService.dispatchAction({
      action: AccountAction.ACTIVATE,
      data: account,
    });
  }
}

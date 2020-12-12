import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseWidgetModule } from '@fuse/components';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';
import { LetterAvatarModule } from 'app/core/modules/letter-avatar/letter-avatar.module';
import { AccountLeftMenuComponent } from './account-left-menu/account-left-menu.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatInputModule } from '@angular/material/input';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountListTableComponent } from './account-list-table/account-list-table.component';
import { PaginatorModule } from 'app/core/modules/paginator/paginator.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { SpinnerModule } from 'app/core/modules/spinner/spinner.module';
import { CustomDirectivesModule } from 'app/core/directives/custom-directives.module';
import { MatRippleModule } from '@angular/material/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AccountMenuComponent,
    AccountComponent,
    AccountLeftMenuComponent,
    AccountRegisterComponent,
    AccountListComponent,
    AccountListTableComponent,
    AccountChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,

    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FlexModule,
    RouterModule,
    LetterAvatarModule,
    MatTabsModule,
    FuseSharedModule,
    FuseWidgetModule,
    PaginatorModule,
    MatTableModule,
    MatSortModule,
    SpinnerModule,
    CustomDirectivesModule,
    MatRippleModule,
    PerfectScrollbarModule,
    MatDialogModule,
  ],
  exports: [AccountMenuComponent, AccountLeftMenuComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class AccountModule {}

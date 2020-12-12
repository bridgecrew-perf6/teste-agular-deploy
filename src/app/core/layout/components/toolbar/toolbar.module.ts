import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSearchBarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ToolbarComponent } from './toolbar.component';
import { AccountModule } from 'app/modules/account/account.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    AccountModule,
    FuseSharedModule,
    FuseSearchBarModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}

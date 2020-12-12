import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './app-shell.component';
import { AppShellRoutes } from './app-shell.routing';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';

import {
  FuseProgressBarModule,
  FuseSidebarModule,
  FuseThemeOptionsModule,
} from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { LayoutModule } from 'app/core/layout/layout.module';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    AppShellRoutes,
    FlexLayoutModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatMomentDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule,
    FuseSharedModule,
    LayoutModule,
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
  ],
})
export class AppShellModule {}

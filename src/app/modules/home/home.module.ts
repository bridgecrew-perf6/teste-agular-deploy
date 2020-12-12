import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { CustomDirectivesModule } from 'app/core/directives/custom-directives.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FuseSharedModule,
    CustomDirectivesModule,
    RouterModule,
    FuseSharedModule,
    MatButtonModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}

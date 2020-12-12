import { NgModule } from '@angular/core';

import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { CommonModule } from '@angular/common';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [AuthLoginComponent, ActivateComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseSharedModule,
    ForgotPasswordModule,
  ],
})
export class AuthModule {}

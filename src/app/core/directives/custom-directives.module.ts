import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HasRoleDirective } from './app-has-role.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HasRoleDirective],
  exports: [HasRoleDirective],
})
export class CustomDirectivesModule {}

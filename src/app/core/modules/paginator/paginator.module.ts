import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  imports: [CommonModule, MatPaginatorModule],
  declarations: [PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}

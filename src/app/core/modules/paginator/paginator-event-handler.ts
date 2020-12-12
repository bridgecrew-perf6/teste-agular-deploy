import { Input, ViewChild } from '@angular/core';
import { PaginatorComponent } from './paginator.component';

export abstract class PaginatorEventHandler {
  @ViewChild('paginator', { static: false }) paginatorRef: PaginatorComponent;
  mPaginatorLength: number;

  @Input() set paginatorLength(length: number) {
    this.mPaginatorLength = length;
  }
}

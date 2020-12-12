import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Input, ViewChild, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { TableEvent } from './table-event.enum';

import { PaginatorEventHandler } from '../../modules/paginator/paginator-event-handler';
import { MatTableDataSource } from '@angular/material/table';

export class TableEventHandler extends PaginatorEventHandler
  implements OnDestroy {
  lastSort: Partial<MatSort> = {};
  constructor() {
    super();
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() dataSource = new MatTableDataSource<any>([]);

  selection = new SelectionModel<any>(true, []);

  private tableEventEmmiter: Subject<{
    action: TableEvent;
    data: any;
  }> = new Subject();
  onTableEvent: Observable<{
    action: any;
    data: any;
  }> = this.tableEventEmmiter.asObservable();

  isMenuOpen: boolean;

  subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.changeTableEvent({
      action: TableEvent.CHECKBOX,
      data: this.selection.selected.map(({ id }) => id),
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  getChecked() {
    setTimeout(() => {
      this.changeTableEvent({
        action: TableEvent.CHECKBOX,
        data: this.selection.selected.map(({ id }) => id),
      });
    });
  }

  stopPropagation(event: Event) {
    this.isMenuOpen = true;
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  changeTableEvent(event: { action: any; data: any }) {
    this.tableEventEmmiter.next(event);
  }

  gotoDetail(item: any, event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.changeTableEvent({ action: TableEvent.DETAIL, data: item });
  }

  deleteItemHandler(item: any, event: Event) {
    this.changeTableEvent({ action: TableEvent.DELETE, data: item });
  }

  sortData(sort: MatSort): void {
    this.sort = sort;
  }
}

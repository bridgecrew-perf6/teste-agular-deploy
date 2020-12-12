import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalConfig } from 'app/shared/enums/global-config.enum';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  paginatorConfig: MatPaginator = {} as any;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @Input('paginatorLength') set paginatorLength(length: number) {
    this.paginatorConfig.length = length;
  }
  constructor() {}

  ngOnInit() {
    this.paginatorConfig.pageSize = GlobalConfig.DEFAUL_TOTAL_ITEMS_PER_PAGE;
    this.paginatorConfig.pageSizeOptions = [10, 25, 50];
  }
}

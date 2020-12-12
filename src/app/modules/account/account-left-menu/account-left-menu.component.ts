import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-left-menu',
  templateUrl: './account-left-menu.component.html',
  styleUrls: ['./account-left-menu.component.scss'],
})
export class AccountLeftMenuComponent implements OnInit {
  @Input() user$: Observable<Account>;
  @Input() fuseConfig;
  constructor() {}

  ngOnInit(): void {}
}

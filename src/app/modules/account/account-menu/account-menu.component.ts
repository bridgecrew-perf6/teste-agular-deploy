import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { AuthJWTService } from 'app/core/modules/auth/shared/services/auth-jwt.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountChangePasswordComponent } from '../account-change-password/account-change-password.component';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {
  @Input() user$: Observable<Account>;
  dialogRef: any;

  constructor(
    private authJWTService: AuthJWTService,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  changePasswordHandler() {
    this.dialogRef = this.matDialog.open(AccountChangePasswordComponent, {
      panelClass: 'account-form-dialog',
      data: {
        account: this.user$,
        action: 'change-password',
      },
    });
  }

  logoutHandler() {
    this.authJWTService.logout().subscribe();
  }
}

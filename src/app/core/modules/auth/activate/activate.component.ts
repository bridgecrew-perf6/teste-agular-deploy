import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  OnDestroy,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { DOCUMENT } from '@angular/common';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { activateAccount } from 'app/modules/account/shared/store/account.actions';
import { AuthJWTService } from '../shared/services/auth-jwt.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ActivateComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<any>();

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private route: ActivatedRoute,
    private accountStore: Store<{ account: Account }>,
    private authJWTService: AuthJWTService
  ) {
    // Configure the layout
    this._fuseSplashScreenService.hide();
    this.document.body.classList.add('theme-default');
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        toolbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        sidepanel: {
          hidden: true,
        },
      },
    };
  }

  ngOnInit(): void {
    this.getKeyToActivateAccount();
  }

  private getKeyToActivateAccount() {
    // this.route.queryParams
    //   .pipe(takeUntil(this._destroyed$), pluck('key'))
    //   .subscribe((key) => {
    //     this.accountStore.dispatch(activateAccount({ key }));
    //   });
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthJWTService } from '../shared/services/auth-jwt.service';
import { AuthModel } from '../shared/interfaces/auth.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private authJWTService: AuthJWTService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.document.body.classList.add('theme-default');

    // Configure the layout
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
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  loginHandler() {
    const credentials: AuthModel = {
      ...this.loginForm.value,
    };

    this.authJWTService.login(credentials).subscribe(() => {
      this.router.navigate(['/app/home'], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}

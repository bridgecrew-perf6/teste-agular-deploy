import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RolesService } from '../services/roles.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole: string;
  stop$ = new Subject();
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.rolesService.roles$
      .pipe(takeUntil(this.stop$))
      .subscribe((roles: string[]) => {
        if (!roles) {
          this.viewContainerRef.clear();
        }

        if (roles && roles.includes(this.appHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}

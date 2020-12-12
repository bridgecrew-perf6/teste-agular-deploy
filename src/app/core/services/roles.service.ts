import { Injectable } from '@angular/core';

import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable()
export class RolesService {
  roles$ = new ReplaySubject<string[]>(1);
  roleUpdates$ = new BehaviorSubject(['basic']);

  constructor() {
    this.roleUpdates$
      .pipe(
        scan((acc, next) => {
          return next;
        }, [])
      )
      .subscribe(this.roles$);
  }

  update(roles: string[]): void {
    this.roleUpdates$.next(roles);
  }
}

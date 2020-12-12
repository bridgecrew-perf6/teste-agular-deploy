import { PathResolveService } from 'app/core/services/path-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    resolve: {
      path: PathResolveService,
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NotFoundRoutingModule {}

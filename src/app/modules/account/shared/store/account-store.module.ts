import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountStoreEffects } from './account.effect';
import { reducer } from './account.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('account', reducer),
    EffectsModule.forFeature([AccountStoreEffects]),
  ],
})
export class AccountStoreModule {}

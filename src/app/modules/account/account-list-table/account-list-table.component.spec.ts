import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListTableComponent } from './account-list-table.component';

describe('AccountListTableComponent', () => {
  let component: AccountListTableComponent;
  let fixture: ComponentFixture<AccountListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountListTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLeftMenuComponent } from './account-left-menu.component';

describe('AccountLeftMenuComponent', () => {
  let component: AccountLeftMenuComponent;
  let fixture: ComponentFixture<AccountLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLeftMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

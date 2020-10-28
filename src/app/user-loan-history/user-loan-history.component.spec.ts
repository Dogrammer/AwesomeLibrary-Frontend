import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoanHistoryComponent } from './user-loan-history.component';

describe('UserLoanHistoryComponent', () => {
  let component: UserLoanHistoryComponent;
  let fixture: ComponentFixture<UserLoanHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

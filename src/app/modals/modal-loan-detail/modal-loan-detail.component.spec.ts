import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoanDetailComponent } from './modal-loan-detail.component';

describe('ModalLoanDetailComponent', () => {
  let component: ModalLoanDetailComponent;
  let fixture: ComponentFixture<ModalLoanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

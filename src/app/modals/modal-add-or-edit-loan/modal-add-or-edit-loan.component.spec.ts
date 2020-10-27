import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrEditLoanComponent } from './modal-add-or-edit-loan.component';

describe('ModalAddOrEditLoanComponent', () => {
  let component: ModalAddOrEditLoanComponent;
  let fixture: ComponentFixture<ModalAddOrEditLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddOrEditLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOrEditLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

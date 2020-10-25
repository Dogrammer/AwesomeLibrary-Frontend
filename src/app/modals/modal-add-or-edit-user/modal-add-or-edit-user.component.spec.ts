import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOrEditUserComponent } from './modal-add-or-edit-user.component';

describe('ModalAddOrEditUserComponent', () => {
  let component: ModalAddOrEditUserComponent;
  let fixture: ComponentFixture<ModalAddOrEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddOrEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOrEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

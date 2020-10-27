import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReturnBooksComponent } from './modal-return-books.component';

describe('ModalReturnBooksComponent', () => {
  let component: ModalReturnBooksComponent;
  let fixture: ComponentFixture<ModalReturnBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReturnBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReturnBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

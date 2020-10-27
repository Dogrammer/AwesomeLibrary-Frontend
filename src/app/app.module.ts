import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { LoanComponent } from './loan/loan.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddOrEditUserComponent } from './modals/modal-add-or-edit-user/modal-add-or-edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalAddOrEditLoanComponent } from './modals/modal-add-or-edit-loan/modal-add-or-edit-loan.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalReturnBooksComponent } from './modals/modal-return-books/modal-return-books.component';
// import { PaginationModule } from 'ngx-bootstrap/pagination/';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoanComponent,
    ModalAddOrEditUserComponent,
    ConfirmationModalComponent,
    ModalAddOrEditLoanComponent,
    ModalReturnBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    // PaginationModule.forRoot(),

    MatIconModule,
  ],
  entryComponents: [
    ModalAddOrEditUserComponent,
    ModalAddOrEditLoanComponent,
    ConfirmationModalComponent,
    ModalReturnBooksComponent
    
],
  // exports: [PaginationModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

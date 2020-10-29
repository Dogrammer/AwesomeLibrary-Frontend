import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Pagination } from '../helpers/pagination';
import { ModalLoanDetailComponent } from '../modals/modal-loan-detail/modal-loan-detail.component';
import { ModalReturnBooksComponent } from '../modals/modal-return-books/modal-return-books.component';
import { ILoan } from '../models/loan';
import { HistoryService } from '../services/history.service';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-user-loan-history',
  templateUrl: './user-loan-history.component.html',
  styleUrls: ['./user-loan-history.component.scss']
})
export class UserLoanHistoryComponent implements OnInit {

  id: number;

  loans: ILoan[] = [];
  pagination: Pagination;
  loadingIndicator = true;
  reorderable = true;

  constructor(
    private ngbModalService: NgbModal,
    private historyService: HistoryService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private loanService: LoanService,
    private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getLoansForUser();
  }

  returnLoan(id, books) {
    const modalRef = this.ngbModalService.open(ModalReturnBooksComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.books = books
    modalRef.componentInstance.title = 'Return books';
    modalRef.componentInstance.description = 'Wanna return books?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        this.loanService.returnLoan(id).pipe(take(1)).subscribe(data => {
        this.toastr.info('Books returned', 'Success', toastrVar);
          this.getLoansForUser();
        })
      } else {
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  openLoanDetailModal(books) {
    const modalRef = this.ngbModalService.open(ModalLoanDetailComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.books = books
    modalRef.componentInstance.title = 'Details';
    modalRef.componentInstance.description = 'Books';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
      } else {
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  getLoansForUser() {
    this.historyService.getLoansForUser(this.id).subscribe(
      data => {
        this.loans = data;
      }
    )
  }
}

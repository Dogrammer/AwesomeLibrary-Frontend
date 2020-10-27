import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Pagination } from '../helpers/pagination';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { ModalAddOrEditLoanComponent } from '../modals/modal-add-or-edit-loan/modal-add-or-edit-loan.component';
import { ModalReturnBooksComponent } from '../modals/modal-return-books/modal-return-books.component';
import { ILoan } from '../models/loan';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  loans: ILoan[] = [];
  pagination: Pagination;
  // userParams:  UserParams = new UserParams;
  loadingIndicator = true;
  reorderable = true;

  userGroup: FormGroup = this.formBuilder.group({
    userId: [null],
  });

  constructor(
    private ngbModalService: NgbModal,
    private loanService: LoanService, 
    private formBuilder: FormBuilder
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              // private toastr: ToastrService,
              ) { }

  ngOnInit(): void {
    this.getLoans();
  }

  getLoans() {
    // this.userService.getUsersPagination(this.userParams, this.userGroup.value).subscribe(
      
    //   data => {
    //      this.users = data.result;
    //      this.pagination = data.pagination;
    //     //  this.spinnerService.hide();
    //     })
    this.loanService.getLoans().subscribe(
      data => {
        this.loans = data;
      }
    )
  }

  // navigateToDetails(id) {
  //   this.router.navigate(['/admin/apartment-group/', id]);
  // }

  deleteLoan(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Delete user';
    modalRef.componentInstance.description = 'Želite li izbrisati korisnika?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.loanService.deleteLoan(id).pipe(take(1)).subscribe(data => {
          // this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
          this.getLoans();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
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
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.loanService.returnLoan(id).pipe(take(1)).subscribe(data => {
          // this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
          this.getLoans();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  
  openLoanModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAddOrEditLoanComponent, {size: 'lg', backdrop: 'static', keyboard: false});
    if(row) {
      console.log('openmodal',row);
      
      modalRef.componentInstance.row = row;
      if(isDelete) {
        modalRef.componentInstance.title = `Brisanje korisnika - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Izmjena korisnika';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Make a loan';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getLoans();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getLoans();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getLoans();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

  // pageChanged(event: any){
  //   this.userParams.pageNumber = event.page;
  //   this.getUsers();
  // }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Pagination } from '../helpers/pagination';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { ModalAddOrEditLoanComponent } from '../modals/modal-add-or-edit-loan/modal-add-or-edit-loan.component';
import { ModalReturnBooksComponent } from '../modals/modal-return-books/modal-return-books.component';
import { ILoan } from '../models/loan';
import { LoanParams } from '../models/loanParams';
import { IUser } from '../models/user';
import { LoanService } from '../services/loan.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  
  users: IUser[] = [];
  loans: ILoan[] = [];
  pagination: Pagination;
  loanParams:  LoanParams = new LoanParams;
  loadingIndicator = true;
  reorderable = true;

  loanGroup: FormGroup = this.formBuilder.group({
    userId: [null],
  });

  constructor(
    private ngbModalService: NgbModal,
    private loanService: LoanService, 
    private userService: UserService,
    private formBuilder: FormBuilder
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              // private toastr: ToastrService,
              ) {
                this.loanParams = this.loanService.getLoanParams();
               }

  ngOnInit(): void {
    this.getUsers();
    this.getLoans();
  }

  getLoans() {
    this.loanService.getLoansPagination(this.loanParams, this.loanGroup.value).subscribe(
      data => {
        
         this.loans = data.result;
         this.pagination = data.pagination;
        //  this.spinnerService.hide();
        })
    // this.userService.getUsersPagination(this.userParams, this.userGroup.value).subscribe(
      
    //   data => {
    //      this.users = data.result;
    //      this.pagination = data.pagination;
    //     //  this.spinnerService.hide();
    //     })
    // this.loanService.getLoans().subscribe(
    //   data => {
    //     this.loans = data;
    //   }
    // )
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

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; })
      }
    )
  }

  pageChanged(event: any){
    this.loanParams.pageNumber = event.page;
    this.getLoans();
  }

  resetFilters() {
    // this.apartmentGroupParams = new ApartmentGroupParams;
    // this.getApartmentGroups();
    this.loanGroup.reset();
    // this.getApartmentGroups();
  }

}

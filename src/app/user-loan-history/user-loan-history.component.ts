import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  // orderByValues: any[] = [];
  // userParams:  UserParams = new UserParams();
  loadingIndicator = true;
  reorderable = true;

  // userGroup: FormGroup = this.formBuilder.group({
  //   orderBy: [null],
  // });

  

  constructor(
    private ngbModalService: NgbModal,
    // private router: Router,
    private historyService: HistoryService, 
    private activatedRoute: ActivatedRoute,
    private loanService: LoanService,
    private formBuilder: FormBuilder
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              // private toastr: ToastrService,
              ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getLoansForUser();


    // this.orderByValues = [
    //   {
    //     name: 'Last name ascending',
    //     value: 'lastname_asc'
    //   },
    //   {
    //     name: 'Overdue descending',
    //     value: 'overdue_desc'
    //   }
    // ];
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
          this.getLoansForUser();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
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
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        // this.loanService.returnLoan(id).pipe(take(1)).subscribe(data => {
        //   // this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
        //   this.getLoansForUser();
        // })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  getLoansForUser() {
    // console.log('paramsloggetusers', this.userParams);

    // this.historyService.getLoansForUser(this.userParams, this.userGroup.value).subscribe(
    //   data => {
        
    //      this.users = data.result;
    //      this.pagination = data.pagination;
    //     //  this.spinnerService.hide();
    //     })
    this.historyService.getLoansForUser(this.id).subscribe(
      data => {
        this.loans = data;
      }
    )
  }

  // sortby() {
  //   this.getUsers();
    
  // }

  // navigateToDetails(id) {
  //   this.router.navigate(['users/', id, 'loan-history']);
  // }

  // deleteUser(id) {
  //   const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

  //   modalRef.componentInstance.title = 'Delete user';
  //   modalRef.componentInstance.description = 'Želite li izbrisati korisnika?';
  //   modalRef.result.then(result => {
  //     if (result == true) {
  //       let toastrVar = {
  //         progressBar: true,
  //         timeOut: 7500
  //       }
  //       console.log('id delete',id);
  //       // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
  //       // this.isLoadingApproval = true;
  //       this.userService.deleteUser(id).pipe(take(1)).subscribe(data => {
  //         // this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
  //         this.getUsers();
  //       })
  //     } else {
  //       // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
  //     }
  //     // u slucaju da trebamo neki handle
  //   }).catch((res) => { });
  // }

  
  // openAddUserModal(row?, isDelete?) {
  //   const modalRef = this.ngbModalService.open(ModalAddOrEditUserComponent, {size: 'lg', backdrop: 'static', keyboard: false});
  //   if(row) {
  //     console.log('openmodal',row);
      
  //     modalRef.componentInstance.row = row;
  //     if(isDelete) {
  //       modalRef.componentInstance.title = `Brisanje korisnika - ${row.name}`;
  //       modalRef.componentInstance.action = 'delete';
  //     } else {
  //       modalRef.componentInstance.title = 'Izmjena korisnika';
  //       modalRef.componentInstance.action = 'edit';
  //     }
  //   } else {
  //     modalRef.componentInstance.title = 'Dodaj korisnika';
  //     modalRef.componentInstance.action = 'add';
  //   }
  //   modalRef.result.then(result => {
  //     let toastrVar = {
  //       progressBar: true,
  //       timeOut: 7500
  //     }
  //     if (result == 'add') {
  //       // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
  //       this.getUsers();
  //     } else if(result == 'edit') {
  //       // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
  //       this.getUsers();
  //     } else if(result == 'delete') {
  //       // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
  //       this.getUsers();
  //     }
  //     setTimeout(() => {  
  //     // this.filterProgrammeType();
  //   }, 200)
  //   }).catch((res) => {});
  // }

  // pageChanged(event: any){
  //   this.userParams.pageNumber = event.page;
  //   // this.getUsers();
  // }

}

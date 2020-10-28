import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Pagination } from '../helpers/pagination';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { ModalAddOrEditUserComponent } from '../modals/modal-add-or-edit-user/modal-add-or-edit-user.component';
import { ModalContactsComponent } from '../modals/modal-contacts/modal-contacts.component';
import { IUser } from '../models/user';
import { UserParams } from '../models/userParams';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];
  pagination: Pagination;
  userParams:  UserParams = new UserParams;
  orderByValues: any[] = [];
  loadingIndicator = true;
  reorderable = true;

  userGroup: FormGroup = this.formBuilder.group({
    orderBy: ['lastname_asc'],
  });

  

  constructor(
    private ngbModalService: NgbModal,
    private router: Router,
    private userService: UserService, 
    private formBuilder: FormBuilder,
              // public dialog: MatDialog,
              // private toastr: ToastrService,
              // private toastr: ToastrService,
              ) 
              { 
    this.userParams = this.userService.getUserParams();
    console.log(this.userParams);
    

              }

  ngOnInit(): void {
    this.getUsers();

    this.orderByValues = [
      {
        name: 'Last name ascending',
        value: 'lastname_asc'
      },
      {
        name: 'Overdue descending',
        value: 'overdue_desc'
      }
    ];
  }

  getUsers() {
    // console.log('paramsloggetusers', this.userParams);

    this.userService.getUsersPagination(this.userParams, this.userGroup.value).subscribe(
      data => {
        
         this.users = data.result;
         this.pagination = data.pagination;
        //  this.spinnerService.hide();
        })
    // this.userService.getUsers().subscribe(
    //   data => {
    //     this.users = data;
    //   }
    // )
  }

  sortby() {
    this.getUsers();
    
  }

  navigateToDetails(id) {
    this.router.navigate(['users/', id, 'loan-history']);
  }

  deleteUser(id) {
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
        this.userService.deleteUser(id).pipe(take(1)).subscribe(data => {
          // this.toastr.info('Izbrisali ste korisnika', 'Uspjeh');
          this.getUsers();
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  openContactModal(contacts) {
    const modalRef = this.ngbModalService.open(ModalContactsComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.contacts = contacts;
    modalRef.componentInstance.title = 'User contacts';
    // modalRef.componentInstance.description = '';
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

  
  openAddUserModal(row?, isDelete?) {
    const modalRef = this.ngbModalService.open(ModalAddOrEditUserComponent, {size: 'lg', backdrop: 'static', keyboard: false});
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
      modalRef.componentInstance.title = 'Dodaj korisnika';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        // this.toastrService.success('Dodali ste novu vrstu programa', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'edit') {
        // this.toastrService.success('Uredili ste vrstu programa', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'delete') {
        // this.toastrService.warning('Izbrisali ste vrstu programa', 'Pažnja', toastrVar);
        this.getUsers();
      }
      setTimeout(() => {  
      // this.filterProgrammeType();
    }, 200)
    }).catch((res) => {});
  }

  pageChanged(event: any){
    console.log(this.userParams);
    
    this.userParams.pageNumber = event.page;
    this.getUsers();
  }

}

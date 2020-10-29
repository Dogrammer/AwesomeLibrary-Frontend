import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    searchLastName: ['']
  });

  

  constructor(
    private ngbModalService: NgbModal,
    private router: Router,
    private userService: UserService, 
    private toastr: ToastrService,
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
    this.userService.getUsersPagination(this.userParams, this.userGroup.value).subscribe(
      data => {
        
         this.users = data.result;
         this.pagination = data.pagination;
        })
  }

  search() {
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
        this.userService.deleteUser(id).pipe(take(1)).subscribe(data => {
          this.toastr.info('User deleted', 'Uspjeh');
          this.getUsers();
        })
      } else {
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  openContactModal(contacts) {
    const modalRef = this.ngbModalService.open(ModalContactsComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.contacts = contacts;
    modalRef.componentInstance.title = 'User contacts';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        
        // })
      } else {
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
        modalRef.componentInstance.title = `Delete user - ${row.name}`;
        modalRef.componentInstance.action = 'delete';
      } else {
        modalRef.componentInstance.title = 'Edit user';
        modalRef.componentInstance.action = 'edit';
      }
    } else {
      modalRef.componentInstance.title = 'Add User';
      modalRef.componentInstance.action = 'add';
    }
    modalRef.result.then(result => {
      let toastrVar = {
        progressBar: true,
        timeOut: 7500
      }
      if (result == 'add') {
        this.toastr.success('User added', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'edit') {
        this.toastr.success('User edited', 'Uspjeh', toastrVar);
        this.getUsers();
      } else if(result == 'delete') {
        this.getUsers();
      }
      setTimeout(() => {  
    }, 200)
    }).catch((res) => {});
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.getUsers();
  }

}

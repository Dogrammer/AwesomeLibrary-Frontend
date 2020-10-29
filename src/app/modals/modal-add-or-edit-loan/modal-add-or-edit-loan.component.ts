import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'protractor';
import { IBook } from 'src/app/models/book';
import { ILoanBookRequest } from 'src/app/models/loan-book-request';
import { IUser } from 'src/app/models/user';
import { BookService } from 'src/app/services/book.service';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-add-or-edit-loan',
  templateUrl: './modal-add-or-edit-loan.component.html',
  styleUrls: ['./modal-add-or-edit-loan.component.scss']
})
export class ModalAddOrEditLoanComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  users: IUser[] = [];
  books: IBook[] = [];
  loanBookRequests: ILoanBookRequest[] = [];
  isAdmin;
  loanGroup: FormGroup;
  
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    private loanService: LoanService,
  )
    
    {}

  ngOnInit() {
    this.getUsers();
    this.getBooks();
    this.loanGroup = this.formBuilder.group({
      userId: [null, Validators.required],
      dateLoaned: ['',Validators.required],
      dateDue: [Validators.required],
      loanBookRequests: this.formBuilder.array([
        this.addLoanBookRequestsForm()
      ])
    });
    
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; })
      }
    )
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => {
        this.books = data;
      }
    )
  }
    
  //upload
  submit(){
    console.log('forma :',this.loanGroup.value);

    if (this.row) {
      this.loanService.editLoan(this.row.id, this.loanGroup.value).subscribe(
        data => {
          this.modal.close('edit');
        }
      );

    }
    else {
      console.log(this.loanGroup.value);
      
      this.loanService.saveLoan(this.loanGroup.value).subscribe(
        data => {
          this.modal.close(data.response);
        }
      ), error => {
        // this.modal.close(error);
        console.log(error);
      }
    }
    
  }

  addLoanBookRequestsForm(): FormGroup {
    return this.formBuilder.group({
      bookId: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  addLoanBooks(): void {
    (<FormArray>this.loanGroup.get('loanBookRequests')).push(this.addLoanBookRequestsForm());
  }

  removeLoanBook(i: number) {
    (<FormArray>this.loanGroup.get('loanBookRequests')).removeAt(i);
 }

//  setExistingLoanBook(contacts: IContact[]) : FormArray { 
//   console.log('uso u existing', contacts);
  
//   const formArray = new FormArray([]);
//   contacts.forEach(d => {
//    formArray.push(this.formBuilder.group({
//       mobileNumber: d.mobileNumber,
//       phoneNumber: d.phoneNumber,
//       emailAddress: d.emailAddress,
//     }));
//   });
//   return formArray;
// }

  get loanBookControls() {
    return this.loanGroup.get('loanBookRequests')['controls'];
  }

  get userId(): AbstractControl {
    return this.loanGroup.get('userId');
  }

  get dateLoaned(): AbstractControl {
    return this.loanGroup.get('dateLoaned');
  }

  get dateDue(): AbstractControl {
    return this.loanGroup.get('dateDue');
  }

}

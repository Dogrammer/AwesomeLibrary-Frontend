import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  // userGroup: FormGroup = this.formBuilder.group({
  //   firstName: ['', Validators.required],
  //   lastName: [''],
  //   dateOfBirth: [],
  //   // file: [''],
  //   // fileSource: ['']
  //   // userName: ['', Validators.required]
  //   // isActive: [true],
  //   // activeFrom: [ new Date()],
  //   // activeTo: [this.tenYearsFromNow]
  // });
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private userService: UserService,
    private bookService: BookService,
    // private http: HttpClient,
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
    
    // this.checkIfAdmin();
    // this.getApartmentManagers();
    // if(this.row && this.action == 'edit') {
    //   this.loanBookRequests = this.row.contacts;
    //   this.userGroup.setControl('contacts', this.setExistingContacts(this.contacts))
      
    //   this.userGroup.patchValue({
    //     firstName: this.row.firstName,
    //     lastName: this.row.lastName,
    //     dateOfBirth: this.row.dateOfBirth,
    //     // contacts: this.row.contacts,
        
    //     // file: this.row.imageFilePath,
    //     // userName: this.row.user.userName
    //     // isActive: this.row.isActive,
    //     // activeFrom: this.row.activeFrom,
    //   });
    //   console.log(this.row);
    //   console.log('controle edit', this.userGroup.value);
      

      

    // }

    console.log(this.row);
    

    
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


  // getApartmentManagers() {
  //   this.authService.getApartmentManagers().subscribe(
  //     data => { this.users = data; console.log(this.users)}
  //   )
  // }

  // checkIfAdmin() {
  //   this.authService.checkIfAdmin().subscribe(
  //     data => { this.isAdmin = data; console.log(this.isAdmin)}
  //   )
  // }
  
  // saveApartmentGroup()  {
  //   if(!this.apartmentGroupGroup.valid) {
  //     return;
  //   } else {
  //     console.log('validna forma');
      
  //     this.apartmentGroupService.saveApartmentGroup(this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
  //       this.modal.close('add')
  //     });
  //   }
  // }

  // editApartmentGroup()  {
  //   if(!this.apartmentGroupGroup.valid) {
  //     return;
  //   } else {
  //     this.apartmentGroupService.editApartmentGroup(this.row.id, this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
  //       this.modal.close('add') 
  //     });
  //   }
  // }


  // upload
  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.apartmentGroupGroup.patchValue({
  //       fileSource: file
  //     });
  //   }
  // }
    
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
          this.modal.close('add');
        }
      )
    }

    
    // console.log('forma', this.apartmentGroupGroup.value);
    
    // const formData = new FormData();
    // formData.append('file', this.apartmentGroupGroup.get('fileSource').value);
    // formData.append('name', this.name.value);
    // formData.append('description', this.description.value);
    // formData.append('userId', this.userId.value);
    // console.log('formdata=', formData);
    

    // if(this.row && this.action == 'edit') {
    //   this.http.put('https://localhost:5001/api/ApartmentGroup/editApartmentGroup/' + this.row.id, formData).subscribe(
    //     data => {
    //       //toaster uploaded successfully
    //       this.modal.close('edit');
    //     }
    //   );
    // }

    // else {
    //   this.http.post('https://localhost:5001/api/ApartmentGroup/addApartmentGroup', formData).subscribe(
    //     data => {
    //       //toaster uploaded successfully
    //       this.modal.close('add');
    //     }
    //   );
    // }
    
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

  // get bookId(): AbstractControl {
  //   return this.loanGroup.get('bookId');
  // }

  get dateDue(): AbstractControl {
    return this.loanGroup.get('dateDue');
  }

  // get f(){
  //   return this.apartmentGroupGroup.controls;
  // }

  // get userName(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userName');
  // }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}

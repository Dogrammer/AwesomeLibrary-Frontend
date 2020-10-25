import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IContact } from 'src/app/models/contact';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-add-or-edit-user',
  templateUrl: './modal-add-or-edit-user.component.html',
  styleUrls: ['./modal-add-or-edit-user.component.scss']
})
export class ModalAddOrEditUserComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  users: any[] =[];
  contacts: IContact[] = [];
  isAdmin;
  userGroup: FormGroup;
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
    // private http: HttpClient,
    private userService: UserService,
  )
    
    {}

  ngOnInit() {

    this.userGroup = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dateOfBirth: [Validators.required],
      contacts: this.formBuilder.array([
        this.addContactForm()
      ])
    });
    
    // this.checkIfAdmin();
    // this.getApartmentManagers();
    if(this.row && this.action == 'edit') {
      this.contacts = this.row.contacts;
      this.userGroup.setControl('contacts', this.setExistingContacts(this.contacts))
      
      this.userGroup.patchValue({
        firstName: this.row.firstName,
        lastName: this.row.lastName,
        dateOfBirth: this.row.dateOfBirth,
        // contacts: this.row.contacts,
        
        // file: this.row.imageFilePath,
        // userName: this.row.user.userName
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
      console.log(this.row);
      console.log('controle edit', this.userGroup.value);
      

      

    }

    console.log(this.row);
    

    
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
    console.log('forma :',this.userGroup.value);

    if (this.row) {
      this.userService.editUser(this.row.id, this.userGroup.value).subscribe(
        data => {
          this.modal.close('add');
        }
      );

    }
    else {
      this.userService.saveUser(this.userGroup.value).subscribe(
        data => {
          this.modal.close('edit');
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

  

  addContactForm(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
    });
  }

  addContacts(): void {
    (<FormArray>this.userGroup.get('contacts')).push(this.addContactForm());
  }

  removeContact(i: number) {
    (<FormArray>this.userGroup.get('contacts')).removeAt(i);
 }

 setExistingContacts(contacts: IContact[]) : FormArray { 
  console.log('uso u existing', contacts);
  
  const formArray = new FormArray([]);
  contacts.forEach(d => {
   formArray.push(this.formBuilder.group({
      mobileNumber: d.mobileNumber,
      phoneNumber: d.phoneNumber,
      emailAddress: d.emailAddress,
    }));
  });
  return formArray;
}

  get contactControls() {
    return this.userGroup.get('contacts')['controls'];
  }

  get firstName(): AbstractControl {
    return this.userGroup.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userGroup.get('lastName');
  }

  get dateOfBirth(): AbstractControl {
    return this.userGroup.get('dateOfBirth');
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

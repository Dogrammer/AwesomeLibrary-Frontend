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
  disableButton
  contacts: IContact[] = [];
  isAdmin;
  userGroup: FormGroup;
  
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private userService: UserService,
  )
    
    {}

  ngOnInit() {

    this.userGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [],
      file: [''],
      fileSource: [''],
      contacts: this.formBuilder.array([
        this.addContactForm()
      ])
    });
    
    if(this.row && this.action == 'edit') {
      this.contacts = this.row.contacts;
      this.userGroup.setControl('contacts', this.setExistingContacts(this.contacts))
      
      this.userGroup.patchValue({
        firstName: this.row.firstName,
        lastName: this.row.lastName,
        dateOfBirth: this.row.dateOfBirth,
      });
    }
  }
    
  //upload
  submit(){
    this.modal.close();
    console.log('forma :',this.userGroup.value);

    if (this.row) {
      this.userService.editUser(this.row.id, this.userGroup.value).subscribe(
        data => {
          this.modal.close('edit');
        }
      );

    }
    else {
      
      const formData = new FormData();
      formData.append('file', this.userGroup.get('fileSource').value);
      formData.append('contacts', JSON.stringify(this.userGroup.value.contacts));
      console.log(formData);
      
      this.userService.saveUser(formData).subscribe(
        data => {
          this.modal.close('add');
        }
      )
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userGroup.patchValue({
        fileSource: file
      });
    }
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

  get f(){
    return this.userGroup.controls;
  }

}

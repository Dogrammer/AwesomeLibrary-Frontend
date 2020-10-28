import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-contacts',
  templateUrl: './modal-contacts.component.html',
  styleUrls: ['./modal-contacts.component.scss']
})
export class ModalContactsComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() contacts : any;
  
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.contacts);
    
  }

}

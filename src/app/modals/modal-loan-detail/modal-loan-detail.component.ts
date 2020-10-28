import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-loan-detail',
  templateUrl: './modal-loan-detail.component.html',
  styleUrls: ['./modal-loan-detail.component.scss']
})
export class ModalLoanDetailComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() books : any;
  
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.books);
    
  }

}

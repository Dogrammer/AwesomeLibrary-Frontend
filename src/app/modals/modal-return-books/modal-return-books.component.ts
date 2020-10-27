import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-return-books',
  templateUrl: './modal-return-books.component.html',
  styleUrls: ['./modal-return-books.component.scss']
})
export class ModalReturnBooksComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() books : any;
  
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}

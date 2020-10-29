import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  exports: [
    PaginationModule
    

  ]
})
export class SharedModule { }

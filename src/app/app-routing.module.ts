import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'loans', 
    component: LoanComponent
  },
  {
    path: 'users',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

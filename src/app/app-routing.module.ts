import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { UserLoanHistoryComponent } from './user-loan-history/user-loan-history.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'loans', 
    component: LoanComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/:id/loan-history',
    component: UserLoanHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

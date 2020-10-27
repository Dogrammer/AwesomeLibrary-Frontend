import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private readonly CONTROLLER = 'Loan';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(environment.apiUrl + this.CONTROLLER).pipe(
      map( data => {
        return data
      })
    );
  }

  deleteLoan(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLLER + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  saveLoan(loanData) {
    console.log(loanData);
    
    return this.http.post(environment.apiUrl + this.CONTROLLER + '/createLoan', loanData).pipe(
      map( data => {
        return data
      })
    );
  }

  editLoan(id, userData) {
    console.log('test');
    
    return this.http.put(environment.apiUrl + this.CONTROLLER + '/editLoan/' + id, userData).pipe(
      map( data => {
        return data
      })
    );
  }

  returnLoan(loanId) {
    console.log('test');
    
    return this.http.get(environment.apiUrl + this.CONTROLLER + '/returnLoan/' + loanId).pipe(
      map( data => {
        return data
      })
    );
  }
}

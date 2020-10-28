import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../helpers/pagination';
import { ILoan } from '../models/loan';
import { LoanParams } from '../models/loanParams';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private readonly CONTROLLER = 'Loan';

  loanParams: LoanParams = new LoanParams;

  constructor(private http: HttpClient) { }

  getLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(environment.apiUrl + this.CONTROLLER).pipe(
      map( data => {
        return data
      })
    );
  }
  getLoanParams() {
    return this.loanParams;
  }

  getLoansPagination(loanParams: LoanParams, filterData ) {
    
    // let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    let params = this.getPaginationHeaders(loanParams.pageNumber, loanParams.pageSize);

    
    
    if (filterData && filterData.userId) {
      params = params.append('userId', filterData.userId.toString());
    }

    return this.getPaginatedResults<ILoan[]>(environment.apiUrl + this.CONTROLLER , params);
  }

  private getPaginatedResults<T>(url, params) {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
      params = params.append('pageNumber', pageNumber.toString());
      params = params.append('pageSize', pageSize.toString());
    
    return params;
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

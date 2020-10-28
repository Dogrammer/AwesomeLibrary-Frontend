import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILoan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly CONTROLLER_BOOK = 'Book';
  private readonly CONTROLLER_LOAN = 'Loan';

  constructor(private http: HttpClient) { }

  getLoansForUser(userId: number): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(environment.apiUrl + this.CONTROLLER_LOAN + '/' +  userId).pipe(
      map( data => {
        return data
      })
    );
  }
}

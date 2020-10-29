import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LibraryResponse } from '../models/library-response';
import { ILoan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly CONTROLLER_BOOK = 'Book';
  private readonly CONTROLLER_LOAN = 'Loan';

  constructor(private http: HttpClient) { }

  getLoansForUser(userId: number): Observable<any[]> {
    return this.http.get<LibraryResponse<ILoan[]>>(environment.apiUrl + this.CONTROLLER_LOAN + '/' +  userId).pipe(
      map( data => {
        return data.response
      })
    );
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly CONTROLLER = 'Book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(environment.apiUrl + this.CONTROLLER).pipe(
      map( data => {
        return data
      })
    );
  }
}

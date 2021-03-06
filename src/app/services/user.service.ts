import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../helpers/pagination';
import { IUser } from '../models/user';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userParams: UserParams = new UserParams;

  constructor(private http: HttpClient) { }

  private readonly CONTROLLER = 'User';


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiUrl + this.CONTROLLER).pipe(
      map( data => {
        return data;
      })
    );
  }

  getUserParams() {
    return this.userParams;
  }

  getUsersPagination(userParams: UserParams, filterData ) {
    console.log('params', userParams);
    
    // let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    
    if (filterData && filterData.orderBy) {
      params = params.append('orderBy', filterData.orderBy.toString());
    }

    if (filterData && filterData.searchLastName.length > 0) {
      params = params.append('searchLastName', filterData.searchLastName);
    }

    return this.getPaginatedResults<IUser[]>(environment.apiUrl + this.CONTROLLER , params);
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

  deleteUser(id) {
    return this.http.delete(environment.apiUrl + this.CONTROLLER + '/' + id).pipe(
      map( data => {
        return data
      })
    );
  }

  saveUser(userData) {
    console.log(userData);
    
    return this.http.post(environment.apiUrl + this.CONTROLLER + '/users', userData).pipe(
      map( data => {
        return data
      })
    );
  }

  editUser(id, userData) {
    console.log('test');
    
    return this.http.put(environment.apiUrl + this.CONTROLLER + '/editUser/' + id, userData).pipe(
      map( data => {
        return data
      })
    );
  }
}

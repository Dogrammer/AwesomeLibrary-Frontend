import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly CONTROLLER = 'User';


  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiUrl + this.CONTROLLER).pipe(
      map( data => {
        return data
      })
    );
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



  // checkAvailability(checkAvailabilityData)  {
  //   console.log('usao', checkAvailabilityData);
    
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/checkAvailability', checkAvailabilityData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // getCurrentPricingPeriod(apartmentId): Observable<IPricingPeriodDetail> {
  //   return this.http.get<IPricingPeriodDetail>(environment.apiUrl + this.CONTROLER_NAME_PRICING_PERIOD + '/getCurrentPricingPeriod/' + apartmentId).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  // getPrice(priceData) {
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/getPrice', priceData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }

  

  // sendReservation(reservationData) {
  //   return this.http.post(environment.apiUrl + this.CONTROLER_NAME_RESERVATION + '/reservations/', reservationData).pipe(
  //     map( data => {
  //       return data
  //     })
  //   );
  // }
}

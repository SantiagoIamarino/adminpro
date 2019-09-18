import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICES_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { User } from '../../models/user.model';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( 
    public http: HttpClient,
    public _userService: UserService
  ) { }
  
  getHospitals(){

    const url = SERVICES_URL + '/hospital';

    return this.http.get(url);

  }

  getHospital( id: string ){

    const url = SERVICES_URL + '/hospital/' + id;

    return this.http.get(url);

  }

  deleteHospital( id:string ){

    let url = SERVICES_URL + '/hospital/' + id;
    url += '?token=' +  this._userService.token;

    return this.http.delete(url).pipe( map( res =>{
      
      swal('Hospital deleted', 'Hospital has been deleted correctly', 'success');

      return true;

    } ) );

  }

  newHospital( name: string ){

    const url = SERVICES_URL + '/hospital';

    const userId = this._userService.user._id;

    const body = {
      name: name,
      user: userId
    };

    return this.http.post(url, body);

  }

  findHospital(term: string){

    const url = SERVICES_URL + '/search/collection/hospital/' + term;

    return this.http.get(url);

  }

  updateHospital( hospital: Hospital, id: string ){

    let url = SERVICES_URL + '/hospital/' + id;
    url += '?token=' + this._userService.token;

    return this.http.put(url, hospital).pipe( map( res =>{

      swal('Hospital updated', 'Hospital has been updated correctly', 'success');

      console.log(res);

      return true;

    } ) );

  }

}

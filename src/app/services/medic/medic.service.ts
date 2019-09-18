import { Injectable } from '@angular/core';
import { SERVICES_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Medic } from '../../models/medico.model';

declare var swal;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(
    public http: HttpClient,
    public userService: UserService
  ) { }

  getMedics(){

    const url = SERVICES_URL + '/medico';

    return this.http.get( url );

  }

  getMedic( id: string ){
    const url = SERVICES_URL + '/medico/' + id;

    return this.http.get( url ).pipe( map( (res: any) =>{
      if(res.medico){
        return res.medico;
      }else{
        return false;
      }
    } ) );

  }

  findMedic( term: string ){

    const url = SERVICES_URL + '/search/collection/medic/' + term;

    return this.http.get( url );

  }

  deleteMedic( id: string ){
    let url = SERVICES_URL + '/medico/' + id;
    url += '?token=' + this.userService.token;

    return this.http.delete( url ).pipe( map( (res: any) =>{
      
      swal('Medic deleted', res.medicoDeleted.name + ' has been deleted', 'success');

      return true;

    } ) );

  }

  newMedic( medic: Medic ){
    
    let url = SERVICES_URL + '/medico';
    url += '?token=' + this.userService.token;

    medic.user = this.userService.user._id;

    return this.http.post( url, medic ).pipe( map( (res: any) =>{
      swal('Medic created', 'Medic has been created', 'success');
      return res.medico;
    } ) );

  }

  getHospitalImage( hospitalId: string ){

    const url = SERVICES_URL + '/hospital/' + hospitalId;
    
    return this.http.get( url ).pipe( map( (res: any) =>{
      return res.hospital;
    } ) );

  }

  updateMedic( id: string, medic: Medic ){
    let url = SERVICES_URL + '/medico/' + id;
    url += '?token=' + this.userService.token;

    medic.user = this.userService.user._id;

    return this.http.put(url, medic).pipe( map( (res: any) =>{
      swal('Medic updated', res.medicoUpdated.name + ' has been updated', 'success');
      return res.medicoUpdated._id;
    } ));

  }
}

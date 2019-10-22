import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { SERVICES_URL } from '../../config/config';
import swal from 'sweetalert';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor( 
    private http: HttpClient, 
    public router: Router,
    public _uploadFileService: UploadFileService
  ) { 
    this.getStorage();
  }

  getStorage(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      if(localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
      }
    }else{
      this.destroyStorage();
    }

  }

  saveInStorage( id, token, user: User, menu: any[] ){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user =  user;
    this.token = token;
    this.menu = menu;

  }

  destroyStorage(){
    this.token = '';
    this.user = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

  }

  createUser( user: User ){

    const url = SERVICES_URL + '/users';

    return this.http.post( url, user ).pipe(
      map( (resp: any) =>{
           return resp.user;
      }),
      catchError( (err: any) => {

        swal('Error', err.error.message, 'error');
  
        return throwError( err );
      } )

    );

  }

  login( user: User ){
    
    const url = SERVICES_URL + '/login';

    return this.http.post( url, user ).pipe(
      map( (res: any) =>{
          
          this.saveInStorage( res.id, res.token, res.user, res.menu );

          return true;

      }),
      catchError( (err: any) => {

        swal('Error', err.error.message, 'error');
  
        return throwError( err );
      } )
    );

  }

  loginGoogle( token ){

    const url = SERVICES_URL + '/login/google';
    
    return this.http.post( url, { token } ).pipe(
      map( (res: any) =>{
        
        
        if(!res.ok){
          console.log(res.message);
          return false;
        }else{
          this.saveInStorage( res.id, res.token, res.user, res.menu );
                    
          return true;
        }

      } )
    );

  }

  logout(){

    this.destroyStorage();
    
    this.router.navigate(['/login']);

  }

  updateUser( user: User ){
    let url = SERVICES_URL + '/users/' + user._id;
    url += '?token=' + this.token;
  
    return this.http.put( url, user ).pipe(
      map( (res: any) =>{

        const userDB: User = res.user;
        
        if(user._id === this.user._id){  
          this.saveInStorage( userDB._id, this.token, userDB, res.menu );
        }

        swal('User updated correctly', userDB.name, 'success');

        return true;

      }),
      catchError( (err: any) => {

        swal('Error', err.error.message, 'error');
  
        return throwError( err );
      } )
    );

  }

  updateImage( image: File ){

    if(!image){
      return;
    }

    this._uploadFileService.uploadFile( image, 'user', this.user._id )
      .then( (res: any) =>{
        
        swal('Image updated correctly', this.user.name, 'success');

        const imgUrl = res.model.img.split('/');
        const imgPath = imgUrl[imgUrl.length - 1];

        this.user.img = imgPath;

        this.saveInStorage( this.user._id, this.token, this.user, this.menu );

      }).catch( err =>{

        console.log(err);

      } );

  }

  getAllUsers( since: number = 0 ){
    
    const url = SERVICES_URL + '/users?since=' + since;

    return this.http.get( url );

  }

  searchUsers( term: string ){

    const url = SERVICES_URL + '/search/collection/user/' + term;

    return this.http.get( url );
    
  }

  deleteUser( id: string ){

    let url = SERVICES_URL + '/users/' + id;
    url +=  '?token=' + this.token;

    return this.http.delete( url ).pipe( map( res =>{
        swal('User deleted', 'User has been deleted correctle', 'success');
        return true;
    } ) );

  }

}

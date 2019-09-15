import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { UploadModalService } from 'src/app/services/services.index';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  since = 0;
  totalUsers = 0;
  loading = false;

  constructor(
    public _userService: UserService,
    public _uploadModalService: UploadModalService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadUsers();

    this._uploadModalService.notification.subscribe( res =>{
      this.loadUsers();
    } );

  }

  loadUsers(){

    this._userService.getAllUsers().subscribe( (res: any) =>{
      
      this.users = res.users;
      this.totalUsers = res.count;

      this.loading = false;

    } );

  }

  findMoreUsers( value: number ){

    this.loading = true;

    this.since += value;

    this._userService.getAllUsers( this.since ).subscribe( (res:any ) =>{
      this.users = res.users;

      this.loading = false;
    } );

  }

  searchUsers( term: string ){

    this.loading = true;

    if( !term ){
      this._userService.getAllUsers().subscribe( (res: any) =>{
      
        this.users = res.users;
        this.totalUsers = res.count;
  
        this.loading = false;
  
      } );

      return;
    }

    this._userService.searchUsers(term).subscribe( (res: any) =>{

      this.users = res.user;

      this.loading = false;

    } );

  }

  deleteUser( user: User ){
    
    if( user._id === this._userService.user._id ){
      swal('WARNING!!', 'You cannot delete yourself', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'You are going to delete ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( willDelete =>{

        if( willDelete ){
        
          // this._userService.deleteUser( user._id ).subscribe();

          this.loading = true;
          this._userService.getAllUsers().subscribe( (res: any) =>{
      
            this.users = res.users;
            this.totalUsers = res.count;
            this.since = 0;
            console.log('entro');
      
            this.loading = false;
      
          } );
        }

    } );

  }

  changeRole( user: User ){

    if( user._id === this._userService.user._id ){
      swal('WARNING!!', 'You cannot upgrade/downgrade yourself', 'error');
      return;
    }

    this._userService.updateUser(user).subscribe();

  }

}

  

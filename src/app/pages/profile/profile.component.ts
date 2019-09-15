import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

import { SERVICES_URL } from '../../config/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageToUpload: File;
  tempImg: any;

  constructor( public _userService: UserService ) {

    this.user = this._userService.user;

   }


  ngOnInit() {
  }

  updateUser( user: User ){

    this.user.name = user.name;

    if(!this.user.google){
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe();

  }

  newImage( event ){
    if( !event.target.files[0] ){
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = event.target.files[0];

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( this.imageToUpload );

    reader.onloadend = () => {
      this.tempImg = reader.result;
    };
  
  }

  updateImage(  ){

    this._userService.updateImage( this.imageToUpload );

  }

}

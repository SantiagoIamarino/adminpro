import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  passValidator = function ( campo, campo2 ){
      
    return( group: FormGroup ) =>{

      const pass = group.controls[campo].value;
      const pass2 = group.controls[campo2].value;

      if( pass === pass2){
        return null;
      }

      return {
        different: true
      };
  

    };

  };

  constructor( public _us: UserService, private router: Router ) {

    this.form = new FormGroup({
      name: new FormControl( '', Validators.required ),
      email: new FormControl( '', [Validators.required, Validators.email] ),
      password: new FormControl( '', Validators.required ),
      password2: new FormControl( '', Validators.required ),
      terms: new FormControl( false )
    }, { validators: this.passValidator('password', 'password2') });

   }

  ngOnInit() {
    init_plugins();
  }

  register(){


    if(!this.form.controls.terms.value){
      swal({
        title: 'IMPORTANT!',
        text: 'Please read and Accept our terms and conditions!',
        icon: 'warning'
      });
    }

    if(this.form.valid){

      const user = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password
      );

      this._us.createUser( user ).subscribe( res =>{
        swal('User has been created', user.email, 'success');
        this.router.navigate(['/login']);
      } );

    }else{
      console.log('no es valido');
    }

  }

}

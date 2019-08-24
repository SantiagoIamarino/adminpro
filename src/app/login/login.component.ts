import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/services.index';

declare function init_plugins();
declare const gapi;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  remember = false;
  auth2: any;

  constructor( private  router: Router, private _us: UserService ) {

      const email = localStorage.getItem('email') || '';
  
        if(email.length > 0){
          this.remember = true;
        }
  
      this.form = new FormGroup({
        email: new FormControl(email, Validators.required),
        password: new FormControl('', Validators.required),
        rememberMe: new FormControl(this.remember)
      });

   }

  ngOnInit() {
    init_plugins();
    this.googleInit();

  }


  //Iniciando la api de google
  googleInit(){
    gapi.load('auth2', () =>{

      this.auth2 = gapi.auth2.init({
        client_id: '431110184684-u7svcm4tdqp1u0c0qbnosci10q1ujbq1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scopes: 'profile email'
      });

      this.attachSignIn( document.getElementById('googleButton') );

    });
  }

  //Asignando la funcionalidad al button html
  attachSignIn( element ){
    
    this.auth2.attachClickHandler( element, {}, (googleUser) =>{
      
      // const profile = googleUser.getBasicProfile();

      const token = googleUser.getAuthResponse().id_token;

      //router.navigate() traia problemas al cargar Dashboard
      // this._us.loginGoogle(token).subscribe( () => this.router.navigate(['/dashboard']) );
      this._us.loginGoogle(token).subscribe( (logued) => {

        if(logued){
          window.location.href = '/#/dashboard';
        }
        
      } );

    } );

  }

  login( ){
    
    if(this.form.valid){  
  
      const user: User = new User(
        '',
        this.form.value.email,
        this.form.value.password
      );

      this._us.login( user ).subscribe( (resp) =>{
          
        if(this.form.value.rememberMe){
          localStorage.setItem('email', this.form.value.email);
        }else{
          localStorage.removeItem('email');
        }

         this.router.navigate(['/dashboard']);
         
      });
    }

    
  }


}

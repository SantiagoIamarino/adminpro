import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(
      retry(2), //Reintenta en caso de error, se le puede asignar cant. de intentos

      map( resp =>{
        return resp.valor; //Mapear una funcion
      }),

      filter( ( valor, index) => {

        if( (valor % 2) == 1 ){
          //Impar
          return true;
        }else{
          //Par
        }
      })
    )
    .subscribe( 
      resp => console.log('Informacion: ', resp),
      error => console.error('Error: ', error),
      () => console.log('Termino el observador')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable( observer => {

      let contador = 0;
  
      const interval = setInterval( () =>{
        
        contador += 1;

        const respuesta = {
          valor: contador
        };

        observer.next( respuesta );//Probando map()
        // observer.next( contador );//Envia informacion

        if( contador === 3 ){
          // clearInterval(interval);
          // observer.complete(); //Termina el observador
        }

        if(contador == 2){
          // clearInterval(interval);
          // observer.error('Es 2');//Devuelve error y termina
        }

      }, 1000 );

    });
  }

}

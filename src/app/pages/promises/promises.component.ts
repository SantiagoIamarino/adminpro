import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    

    this.countThree().then( ( res ) => {
      console.log('Its three: ', res);
    })
    .catch( ( error ) => {
      console.error('There was an error: ', error);
    });

   }

  ngOnInit() {
  }

  countThree(): Promise<boolean>{
    return new Promise( (resolve, reject) => {
      
      let contador = 0;

      const interval = setInterval( () =>{
        
        contador += 1;
        console.log(contador);

        if( contador === 3 ){
          resolve(true);
          // reject('Error 404, ndeaa');
          clearInterval(interval);
        }

      }, 1000);

    });
  }

}

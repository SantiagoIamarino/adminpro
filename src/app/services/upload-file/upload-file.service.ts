import { Injectable } from '@angular/core';
import { SERVICES_URL } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ){
    
    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();
  
      formData.append( 'image', file, file.name );
  
      xhr.onreadystatechange = function(){
  
        if( xhr.readyState === 4){
  
          if( xhr.status === 200 ){
            resolve( JSON.parse( xhr.response ) );
          }else{
            console.log('Image upload failed');
            reject( xhr.response );
          }
  
        }
  
      };

      const url = SERVICES_URL + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
    
  }

}

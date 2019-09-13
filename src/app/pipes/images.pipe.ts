import { Pipe, PipeTransform } from '@angular/core';
import { SERVICES_URL } from '../config/config';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(img: any, type: string = 'user'): any {

    let url = SERVICES_URL + '/images';
    
    if(!img){
      return url + '/user/xxx';
    }

    if(img.indexOf('https') >= 0){ //Verifica si es una url (si contiene 'https')
      return img;
    }

    url = url + '/' + type + '/' + img;

    return url;
  }

}

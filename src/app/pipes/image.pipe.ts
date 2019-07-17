import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'users'): any {

    let url = URL_SERVICES + '/images';

    if ( !img ) {
      return url + '/users/cualquiera';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'users':
        url += '/users/' + img;
      break;

      case 'top_users':
        url += '/users/' + img;
      break;

      case 'inputs':
        url += '/inputs/' + img;
      break;

      default:
        console.log('Tipo de img no existe');
        url += '/users/cualquiera';
    }

    return url;
  }

}

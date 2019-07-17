import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( archivo: File, tipo: string, id: string ) {

    if ( archivo ) {
      return new Promise ( (resolve, reject ) => {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        formData.append('img', archivo, archivo.name );

        xhr.onreadystatechange = function () {
          if ( xhr.readyState === 4 ) {
            if ( xhr.status === 200 ) {
              console.log('Imagen subida');
              resolve( JSON.parse(xhr.response) );
            } else {
              console.log('Fallo la subida de la img');
              reject( xhr.response );
            }
          }
        };

        let url = URL_SERVICES + '/uploads/' + tipo + '/' + id;

        xhr.open( 'PUT', url, true );
        xhr.send( formData );

      })
    } else {
      return;
    }

  }
}

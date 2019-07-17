import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadService: UploadFileService
  ) { }


  loadUApplications( desde: number = 0 ) {
    let url = URL_SERVICES + '/applications?desde=' + desde;

    return this.http.get( url );
  }

  searchApply( termino: string ) {
    let url = URL_SERVICES + '/search/all/' + termino;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => resp.applys )
                    );
  }

  getApply( id: string) {
    let url = URL_SERVICES + '/applications/application/' + id;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => resp.apply )
                    );
  }

}

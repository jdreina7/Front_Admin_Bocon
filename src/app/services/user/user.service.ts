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
export class UserService {

  token: string;
  usuario: User;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadService: UploadFileService
  ) {
    this.loadFromStorage();
    console.log('Servicio de Usuario listo');
  }

  /*********************************************************************************/
  /*                              LOCAL STORAGE FUNCTIONS                           /
  /*********************************************************************************/
  saveStorage( id: string, token: string, usuario: User ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;

  }

  loadFromStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }


  /*********************************************************************************/
  /*                                 LOGIN FUNCTIONS                                /
  /*********************************************************************************/
  login(usuario: User, rememberme: boolean ) {
    let message: any;

    if ( rememberme ) {
      localStorage.setItem( 'user_mail', usuario.usr_email );
    } else {
      localStorage.removeItem( 'user_mail' );
    }

    let url = URL_SERVICES + '/login';
    return this.http.post( url, usuario)
                    .pipe(
                      map( (resp: any) => {
                        this.saveStorage( resp.id, resp.token, resp.user );
                        swal({
                          title: 'Loading profile - Wait a second please!',
                          html: '<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>',
                          timer: 4000,
                          showConfirmButton: false
                        });
                        return true;
                      }),
                      catchError( err => {
                        console.log( err.status);
                        status = err.status;
                        message = err.error.message;

                        swal({
                          type: 'error',
                          title: status,
                          text: message
                        });

                        return throwError(err);
                      })
                    );
  }

  isLogin() {
    return ( this.token.length > 5 ) ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.clear();
    this.router.navigate(['/pages/login']);
    swal({
      title: 'Closing...',
      html: '<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div>',
      timer: 2000,
      showConfirmButton: false
    });
  }

  /*********************************************************************************/
  /*                                   USER FUNCTIONS                               /
  /*********************************************************************************/
  registerUser( usuario: User ) {

    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/users/user';
    let message: any;

    return this.http.post( url, usuario )
                    .pipe(
                      map( (resp: any) => {
                        this.saveStorage( resp.id, resp.token, resp.user );
                        swal({
                          type: 'success',
                          title: 'Successfully created account!',
                          html: 'Your can login now',
                          timer: 3000,
                          showConfirmButton: false
                        });

                        setTimeout( () => {
                          this.logout()
                        }, 3000);
                        return true;
                      }),
                      catchError( err => {
                        console.log( err.status);
                        message = err.status + ' - ' + err.error.message;
                        swal('Error!', message, 'error');
                        return throwError(err);
                      })
                    );
  }

  updateUser( usuario: User ) {
    let url = URL_SERVICES + '/users/user/' + usuario._id;
    url += '?token=' + this.token

    return this.http.put( url, usuario )
                    .pipe(
                      map( (resp: any) => {
                        this.saveStorage( resp.usuario._id, this.token, resp.usuario );
                        return true;
                      })
                    );
  }

  changeImgUser( file: File, id: string ) {
    if (file) {
      this._uploadService.uploadFile( file, 'users', id )
                       .then( ( resp: any ) => {
                        console.log(resp);
                        this.usuario.usr_img = resp.userUpdated.usr_img;
                        this.saveStorage( id, this.token, resp.userUpdated );
                        return true;
                       })
                       .catch( resp => {
                         console.log(resp);
                       });
    } else {
      return;
    }
  }

  changeImgUserTop( file: File, id: string ) {
    if (file) {
      this._uploadService.uploadFile( file, 'top_users', id )
                       .then( ( resp: any ) => {
                        console.log(resp);
                        this.usuario.usr_img_top = resp.userUpdated.usr_img_top;
                        this.saveStorage( id, this.token, resp.userUpdated );
                        return true;
                       })
                       .catch( resp => {
                         console.log(resp);
                       });
    } else {
      return;
    }
  }

  changeUserPassword( usr_password1: string, usr_password2: string, user: User ) {
    let url = URL_SERVICES + '/users/userPass/' + user._id;
    url += '?token=' + this.token
    let message: any;

    return this.http.put( url, { usr_password1, usr_password2 } )
                    .pipe(
                      map( (resp: any) => {
                        console.log(resp);

                        swal({
                          type: 'success',
                          title: resp.message,
                          html: 'Your session will be closed in 3',
                          timer: 3000,
                          showConfirmButton: false
                        });

                        setTimeout( () => {
                          this.logout()
                        }, 3000);


                      }),
                      catchError( err => {
                        console.log( err.status);
                        message = err.status + ' - ' + err.error.message;
                        swal('Error al cambiar el password!', message, 'error');
                        return throwError(err);
                      })
                    );
  }

  deleteUser( id: string ) {
    let url = URL_SERVICES + '/users/user/' + id;
    url += '?token=' + this.token

    return this.http.delete( url )
                    .pipe(
                      map( resp => {
                        swal({
                            type: 'success',
                            title: 'DISABLED!',
                            html: 'The User has been disabled from the system!',
                          });
                        return true;
                      })
                    );
  }

  activateUser(  usuario: User  ) {
    let url = URL_SERVICES + '/users/activateUser/' + usuario._id;
    url += '?token=' + this.token

    return this.http.put( url, usuario )
                    .pipe(
                      map( resp => {
                        swal({
                            type: 'success',
                            title: 'ACTIVATED!',
                            html: 'The User has been activated again!',
                          });
                        return true;
                      })
                    );
  }

  /*********************************************************************************/
  /*                                   USERS FUNCTIONS                               /
  /*********************************************************************************/

  loadUsers( desde: number = 0 ) {
    let url = URL_SERVICES + '/users?desde=' + desde;

    return this.http.get( url );
  }

  searchUser( termino: string ) {
    let url = URL_SERVICES + '/search/all/' + termino;

    return this.http.get( url )
                    .pipe(
                      map( (resp: any) => resp.users )
                    );
  }

}

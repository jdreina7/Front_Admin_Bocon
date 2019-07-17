import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (
    public _userService: UserService,
    public router: Router
    ) {}

  canActivate() {

    if ( this._userService.isLogin() ) {
      console.log('Paso por el login guard');
      return true;
    } else {
      console.log('Bloqueado por el loginGuard');
      this.router.navigate(['/pages/login']);
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TITLES } from './change-password.config';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/service.index';
import { Form } from '@angular/forms';
import { NGXToastrService } from '../../../services/service.index'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [NGXToastrService]
})
export class ChangePasswordComponent implements OnInit {
  words: any[];
  usr_currentPass: string;
  usr_pass1: string;
  usr_pass2: string;
  usuario: User

  constructor(
    public translate: TranslateService,
    public _userService: UserService,
    public _toastService: NGXToastrService
  ) { }

  ngOnInit() {
    this.words = TITLES['0'];
    this.usuario = this._userService.usuario;
  }

  changePassword( forma: Form ) {

    let pass1 = forma['form'].controls.password.value;
    let pass2 = forma['form'].controls.password1.value;
    let pass3 = forma['form'].controls.password2.value;

    console.log(pass1, pass2, pass3);

    if ( pass2 !== pass3 ) {
      this._toastService.passwordsDontMatch();
      return;
    } else {
      this._userService.changeUserPassword(pass1, pass2, this.usuario)
                      .subscribe( resp => {
                        console.log(resp);
                      });
    }

  }

}

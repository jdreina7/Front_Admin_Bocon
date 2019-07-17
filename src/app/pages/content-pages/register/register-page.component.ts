import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { htmlAlert } from '../../../../../../adm/src/app/shared/data/sweet-alerts';

import { UserService } from '../../../services/service.index';
import { User } from '../../../models/user.model';

import { NGXToastrService } from '../../../services/service.index'
import * as moment from 'moment';


@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
    providers: [NGXToastrService]
})

export class RegisterPageComponent {

    name = '';
    last_name = '';
    email = '';
    password = '';
    password2 = '';
    password_F = '';
    terms = false;

    birthday = '';
    img = '';
    img_top = '';
    role = 'ROLE_CUSTOMER';
    city = '';
    joined = moment.default().format('MMMM Do YYYY'); // May 30th 2019, 9:23:13 pm;
    gender = '';
    ocupation = '';
    website = '';
    country = '';
    address = '';
    phone = '';
    celphone = '';
    // last_activity = Date.now();
    last_activity = '';
    state = true;
    google = false;
    about = '';


    @ViewChild('f') registerForm: NgForm;

    //  On submit click, reset field value
    // onSubmit() {
    //     this.registerForm.reset();
    // }

    constructor (
        public _usr_service: UserService,
        public _toastService: NGXToastrService
    ) {}

    registerUser( forma: NgForm ) {
        // console.log('ngForm: ', forma);
        // if ( !forma.value.termsConditions.value ) {
        //     alertFunctions.htmlAlert();
        // } else {
        //     console.log('Usuario registrado');
        //     console.log('ngForm: ', forma);
        // }
        console.log('Usuario registrado');
        console.log('ngForm: ', forma);

        let pass1 = forma['form'].controls.usr_password1.value;
        let pass2 = forma['form'].controls.usr_password2.value;

        if ( pass1 !== pass2 ) {
            this._toastService.passwordsDontMatch();
            return;
          } else {
        // tslint:disable-next-line:prefer-const
            let usuario = new User(
                this.name,
                this.last_name,
                this.email,
                this.birthday,
                this.password,
                this.img,
                this.img_top,
                this.role,
                this.joined,
                this.gender,
                this.ocupation,
                this.website,
                this.country,
                this.city,
                this.address,
                this.phone,
                this.celphone,
                this.last_activity,
                this.state,
                this.google,
                this.about
            );

            this._usr_service.registerUser( usuario )
            .subscribe( resp => {
                            console.log('Se registro el usuario correctamente');
                             });
            console.log(usuario);
        }
    }
}

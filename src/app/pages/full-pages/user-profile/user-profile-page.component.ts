import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/service.index';
import { User } from 'app/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { NGXToastrService } from '../../../services/service.index'

import dataP from '../../../../assets/paises.json';

import { TITLES } from './user-profile.config';
import { Form } from '@angular/forms';
import { URL_SERVICES } from 'app/config/config';

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss'],
    providers: [NGXToastrService]
})

export class UserProfilePageComponent implements OnInit {

    // Variable Declaration
    // tslint:disable-next-line:no-inferrable-types
    currentPage: string = 'About'
    usuario: User
    imgSubir: File
    imgSubir2: File
    imgTemp: any
    imgTemp2: any
    imgTemp3: any
    imgTemp4: any
    newDate;
    newBirthday;

    img = '';

    keyword = 'name';
    data = dataP;

    words: any[];
    top_img = '';

    constructor(
        public _userService: UserService,
        public translate: TranslateService,
        public _toastService: NGXToastrService
    ) {}

    ngOnInit() {
        this.words = TITLES['0'];
        this.usuario = this._userService.usuario;

        let dateString = this.usuario.usr_birthday;
        this.newDate = dateString.substring(10, 0);

        let url = URL_SERVICES + '/images';

        url += '/top_users/' + this.usuario.usr_img_top;

        this.top_img = url;

        // console.log(TITLES['0']);
        // let other = new Date(this.newDate);
        // this.newBirthday = moment(other).format('MM/DD/YYYY');
        // console.log(this.usuario);
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    // Success Type
    userUpdateSuccess() {
        this._toastService.userUpdateSuccess();
    }

    selectEvent(item) {
    // do something with selected item
    }

    onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e) {
    // do something when input is focused
    }

    callUploadImg() {
        document.getElementById('inputGroupFile01').click();
    }

    callUploadImgTop() {
        document.getElementById('inputGroupFile02').click();
    }

    selectImg( archivo: File ) {
        console.log(event);
        console.log(archivo);

        if ( !archivo) {
            this.imgSubir = null;
            return;
        }

        if ( archivo.type.indexOf('image') < 0 ) {
            swal({
                type: 'error',
                title: 'Error type',
                html: 'The selected file is not an image! Please select only JPG, PNG or JPEG image type.'
            });
            this.imgSubir = null;
            return;
        }

        this.imgSubir = archivo;

        let reader = new FileReader();

        let urlImgTemp = reader.readAsDataURL(archivo);

        reader.onloadend = () => {
            this.imgTemp = reader.result;
            this.imgTemp2 = reader.result;
        }
        // this.imgTemp2 = this.imgTemp;
    }

    selectImg2 ( archivo: File ) {
        // console.log(event);
        console.log(archivo);

    let fileSize = archivo.size;
    // tslint:disable-next-line:radix
    let siezekiloByte = parseInt('', fileSize / 1024);

        if ( !archivo) {
            this.imgSubir2 = null;
            return;
        }

        if ( archivo.type.indexOf('image') < 0 ) {
            swal({
                type: 'error',
                title: 'Error type',
                html: 'The selected file is not an image! Please select only JPG, PNG or JPEG image type.'
            });
            this.imgSubir2 = null;
            return;
        }

    if ( siezekiloByte >  1000.00) {
        swal({
            type: 'error',
            title: 'Error type',
            html: 'The selected file is too long or too heavy. Please select a lighter one.'
                    + '<b>' + fileSize + '</b>'
        });
        this.imgSubir2 = null;
        return false;
    }

        this.imgSubir2 = archivo;

        let reader2 = new FileReader();

        let urlImgTemp = reader2.readAsDataURL(archivo);

        reader2.onloadend = () => {
            this.imgTemp3 = reader2.result;
            this.imgTemp4 = reader2.result;
        }
        // this.imgTemp2 = this.imgTemp;
    }


    saveProfile( user: User ) {

        // console.log(f);
        if ( user.usr_country === '' ) {
            swal({
                type: 'error',
                title: 'Country!',
                html: 'The <b>country<b> field is mandatory!.'
            });
            return false!
        }

        this.usuario.usr_name = user.usr_name;
        this.usuario.usr_last_name = user.usr_last_name;
        this.usuario.usr_address = user.usr_address;
        this.usuario.usr_city = user.usr_city;
        this.usuario.usr_country = user.usr_country['name'];
        this.usuario.usr_birthday = user.usr_birthday;
        this.usuario.usr_gender = user.usr_gender;
        this.usuario.usr_ocupation = user.usr_ocupation;
        this.usuario.usr_phone = user.usr_phone;
        this.usuario.usr_website = user.usr_website;
        this.usuario.usr_celphone = user.usr_celphone;
        this.usuario.usr_about = user.usr_about;

        // console.log(this.usuario);

        this._userService.updateUser( this.usuario )
                            .subscribe( resp => {
                                // console.log(resp);
                                this.userUpdateSuccess();
                                this._userService.changeImgUser( this.imgSubir, this.usuario._id );
                                this._userService.changeImgUserTop( this.imgSubir2, this.usuario._id );
                                this.imgTemp2 = '';
                                this.imgTemp4 = '';
                            });

    }
}

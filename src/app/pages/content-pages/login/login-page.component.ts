import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/service.index';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    // tslint:disable-next-line:prefer-const
    user: string;
    pass: string;
    rememberme = false;
    user_rememberme = '';

    @ViewChild('f') loginForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public _userService: UserService
        ) { }

    ngOnInit() {
        this.user_rememberme = localStorage.getItem('user_mail') || '';

        if ( this.user_rememberme.length > 1 ) {
            this.rememberme = true;
        }
    }

    // On submit button click
    onSubmit(loginForm: NgForm) {
        // this.loginForm.reset();
        if ( !loginForm.valid ) {
            return;
        }

        console.log(loginForm.valid);
        console.log(loginForm.value);

        let user = new User( null, null, loginForm.value.usr_email, null, loginForm.value.usr_password, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        this._userService.login( user, loginForm.value.rememberme)
                         .subscribe( resp => this.router.navigate(['/dashboard']));
    }


    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}

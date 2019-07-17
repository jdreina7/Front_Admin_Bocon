export class User {
    constructor(
        public usr_name: string,
        public usr_last_name: string,
        public usr_email: string,
        public usr_birthday: string,
        public usr_password: string,
        public usr_img_top: string,
        public usr_img: string,
        public usr_role: string,
        public usr_joined: string,
        public usr_gender: string,
        public usr_ocupation: string,
        public usr_website: string,
        public usr_country: string,
        public usr_city: string,
        public usr_address: string,
        public usr_phone: string,
        public usr_celphone: string,
        public usr_last_activity: string,
        public usr_state: boolean,
        public usr_google: boolean,
        public usr_about: string,
        public _id?: string
    ) {}
}

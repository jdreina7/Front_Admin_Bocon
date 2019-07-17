import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, ApplicationsService } from 'app/services/service.index';
import { User } from 'app/models/user.model';
import { Application } from 'app/models/application.model';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  public apply: Application;
  public id_apply: string;

  constructor(
    public _userService: UserService,
    public _applicationsService: ApplicationsService,
    public router: Router,
    public acRoute: ActivatedRoute
  ) {
    acRoute.params.subscribe( params => {
      this.id_apply = params['id'];
    })
  }

  ngOnInit() {
    console.log('llego este id al oninit: ' + this.id_apply);
    if ( this.id_apply.length <= 0 ) {
      this.id_apply = 'new';
      return;
    } else if ( this.id_apply !== 'new') {
      this.cargarSolicitud(this.id_apply);
    }
  }

  cargarSolicitud( id: string ) {
    this._applicationsService.getApply( id )
        .subscribe( (apply) => {
          this.apply = apply,
          console.log(this.apply);
        });
  }

}

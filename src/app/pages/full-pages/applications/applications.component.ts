import { Component, ViewEncapsulation , OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService, ApplicationsService } from 'app/services/service.index';
import { User } from 'app/models/user.model';
import { Application } from 'app/models/application.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsComponent implements OnInit {

  closeResult: string;
  usuarios: User[] = [];
  aplicaciones: Application[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  busqueda = true;
  words: any[];

  constructor(
    public _userService: UserService,
    public _applicationsService: ApplicationsService,
    private modalService: NgbModal,
    public router: Router,
    public acRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.cargando = true;
    this._applicationsService.loadUApplications(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.aplicaciones = resp.applys;
        this.cargando = false;
        // this.busqueda = false;
      });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.loadApplications();
  }

  searchApply(termino: string) {

    this.cargando = true;

    if (termino.length <= 0) {
      // this.cargando = false;
      this.busqueda = true;
      this.loadApplications();
      return;
    }

    this._applicationsService.searchApply(termino)
      .subscribe((aplicaciones: Application[]) => {
        this.cargando = true;
        console.log(aplicaciones);
        this.aplicaciones = aplicaciones;
        this.cargando = true;

        if (this.aplicaciones.length <= 0) {
          this.cargando = true;

          setTimeout(() => {
            this.busqueda = false;
            this.cargando = false;
          }, 1500);

        } else {
          this.cargando = false;
          this.busqueda = true;
        }
      })
  }


}

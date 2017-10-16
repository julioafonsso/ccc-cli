import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Response, Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs/Rx';

import { HttpCustormerService } from './http-custormer.service';
import { Usuario } from './../models/usuario';

@Injectable()
export class LoginService {

  private usuarioEstaLogadoOBS: BehaviorSubject<boolean>;
  private usuarioEhSupervisorOBJS: BehaviorSubject<boolean>;
  private messageLogin: BehaviorSubject<string>;
  private token: string;

  constructor(private http: Http,
    private route: Router
  ) {
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.usuarioEhSupervisorOBJS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
  }

  logoff() {
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.usuarioEhSupervisorOBJS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
    this.token = null;
  }

  getToken() {
    // return this.token;
    return "FOI";
  }

  usuarioLogado() {
    return this.usuarioEstaLogadoOBS.asObservable();
  }

  usuarioEhSupervisor() {
    return this.usuarioEhSupervisorOBJS.asObservable();
  }

  login(usuario: Usuario) {
    this.messageLogin = new BehaviorSubject(null);
    this.messageLogin.next(null);

    this.http.post(environment.url + "login", usuario).subscribe(res => {
      this.token = res.headers.get("token");
      this.usuarioEstaLogadoOBS.next(true);
      this.route.navigate(['/consulta-turmas']);
      let user: Usuario = res.json();
      this.usuarioEhSupervisorOBJS.next(user.indSupervisor);
      // this.usuarioEhSupervisorOBJS.next(true);

    }, (error: (Response)) => {
      
      if(error.status === 0)
        this.messageLogin.next("Falha na conex&#227;o");
      else
        this.messageLogin.next(error.json().message);
    })


    return this.messageLogin;
  }
}


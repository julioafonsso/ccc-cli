import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs/Rx';

import { Usuario } from './../models/usuario';

@Injectable()
export class LoginService {

  private usuarioEstaLogadoOBS: BehaviorSubject<boolean>;
  private messageLogin: BehaviorSubject<string>;
  private token: string;

  constructor(private http: Http,
    private route: Router
  ) {
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
  }

  logoff() {
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  usuarioLogado() {
    return this.usuarioEstaLogadoOBS.asObservable();
  }



  login(usuario: Usuario) {

    this.messageLogin = new BehaviorSubject(null);
    this.messageLogin.next(null);

    this.http.post(environment.url + "login", JSON.stringify(usuario)).subscribe(res => {

      this.token = res.headers.get("Authorization");

      this.usuarioEstaLogadoOBS.next(true);
      this.route.navigate(['/consulta-turmas']);
    }, (error: (Response)) => {

      if (error.status === 0)
        this.messageLogin.next("Falha na conex&#227;o");
      else
        this.messageLogin.next(error.json().message);
    })

    return this.messageLogin;
  }
}


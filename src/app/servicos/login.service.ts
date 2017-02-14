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
  private token:string;

  constructor(private http: Http,
    private route: Router
  ) {
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.usuarioEhSupervisorOBJS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
  }

  logoff(){
    this.usuarioEstaLogadoOBS = new BehaviorSubject(false);
    this.usuarioEhSupervisorOBJS = new BehaviorSubject(false);
    this.messageLogin = new BehaviorSubject(null);
    this.token = null;
  }

  getToken(){
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
    console.log(usuario);
    this.messageLogin.next(null);
    if (environment.mock) {
      if (usuario.login === 'isnard' && usuario.senha === 'isnard') {
        this.usuarioEstaLogadoOBS.next(true);
        this.usuarioEhSupervisorOBJS.next(true)
        this.route.navigate(['/']);

      }
      else if (usuario.login === 'ccc' && usuario.senha === 'ccc') {
          this.usuarioEstaLogadoOBS.next(true);
          this.usuarioEhSupervisorOBJS.next(false)
          this.route.navigate(['/']);
        }
        else{
          this.messageLogin.next("Usuario ou Senha não cadastrados");
        }
      }
    else {
      this.http.post(environment.url + "login", usuario).subscribe(res => {
        this.token = res.headers.get("token");
        this.usuarioEstaLogadoOBS.next(true);
        this.route.navigate(['/cadastro-aluno']);
        let user: Usuario = res.json();
        this.usuarioEhSupervisorOBJS.next(user.indSupervisor);

      }, (error: (Response)) => {
        this.messageLogin.next(error.json().message);
      })

    }
    return this.messageLogin;
  }
}

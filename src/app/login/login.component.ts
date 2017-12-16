import { Usuario } from './../models/usuario';
import { LoginService } from './../servicos/login.service';
import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private usuario: Usuario;
  private msgs: Message[];
  private bloquearBotao: boolean

  constructor(private loginService: LoginService) {
    this.usuario = new Usuario();
    this.msgs = [];
    this.bloquearBotao = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.msgs = [];
    this.bloquearBotao = true;
    this.loginService.login(this.usuario).subscribe(res => {
      if (res != null) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Login Fail', detail: res })
        this.bloquearBotao = false;
      }
    });



  }

}

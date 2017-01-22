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

  constructor(private loginService: LoginService) {
    this.usuario = new Usuario();
    this.msgs = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    this.msgs = [];
    this.loginService.login(this.usuario).subscribe(res => {
      if (res != null) {
        this.msgs.push({ severity: 'error', summary: 'Login Fail', detail: res })
      }
    });



  }

}

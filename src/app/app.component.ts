import { Component, OnInit } from '@angular/core';

import { LoginService } from './servicos/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  mostrarMenu: boolean = false;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.usuarioLogado().subscribe(res =>{
      this.mostrarMenu = res;
    })
  }

}

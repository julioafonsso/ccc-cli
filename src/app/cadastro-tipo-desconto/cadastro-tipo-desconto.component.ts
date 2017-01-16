import { Component, OnInit } from '@angular/core';

import { TipoDesconto } from './../models/tipo-desconto';

@Component({
  selector: 'app-cadastro-tipo-desconto',
  templateUrl: './cadastro-tipo-desconto.component.html',
  styleUrls: ['./cadastro-tipo-desconto.component.scss']
})
export class CadastroTipoDescontoComponent implements OnInit {

  private desconto = new TipoDesconto();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("onSubmit()");
  }

}

import { Response } from '@angular/http';
import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { Component, OnInit } from '@angular/core';

import { TipoFluxo } from './../models/tipo-fluxo';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-cadastro-tipo-fluxo-caixa',
  templateUrl: './cadastro-tipo-fluxo-caixa.component.html',
  styleUrls: ['./cadastro-tipo-fluxo-caixa.component.scss']
})
export class CadastroTipoFluxoCaixaComponent implements OnInit {

  private tipo: TipoFluxo;
  private msgs: Message[];
  private submit: boolean;
  
  constructor(private tipoFluxoService: TipoFluxoCaixaService) {
    this.msgs = [];
    this.tipo = new TipoFluxo();
    this.submit =false;
  }



  ngOnInit() {
  }

  onSubmit() {
    this.submit =true;
    this.tipoFluxoService.cadastrar(this.tipo)
      .subscribe(response => {
        this.submit =false;
        this.tipo = new TipoFluxo();
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });

      },
      erro => {
        this.submit = false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !' });
      });
  }
}

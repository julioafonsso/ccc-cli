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
  
  constructor(private tipoFluxoService: TipoFluxoCaixaService) {
    this.msgs = [];
    this.tipo = new TipoFluxo();
  }



  ngOnInit() {
  }

  onSubmit() {
    this.tipoFluxoService.cadastrar(this.tipo)
      .subscribe(response => {

        this.tipo = new TipoFluxo();
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });

      },
      erro => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !' });
      });
  }
}

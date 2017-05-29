import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private tipoFluxoService: TipoFluxoCaixaService) {
    this.msgs = [];
    this.tipo = new TipoFluxo();
    this.submit = false;
  }



  ngOnInit() {
    this.load()
  }

  load() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != undefined) {
          this.submit = true;
          this.tipoFluxoService.getTipoFluxo(params['id']).subscribe(res => {
            this.tipo = res;
            this.submit = false;
          })
        }
      })
  }

  cadastrar() {
    console.log(this.tipo)
    if (this.tipo.id != undefined)
      return this.tipoFluxoService.alterar(this.tipo)
    return this.tipoFluxoService.cadastrar(this.tipo)
  }

  onSubmit() {
    this.submit = true;
    this.cadastrar()
      .subscribe(response => {
        this.submit = false;
        this.tipo = new TipoFluxo();
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });

      },
      error => {
        this.submit = false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      });
  }
}

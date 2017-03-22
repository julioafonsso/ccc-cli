import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { Message } from 'primeng/primeng';
import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
import { Component, OnInit } from '@angular/core';

import { TipoFluxoCaixaService } from './../servicos/tipo-fluxo-caixa.service';
import { TipoFluxo } from './../models/tipo-fluxo';
import { FluxoCaixa } from './../models/fluxo-caixa';


@Component({
  selector: 'app-lancamento-movimentacao-caixa',
  templateUrl: './lancamento-movimentacao-caixa.component.html',
  styleUrls: ['./lancamento-movimentacao-caixa.component.scss']
})
export class LancamentoMovimentacaoCaixaComponent implements OnInit {

  private fluxos: TipoFluxo[];
  private fluxosEntrada: TipoFluxo[];
  private fluxosSaida: TipoFluxo[];
  private fluxoCaixa : FluxoCaixa;
  private msgs: Message[];
  private data: Date;
  private submit:boolean;

  constructor(private tipoFluxoService: TipoFluxoCaixaService, private fluxoCaixaService: FluxoCaixaService) {
    this.submit =false; 
    this.fluxoCaixa = new FluxoCaixa();
    this.msgs = [];
  }

  ngOnInit() {
    this.tipoFluxoService.getTipoFluxoEntrada().subscribe(res => {
      this.fluxosEntrada = res;
    });

    this.tipoFluxoService.getTipoFluxoSaida().subscribe(res => { this.fluxosSaida = res })
  }

  atualizarTipoFluxo(indEntrada) {
    if(indEntrada == 'E'){
      this.fluxos = this.fluxosEntrada;
    }
    else{
      this.fluxos = this.fluxosSaida;
    }

    this.fluxoCaixa.tipoFluxo = new TipoFluxo();
    
  }

  onSubmit(){
    this.fluxoCaixaService.cadastrar(this.fluxoCaixa)
    .subscribe((res: Response) =>{
      this.submit = false
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
    },
      error => {
        this.submit =false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      });
  }
}

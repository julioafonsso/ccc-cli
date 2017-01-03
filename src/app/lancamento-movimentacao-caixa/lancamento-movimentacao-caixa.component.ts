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
  private fluxoCaixa = new FluxoCaixa();

  constructor(private tipoFluxoService: TipoFluxoCaixaService, private fluxoCaixaService: FluxoCaixaService) { }

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
    this.fluxoCaixaService.cadastrar(this.fluxoCaixa);
  }
}

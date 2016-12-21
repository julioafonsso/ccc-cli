import { Component, OnInit } from '@angular/core';

import { TipoFluxoCaixaService, TipoFluxo } from './../servicos/tipo-fluxo-caixa.service';

@Component({
  selector: 'app-lancamento-movimentacao-caixa',
  templateUrl: './lancamento-movimentacao-caixa.component.html',
  styleUrls: ['./lancamento-movimentacao-caixa.component.scss']
})
export class LancamentoMovimentacaoCaixaComponent implements OnInit {

  private fluxos: TipoFluxo[];
  private fluxosEntrada: TipoFluxo[];
  private fluxosSaida: TipoFluxo[];


  constructor(private tipoFluxoService: TipoFluxoCaixaService) { }

  ngOnInit() {
    this.tipoFluxoService.getTipoFluxoEntrada().subscribe(res => {
      this.fluxosEntrada = res;
      this.fluxos = res;
    });

    this.tipoFluxoService.getTipoFluxoSaida().subscribe(res => { this.fluxosSaida = res })
  }

}

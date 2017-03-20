import { ExtratoConsolidado } from './../models/extrato-consolidado';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'


import { ExtratoService } from './../servicos/extrato.service';
import { Extrato } from './../models/extrato';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-relatorio-movimentacao-caixa',
  templateUrl: './relatorio-movimentacao-caixa.component.html',
  styleUrls: ['./relatorio-movimentacao-caixa.component.scss']
})
export class RelatorioMovimentacaoCaixaComponent implements OnInit {

  private colors: Array<Color>;
  private entradas: ExtratoConsolidado[];
  private saidas: ExtratoConsolidado[];

  private dataInicio: Date;
  private dataFim: Date;


  constructor(private extratoService: ExtratoService) {
    this.dataFim = new Date();
    this.dataInicio = new Date();

  }

  getDetalhe(extrato: ExtratoConsolidado) {
    if (extrato.mostrarDetalhe)
      return extrato.lancamentos
    return [];
  }

  pesquisar() {

    let d = new DatePipe("pt");

    this.extratoService.getExtratoConsolidadoEntradas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {
        this.entradas = res;
      })

    this.extratoService.getExtratoConsolidadoSaidas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {
        this.saidas = res;
      })
  }

  ngOnInit() {
    this.pesquisar();
  }

}

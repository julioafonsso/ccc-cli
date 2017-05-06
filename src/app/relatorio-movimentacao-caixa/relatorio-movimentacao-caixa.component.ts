import { FluxoCaixa } from './../models/fluxo-caixa';
import { ExtratoConsolidado } from './../models/extrato-consolidado';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


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
  private nomeDetalhe: string;
  private valorDetalhe: number;
  private quantidadeDetalhe: number;


  public detalhes: FluxoCaixa[];

  constructor(private extratoService: ExtratoService) {
    this.dataFim = new Date();
    this.dataInicio = new Date();
    this.dataInicio.setDate(this.dataInicio.getDate() - 30);
    this.dataInicio;
    this.entradas = [];
    this.saidas = [];
    this.detalhes = [];
    this.nomeDetalhe = '';
    this.valorDetalhe = 0;
    this.quantidadeDetalhe = 0;
  }

  setDetalhe(fluxo : ExtratoConsolidado){
    this.detalhes = fluxo.lancamentos;
    this.nomeDetalhe = fluxo.nome;
    this.valorDetalhe = fluxo.valor;
    this.quantidadeDetalhe = fluxo.quantidade;
  }

  getDetalhe() {
    return this.detalhes;
  }

  getSaldoEntradas() {
    let valor: number = 0;
    this.entradas.forEach(v => {
      valor = valor + v.valor;
    })

    return valor;
  }

getSaldoSaidas() {
    let valor: number = 0;
    this.saidas.forEach(v => {
      valor = valor + v.valor;
    })

    return valor;
  }

  getSaldoPeriodo() {
    let valor: number = 0;
    this.entradas.forEach(v => {
      valor = valor + v.valor;
    })

    this.saidas.forEach(v => {
      valor = valor + v.valor;
    })
    return valor;
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

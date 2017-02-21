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

  private lancamentos: Extrato[];
  private dataInicio: Date;
  private dataFim: Date;

  private labelsEntradas = [];
  private dadosEntradas = [];

  private labelsSaidas = [];
  private dadosSaidas = [];
  private mostrarGraficoSaida: boolean;
  private mostrarGraficoEntrada: boolean;

  private type: string = 'pie';

  constructor(private extratoService: ExtratoService) {
    this.mostrarGraficoSaida = false;
    this.mostrarGraficoEntrada = false;
    this.dataFim = new Date();
    this.dataInicio = new Date();
    this.colors = [
      {
        backgroundColor: ['#e84351',
          '#434a54',
          '#3ebf9b',
          '#4d86dc',
          '#f3af37']
      }];
  }

  getDadosGraficoEntrada() {
    return this.dadosEntradas;
  }
  getLabelsGraficoEntrada() {
    return this.labelsEntradas;
  }

  getDadosGraficoSaida() {
    return this.dadosSaidas;
  }
  getLabelsGraficoSaida() {
    return this.labelsSaidas;
  }

  pesquisar() {

    let d = new DatePipe("pt");
    this.mostrarGraficoSaida = false;
    this.mostrarGraficoEntrada = false;

    this.extratoService.getExtrato(d.transform(this.dataInicio, "yyyyMMdd"), d.transform(this.dataFim, "yyyyMMdd")).subscribe(res => {
      this.lancamentos = res;
    });

    this.extratoService.getExtratoConsolidadoEntradas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {

        while (this.labelsEntradas.length > 0) {
          this.labelsEntradas.pop();
        }

        this.dadosEntradas = res[0];

        for (let item of res[1]) {
          this.labelsEntradas.push(item);
        }
        if(this.labelsEntradas.length > 0)
        {
          this.mostrarGraficoEntrada = true;
        }
      })

    this.extratoService.getExtratoConsolidadoSaidas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {

        while (this.labelsSaidas.length > 0) {
          this.labelsSaidas.pop();

        }

        this.dadosSaidas = res[0];

        for (let item of res[1]) {
          this.labelsSaidas.push(item);
        }

        if(this.labelsSaidas.length > 0)
        {
          this.mostrarGraficoSaida = true;
        }

      })


  }

  ngOnInit() {
    this.pesquisar();
  }

}

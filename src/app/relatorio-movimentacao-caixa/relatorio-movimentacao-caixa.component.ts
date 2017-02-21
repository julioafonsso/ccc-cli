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

  public colors: Array<Color> = [
    {
      backgroundColor: ['#e84351',
        '#434a54',
        '#3ebf9b',
        '#4d86dc',
        '#f3af37']
    }];

  private lancamentos: Extrato[];
  private dataInicio: Date;
  private dataFim: Date;

  public labelsEntradas = [];
  public dadosEntradas = [];
  
  public labelsSaidas = [];
  public dadosSaidas = [];
  

  public type: string = 'pie';

  constructor(private extratoService: ExtratoService) {
    this.dataFim = new Date();
    this.dataInicio = new Date();
  }

  public getDadosGraficoEntrada() {
    return this.dadosEntradas;
  }
  public getLabelsGraficoEntrada() {
    return this.labelsEntradas;
  }

public getDadosGraficoSaida() {
    return this.dadosSaidas;
  }
  public getLabelsGraficoSaida() {
    return this.labelsSaidas;
  }

  pesquisar() {

    let d = new DatePipe("pt");


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
      })


  }

  ngOnInit() {
    this.pesquisar();
  }

}

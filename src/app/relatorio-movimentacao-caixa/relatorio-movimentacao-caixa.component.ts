import { Message } from 'primeng/primeng';
import { FluxoCaixaService } from './../servicos/fluxo-caixa.service';
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
  private detalhes: any[];
  private detalhe: any[];
  private msgs: Message[];
  private dataInicio: Date;
  private dataFim: Date;
  private nomeDetalhe: string;
  private valorDetalhe: number;
  private quantidadeDetalhe: number;



  constructor(private extratoService: ExtratoService,
    private fluxoCaxaService: FluxoCaixaService) {
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

  setDetalhe(fluxo: ExtratoConsolidado) {
    this.detalhe = this.detalhes[fluxo.idTipoLancamento];
    this.nomeDetalhe = fluxo.nomeTipoLancamento;
    this.valorDetalhe = fluxo.valor;
    this.quantidadeDetalhe = fluxo.qtdLancamentos;
  }

  getDetalhe() {
    return this.detalhe;
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
      valor = valor - v.valor;
    })
    return valor;
  }

  pesquisar() {

    let d = new DatePipe("pt");

    this.extratoService.getExtratoConsolidadoEntradas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {
        this.entradas = res;
        this.loadDetalhes(res);

      })

    this.extratoService.getExtratoConsolidadoSaidas(d.transform(this.dataInicio, "yyyyMMdd"),
      d.transform(this.dataFim, "yyyyMMdd")).
      subscribe(res => {
        this.saidas = res;
        this.loadDetalhes(res);
      })
  }

  loadDetalhes(valores: ExtratoConsolidado[]) {
    let d = new DatePipe("pt");
    valores.forEach(v => {
      this.extratoService.getExtrato(v.idTipoLancamento, d.transform(this.dataInicio, "yyyyMMdd"),
        d.transform(this.dataFim, "yyyyMMdd")).subscribe(res => {
          this.detalhes[v.idTipoLancamento] = res;
        })
    })
  }

  ngOnInit() {
    this.pesquisar();
  }


  apagar(id) {
    this.fluxoCaxaService.apagar(id).subscribe(res => {
      this.pesquisar();
      this.msgs.push({ severity: 'success', summary: 'Apagado Com Sucesso !' });
    },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Erro !', detail: JSON.parse(error._body)["message"] });
      });
  }
}

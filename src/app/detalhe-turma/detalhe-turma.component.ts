import { ConsultaPagamentosTurma } from './../models/consulta-pagamentos-turma';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'app/servicos/turma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalhe-turma',
  templateUrl: './detalhe-turma.component.html',
  styleUrls: ['./detalhe-turma.component.css']
})
export class DetalheTurmaComponent implements OnInit {

  private inscricao: Subscription;
  private dataInicio: string;
  private dataFim: string;
  private idTurma: number;
  private pagamentos: ConsultaPagamentosTurma[];

  constructor(private turmaService: TurmaService,
    private route: ActivatedRoute) {
    this.initDatas();
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idTurma = params['id'];
        this.pesquisar();
      }
    );
  }

  getValorTotalPago(){
    return this.pagamentos ? this.pagamentos.reduce((a, b) => a + b.valorPago , 0) : 0;
  }

  getValorTotalMensalidade(){
    return this.pagamentos ? this.pagamentos.reduce((a, b) => a + b.valorMensalidade , 0) : 0;
  }

  pesquisar() {
    this.turmaService.getPagamentos(this.idTurma, this.dataInicio, this.dataFim).subscribe(
      res => {
        this.pagamentos = res
      console.log(this.pagamentos)});
  }

  initDatas() {
    let dp = new DatePipe("yyyy-MM");
    this.dataFim = dp.transform(Date.now(), "yyyy-MM");
    let valores = this.dataFim.split("-");
    let ano = new Number(valores[0]).valueOf()
    let mes = new Number(valores[1]).valueOf()

    mes -= 6;

    if (mes < 1) {
      mes = 12 + mes;
      ano -= 1;
    }

    if (mes.toString().length === 1)
      this.dataInicio = ano.toString() + "-0" + mes.toString();
    else
      this.dataInicio = ano.toString() + "-" + mes.toString();

  }

}

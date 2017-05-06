import { DatePipe } from '@angular/common';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Turma } from './../models/turma';
import { AlunoService } from './../servicos/aluno.service';
import { Aluno } from './../models/aluno';
import { Mensalidade } from './../models/mensalidade';
import { Matricula } from './../models/maticula';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.scss']
})
export class DetalheAlunoComponent implements OnInit {

  private inscricao: Subscription;
  private idAluno: number;
  private aluno: Aluno;
  private matriculas: Matricula[];
  private debitos: Mensalidade[];
  private histPagamento: Mensalidade[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private dataInicio: string;
  private dataFim: string;


  constructor(private alunoService: AlunoService, private route: ActivatedRoute) {
    this.msgs = [];
    this.aluno = new Aluno();
    this.botoes = new Array();
    this.submit = false;
    this.initDatas();
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.loadAluno();
        this.loadTurmas();
        this.loadDebitos();
        this.pesquisar();
      }
    );
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
  


  pesquisar() {
    if (this.dataInicio == undefined || this.dataInicio.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFim == undefined || this.dataFim.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadPagamentos();
    }
  }


  loadPagamentos() {
    this.alunoService.getPagamentos(this.idAluno, this.dataInicio, this.dataFim).subscribe(res => {
      console.log(res);
      this.histPagamento = res;
    })
  }

  loadTurmas() {
    this.alunoService.getMatriculas(this.idAluno).subscribe(res => {
      this.matriculas = res;
    })
  }

  loadAluno() {
    this.alunoService.getAluno(this.idAluno).subscribe(res => {
      this.aluno = res;
    })
  }

  loadDebitos() {
    this.alunoService.getDebitos(this.idAluno).subscribe(res => {
      this.debitos = res;
      this.submit = false;
    })
  }

  getTabAtiva(x: number) {
    let retorno: boolean;
    retorno = this.botoes[x];
    return retorno;
  }

  tabBios() {
    this.botoes = new Array();
    this.botoes[0] = true;
  }

  tabTurmas() {
    this.botoes = new Array();
    this.botoes[1] = true;
  }

  tabDebitos() {
    this.botoes = new Array();
    this.botoes[2] = true;
  }

  tabHistPag() {
    this.botoes = new Array();
    this.botoes[3] = true;
  }


  pagar(mensalidade: Mensalidade) {
    this.submit = true;
    this.alunoService.pagarMensalidade(mensalidade).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.loadDebitos();
      this.loadPagamentos()
    }, error => {
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
      this.submit = false;
    });

  }

  pagarMensalidade(mensalidade: Mensalidade) {
    mensalidade.valorParaPagar = mensalidade.valorMensalidade;
    this.pagar(mensalidade);
  }

  pagarMensalidadeCalculada(mensalidade: Mensalidade) {
    mensalidade.valorParaPagar = mensalidade.valorCalculado;
    this.pagar(mensalidade);

  }

}

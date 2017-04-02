import { DatePipe } from '@angular/common';
import { FluxoCaixa } from './../models/fluxo-caixa';
import { Response } from '@angular/http';
import { Mensalidade } from './../models/mensalidade';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProfessorService } from './../servicos/professor.service';
import { Professor } from './../models/professor';
import { Turma } from './../models/turma';
import { Salario } from './../models/salario';
import { Message } from 'primeng/primeng';


@Component({
  selector: 'app-detalhe-professor',
  templateUrl: './detalhe-professor.component.html',
  styleUrls: ['./detalhe-professor.component.scss']
})
export class DetalheProfessorComponent implements OnInit {
  private inscricao: Subscription;
  private idProfessor: number;
  private professor: Professor;
  private salarios: Salario[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private turmas: Turma[];
  private recebimentos: FluxoCaixa[];
  private detalhes: any[];
  private detalhe: Salario[];
  private mostraDetalhe: boolean;
  private idFluxoDetalhado: number;
  private dataInicio: string;
  private dataFim: string;

  constructor(private professorService: ProfessorService, private router: ActivatedRoute) {
    this.professor = new Professor();
    this.salarios = [];
    this.msgs = [];
    this.recebimentos = [];
    this.submit = false;
    this.detalhes = [];
    this.detalhe = [];
    this.mostraDetalhe = false;
    this.idFluxoDetalhado = -1;
    this.initDatas();

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

    if (mes.toString.length == 1)
      this.dataInicio = ano.toString() + "-0" + mes.toString();
    else
      this.dataInicio = ano.toString() + "-" + mes.toString();
  }

  getValorTotal() {
    let total = 0;
    for (let i = 0; i < this.salarios.length; i++) {
      total += this.salarios[i].valor;
    }
    return total;
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.router.params.subscribe(
      (params: any) => {
        this.idProfessor = params['id'];
        this.loadProfessor();
        this.loadTurmas();
        this.loadPagamento();
        this.pesquisar();

      }
    );
  }

  loadRecebimentos() {
    this.professorService.getRecebimentos(this.idProfessor, this.dataInicio, this.dataFim).subscribe(res => {
      this.recebimentos = res;
      this.loadDetalheRecebimento();
    })
  }

  loadDetalheRecebimento() {
    this.recebimentos.forEach(v => {
      this.professorService.getDetalheRecebimento(v.id).subscribe(res => {
        this.detalhes[v.id] = res;
      })
    })
  }

  loadTurmas() {
    this.professorService.getTurmaProfessor(this.idProfessor).subscribe(res => {
      this.turmas = res;
    })
  }

  loadProfessor() {
    this.professorService.getProfessor(this.idProfessor).subscribe(res => {
      this.professor = res;
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

  tabPagamentos() {
    this.botoes = new Array();
    this.botoes[2] = true;
  }

  tabHistPagamentos() {
    this.botoes = new Array();
    this.botoes[3] = true;
  }
  loadPagamento() {
    this.professorService.getMensalidadesParaReceber(this.idProfessor).subscribe(res => {
      this.salarios = res;
      this.submit = false;
    })
  }

  pagarTudo() {
    this.submit = true;
    this.professorService.cadastrarRecebimento(this.idProfessor).subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
      this.loadRecebimentos();
    }, error => {
      this.submit = false;
      this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
    })
  }

  getDatelhePagamento() {
    return this.detalhe;
  }

  ehDetalheExibido(recebio: FluxoCaixa) {
    return recebio.id == this.idFluxoDetalhado
  }

  getRecebimentosParte1() {
    if (this.idFluxoDetalhado == -1)
      return this.recebimentos
    else {
      return this.recebimentos.filter(v => {
        return v.id <= this.idFluxoDetalhado;
      })
    }
  }

  getRecebimentosParte2() {
    if (this.idFluxoDetalhado == -1)
      return []
    else {
      return this.recebimentos.filter(v => {
        return v.id > this.idFluxoDetalhado;
      })
    }
  }

  mostrarSegundaParte() {
    let retorno = false;
    if (this.idFluxoDetalhado == -1)
      return false;
    this.recebimentos.forEach(v => {
      if (v.id > this.idFluxoDetalhado)
        retorno = true;
      else
        retorno = false
    })

    return retorno;
  }

  pesquisar() {
    if (this.dataInicio == undefined || this.dataInicio.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFim == undefined || this.dataFim.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadRecebimentos();
    }
  }

  mostrarDetalhe(recebimento: FluxoCaixa) {
    if (recebimento.id == this.idFluxoDetalhado) {
      this.mostraDetalhe = false;
      this.detalhe = [];
      this.idFluxoDetalhado = -1;
    }
    else {

      this.detalhe = this.detalhes[recebimento.id];
      this.idFluxoDetalhado = recebimento.id
      console.log(this.detalhe)
      this.mostraDetalhe = true;

    }
  }


}

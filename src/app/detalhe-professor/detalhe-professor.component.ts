import { ConsultaRecebimentos } from './../models/consulta-recebimentos';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaProfessor } from './../models/consulta-professor';
import { DatePipe } from '@angular/common';
import { FluxoCaixa } from './../models/fluxo-caixa';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProfessorService } from './../servicos/professor.service';
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
  private professor: ConsultaProfessor;
  private salarios: Salario[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;
  private turmas: ConsultaTurma[];
  private recebimentos: ConsultaRecebimentos[];
  private detalhes: any[];
  private detalhe: Salario[];
  private mostraDetalhe: boolean;
  private idFluxoDetalhado: number;
  private dataInicioHistPagamento: string;
  private dataFimHistPagamento: string;
  private mesReferenciaPagamento: string;
  private mesParaPagar: string
  

  constructor(private professorService: ProfessorService, private router: ActivatedRoute) {
    this.professor = new ConsultaProfessor();
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
    let data = new Date(Date.now());
    this.dataFimHistPagamento = dp.transform(Date.now(), "yyyy-MM");

    data.setMonth(data.getMonth()-1)
    this.mesReferenciaPagamento = dp.transform(data.getTime(), "yyyy-MM");
    this.mesParaPagar = this.mesReferenciaPagamento;

    data.setMonth(data.getMonth()-5)
    this.dataInicioHistPagamento = dp.transform(data.getTime(), "yyyy-MM");

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
        this.pesquisarPagamentoHistorico();

      }
    );
  }

  loadRecebimentos() {
    this.professorService.getRecebimentos(this.idProfessor, this.dataInicioHistPagamento, this.dataFimHistPagamento).subscribe(res => {
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
    this.submit = true;
    this.mesParaPagar = this.mesReferenciaPagamento;
    this.professorService.getMensalidadesParaReceber(this.idProfessor, this.mesReferenciaPagamento).subscribe(res => {
      this.salarios = res;
      this.submit = false;
    })
  }

  pagarMensalidade(salario: Salario){
    this.submit = true;
    this.professorService.cadastrarRecebimentoParcial(this.idProfessor, salario.id).subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
      this.loadRecebimentos();
    }, error => {
      this.submit = false;
      this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
    })
  }

  pagarTudo() {
    this.submit = true;
    this.professorService.cadastrarRecebimento(this.idProfessor, this.mesParaPagar).subscribe((res: Response) => {
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

  pesquisarPagamentoHistorico() {
    if (this.dataInicioHistPagamento == undefined || this.dataInicioHistPagamento.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Inicio" });
    }
    else if (this.dataFimHistPagamento == undefined || this.dataFimHistPagamento.toString().length < 7) {
      this.msgs.push({ severity: 'error', summary: 'Pesquisa Com Erro !', detail: "Selecionar Data Fim" });
    }
    else {
      this.loadRecebimentos();
    }
  }

  mostrarDetalhe(recebimento: ConsultaRecebimentos ) {
    if (recebimento.id == this.idFluxoDetalhado) {
      this.mostraDetalhe = false;
      this.detalhe = [];
      this.idFluxoDetalhado = -1;
    }
    else {
      this.detalhe = this.detalhes[recebimento.id];
      this.idFluxoDetalhado = recebimento.id
      this.mostraDetalhe = true;
    }
  }


}

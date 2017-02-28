import { Response } from '@angular/http';
import { Mensalidade } from './../models/mensalidade';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ProfessorService } from './../servicos/professor.service';
import { Professor } from './../models/professor';
import { Turma } from './../models/turma';
import { TurmaProfessor } from './../models/turma-professor'
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
  private turmasProfessor: TurmaProfessor[];
  private salarios: Salario[];
  private botoes = new Array();
  private msgs: Message[];
  private submit:boolean;

  constructor(private professorService: ProfessorService, private router: ActivatedRoute) {
    this.professor = new Professor();
    this.salarios = [];
    this.msgs = [];
    this.submit =false;
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
      }
    );
  }


  loadTurmas() {
    this.professorService.getTurmaProfessor(this.idProfessor).subscribe(res => {
      this.turmasProfessor = res;
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
  loadPagamento() {
    this.professorService.getMensalidadesParaReceber(this.idProfessor).subscribe(res => {
      this.salarios = res;
      this.submit =false;
    })
  }

  pagarMensalidade(salario: Salario) {
    this.submit =true;
    let salarios = [];
    salarios.push(salario);
    this.professorService.cadastrarRecebimento(this.idProfessor, salarios).subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
    }, error => {
      this.submit =false;
      this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
    })
  }

  pagarTudo() {
    this.submit =true;
    this.professorService.cadastrarRecebimento(this.idProfessor, this.salarios).subscribe((res: Response) => {
      this.msgs.push({ severity: 'success', summary: 'Pagamento Efetuado com Sucesso !' });
      this.loadPagamento();
    }, error => {
      this.submit =false;
      this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
    })
  }

}

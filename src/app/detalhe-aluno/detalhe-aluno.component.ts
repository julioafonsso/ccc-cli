import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
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
  private aluno :Aluno;
  private matriculas: Matricula[];
  private debitos: Mensalidade[];
  private botoes = new Array();
  private msgs: Message[];
  private submit: boolean;


  constructor(private alunoService: AlunoService, private router: Router, private route: ActivatedRoute) { 
    this.msgs = [];
    this.aluno = new Aluno();
    this.botoes = new Array();
    this.submit =false;
  }

  ngOnInit() {
    this.botoes[0] = true;
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAluno = params['id'];
        this.loadAluno();
        this.loadTurmas();
        this.loadDebitos();
      }
    );
  }

  loadTurmas() {
    this.alunoService.getMatriculas(this.idAluno).subscribe(res => {
      this.matriculas = res;
    })
  }

  loadAluno() {
    this.alunoService.getAluno(this.idAluno).subscribe(res => {
      this.aluno = res;
      console.log(res);
    })
  }

  loadDebitos()
  {
    this.alunoService.getDebitos(this.idAluno).subscribe(res => {
      this.debitos = res;
      this.submit =false;
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

  pagarMensalidade(mensalidade: Mensalidade)
  {
    mensalidade.valorCalculado = mensalidade.matricula.turma.mensalidade;
    this.pagarMensalidadeCalculada(mensalidade);
  }

  pagarMensalidadeCalculada(mensalidade: Mensalidade)
  {
    this.submit =true;
    this.alunoService.pagarMensalidade(mensalidade ).subscribe(res =>{
      this.msgs.push({ severity: 'success', summary: 'Pagamento Com Sucesso !' });
      this.loadDebitos();
    },error =>{
      this.msgs.push({ severity: 'error', summary: JSON.parse(error)["message"] });
      this.submit =false;
    });
  }

}

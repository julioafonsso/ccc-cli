import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Message } from 'primeng/primeng';
import { Matricula } from './../models/maticula';
import { AlunoService } from './../servicos/aluno.service';
import { ProfessorService } from './../servicos/professor.service';
import { Salas } from './../models/salas';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Professor } from './../models/professor';
import { TurmaProfessor } from './../models/turma-professor';
import { Turma } from './../models/turma';
import { TurmaService } from './../servicos/turma.service';
import { DiasSemana } from './../models/dias-semana';
import { Aluno } from './../models/aluno';
import { DescontoService } from './../servicos/desconto.service';
import { TipoDesconto } from './../models/tipo-desconto';

@Component({
  selector: 'app-manutencao-turma',
  templateUrl: './manutencao-turma.component.html',
  styleUrls: ['./manutencao-turma.component.scss']
})
export class ManutencaoTurmaComponent implements OnInit {

  private inscricao: Subscription;
  private idTurma: number;
  private dias: DiasSemana[];
  private professores: Professor[];
  private professoras: Professor[];
  private salas: Salas[];
  private nives: NivelTurma[];
  private modalidades: ModalidadeTurma[];
  private alunos: Aluno[]
  private turma: Turma;
  private pesquisa: Aluno;
  private msgs: Message[];
  private descontos: TipoDesconto[];
  private desconto: TipoDesconto[];
  private diaVencimento: number[];
  private submit: boolean;

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute,
    private alunoService: AlunoService,
    private descontoService: DescontoService) {
    this.pesquisa = new Aluno();
    this.turma = new Turma();
    this.msgs = [];
    this.desconto = []
    this.diaVencimento = [];
    this.submit =false;
  }

  ngOnInit() {

    this.turma.inicializarTurmaProfessor();

    this.descontoService.obterDescontos().subscribe(res => {
      this.descontos = res;
    }, erro => {
      console.log("ERRO")
    });

    // this.turmaService.getDiasAulas().subscribe(res => {
    //   this.dias = res
    // });

    // this.professorService.getProfessores().subscribe(res => {
    //   this.professores = res;
    //   this.professoras = res;
    // })

    // this.turmaService.getSalas().subscribe(res => {
    //   this.salas = res;
    // })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.nives = res;
    })


    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idTurma = params['id'];
        this.loadTurma();
      }
    );
  }

  loadTurma() {
    this.turmaService.getTurma(this.idTurma).subscribe(res => {
      this.turma = res;

    });
  }

  excluirAluno(aluno: Matricula) {
    this.submit = true;
    aluno.turma = this.turma;
    this.turmaService.excluirAlunoTurma(aluno).subscribe(res => {
      this.reset();
      this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
    },
      error => {
        this.submit =false;
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      });
  }

  pesquisarAlunos() {
    this.alunoService.pesquisarAlunos(this.pesquisa.nome, this.pesquisa.email, this.pesquisa.cpf).subscribe(res => {
      this.alunos = res;
    });
  }

  reset() {
    this.alunos = new Array<Aluno>();
    this.loadTurma();
    this.pesquisa = new Aluno();
    this.submit =false;
  }

  matricular(alunoParametro: Aluno, desconto: TipoDesconto, diaVencimento: number) {
    this.submit =true;
    this.turmaService.matricularAluno(this.turma, alunoParametro, desconto, diaVencimento).subscribe(res => {
      this.msgs.push({ severity: 'success', summary: 'Matricula Efetuada Com Sucesso !' });
      this.reset();

    }, error => {
      this.submit =false;
      this.msgs.push({ severity: 'error', summary: 'Matricula Com Erro !', detail: JSON.parse(error._body)["message"] });
    }
    );
  }

  getDias(diasSemana: DiasSemana[]) {
    return this.turmaService.getDias(diasSemana)
  }

  getNomeProfessor(professores: TurmaProfessor[], index: number) {
    return this.professorService.getNomeProfessor(professores, index);

  }


}


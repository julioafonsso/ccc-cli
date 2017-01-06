import { AlunoTurma } from './../models/aluno-turma';
import { Aluno } from './../models/aluno';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';


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
  private turma = new Turma();
  private pesquisa = new Aluno();

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute,
    private alunoService: AlunoService) { }

  ngOnInit() {

    this.turma.inicializarTurmaProfessor();

    this.turmaService.getDiasAulas().subscribe(res => {
      this.dias = res
    });

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res;
      this.professoras = res;
    })

    this.turmaService.getSalas().subscribe(res => {
      this.salas = res;
    })

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

  excluirAluno(aluno: AlunoTurma) {
    aluno.turma = this.turma;
    this.turmaService.excluirAlunoTurma(aluno).subscribe(res => {
      if(res.status === 200 ){
        this.loadTurma();
      }
    });
  }

  pesquisarAlunos() {
    console.log("VOU PESQUISASR")
    this.alunoService.pesquisarAlunos( this.pesquisa.nome, this.pesquisa.email, this.pesquisa.cpf).subscribe(res => {
      this.alunos = res;
    });
  }

  matricular(alunoParametro: Aluno) {
    this.turmaService.matricularAluno(this.turma, alunoParametro).subscribe(res => {
      if (res.status === 200) {
        this.alunos = new Array<Aluno>();
        this.loadTurma();
        this.pesquisa = new Aluno();
      }
    });
  }

  getDias(diasSemana: DiasSemana[]) {
    return this.turmaService.getDias(diasSemana)
  }

  getProfessor(professores: TurmaProfessor[], index: number) {
    return this.professorService.getProfessor(professores, index);

  }


}


import { ConsultaTurma } from './../models/consulta-turmas';
import { ConsultaAlunos } from './../models/consulta-alunos';
import { ConsultaProfessor } from './../models/consulta-professor';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Message } from 'primeng/primeng';
import { AlunoService } from './../servicos/aluno.service';
import { ProfessorService } from './../servicos/professor.service';
import { Salas } from './../models/salas';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { TurmaService } from './../servicos/turma.service';
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
  private professores: ConsultaProfessor[];
  private professoras: ConsultaProfessor[];
  private salas: Salas[];
  private nives: NivelTurma[];
  private modalidades: ModalidadeTurma[];
  private alunos: ConsultaAlunos[]
  private turma: ConsultaTurma;
  private pesquisa: ConsultaAlunos;
  private msgs: Message[];
  private descontos: TipoDesconto[];
  private desconto: TipoDesconto[];
  private diaVencimento: number[];
  private valorMatricula: number[];
  private submit: boolean;
  private load: any;

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private router: Router, private route: ActivatedRoute,
    private alunoService: AlunoService,
    private descontoService: DescontoService,
  ) {
    this.pesquisa = new ConsultaAlunos();
    this.turma = new ConsultaTurma();
    this.msgs = [];
    this.desconto = []
    this.descontos = [];
    this.diaVencimento = [];
    this.valorMatricula = [];
    this.submit = false;
  }

  ngOnInit() {


    this.descontoService.obterDescontos().subscribe(res => {
      this.descontos = [];
      this.descontos.push(new TipoDesconto());
      res.forEach(v => {
        this.descontos.push(v);
      })

    }, erro => {
    });


    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.nives = res;
    })


    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idTurma = params['id'];
      }
    );
  }


}


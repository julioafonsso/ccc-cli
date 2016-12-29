import { TurmaProfessor } from './../models/turma-professor';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TurmaService } from './../servicos/turma.service';
import { ProfessorService } from './../servicos/professor.service';
import { TipoTurmaService } from './../servicos/tipo-turma.service';

import { Salas } from './../models/salas';
import { Professor } from './../models/professor';
import { DiasSemana } from './../models/dias-semana';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Turma } from './../models/turma';


@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})



export class CadastroTurmaComponent implements OnInit {
  dias: DiasSemana[];
  professores: Professor[];
  professoras: Professor[];
  salas: Salas[];
  nives: NivelTurma[];
  modalidades: ModalidadeTurma[];

  selecionado: string = "tete";
  turma = new Turma();

  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService) { }

  ngOnInit() {
    this.turma.inicializarTurmaProfessor();
    this.turmaService.getDiasAulas().subscribe(res => {
      this.dias = res
    });

    this.professorService.getProfessores().subscribe(res => {
      this.professores = res
    })

    this.professorService.getProfessoras().subscribe(res => {
      this.professoras = res
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

  }

  onSubmit() {
    console.log(this.turma)
  }

}

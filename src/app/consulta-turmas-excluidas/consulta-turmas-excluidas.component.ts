import { Message } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';


import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { TurmaService } from './../servicos/turma.service';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ProfessorService } from './../servicos/professor.service';
import { ConsultaTurmasExcluidas } from '../models/consulta-turmas-excluidas';
import { ConsultaAlunosMatriculadosTurmaExcluida } from '../models/consulta-alunos-matriculados-turma-excluida';

@Component({
  selector: 'app-consulta-turmas-excluidas',
  templateUrl: './consulta-turmas-excluidas.component.html',
  styleUrls: ['./consulta-turmas-excluidas.component.scss']
})
export class ConsultaTurmasExcluidasComponent implements OnInit {

  constructor(private turmaService: TurmaService) {
    this.alunos = [];
    this.turmas = [];
  }

  private nomeProfessorSelecionado: string;
  private niveis = new Array<NivelTurma>();
  private modalidades = new Array<ModalidadeTurma>()

  private turmas: ConsultaTurmasExcluidas[];
  private nivelSelecionado: NivelTurma;
  private modalidadeSelecionado: ModalidadeTurma;

  private alunos: ConsultaAlunosMatriculadosTurmaExcluida[];
  private diasAulas: Date[];
  private url: any;
  private idTurmaExcluir: Number;
  private idTurmaSelecionada: number;

  ngOnInit() {
    this.turmaService.getTurmasExcluidas().subscribe(res => {
      this.turmas = res;
    })

    this.turmaService.getNiveis().subscribe(res => {
      this.niveis.push(new NivelTurma());
      res.forEach(element => {
        this.niveis.push(element);
      });

    })

    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades.push(new ModalidadeTurma());
      res.forEach(element => {
        this.modalidades.push(element);
      });
    })
  }

  getTurmaSelecionada() {
    if (this.turmas != undefined && this.idTurmaSelecionada != undefined) {
      return this.turmas.filter(turma => turma.id == this.idTurmaSelecionada)[0]
    }
    else
      return new ConsultaTurmasExcluidas();
  }

  getTurmas() {

    let valores = this.turmas;
    valores = this.filtraModalidade(valores);
    valores = this.filtraNivel(valores);
    valores = this.filtraProfessores(valores);
    return valores;
  }

  private filtraProfessores(valores: ConsultaTurmasExcluidas[]) {
    if (this.nomeProfessorSelecionado != undefined && this.nomeProfessorSelecionado.length > 0) {
      return valores.filter(turma => {

        if ((turma.nomeProfessor1 != undefined && turma.nomeProfessor1.toUpperCase().indexOf(this.nomeProfessorSelecionado.toUpperCase()) > -1) ||
          (turma.nomeProfessor2 != undefined && turma.nomeProfessor2.toUpperCase().indexOf(this.nomeProfessorSelecionado.toUpperCase()) > -1))
          return true
      })
    } else {
      return valores;
    }

  }

  private filtraModalidade(valores: ConsultaTurmasExcluidas[]) {
    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      return valores.filter((turma: ConsultaTurmasExcluidas) =>
        turma.idModalidade === this.modalidadeSelecionado.id);
    }
    else {
      return valores;
    }
  }

  private filtraNivel(valores: ConsultaTurmasExcluidas[]) {
    if ((
      this.nivelSelecionado != undefined
      && this.nivelSelecionado.id != undefined)) {
      return valores.filter((turma: ConsultaTurmasExcluidas) =>
        turma.idNivel === this.nivelSelecionado.id);
    }
    else {
      return valores
    }

  }

  getAlunos(id: number) {
    this.idTurmaSelecionada = id;
    this.turmaService.getAlunosTurmaExcluida(id).subscribe(res => {
      this.alunos = res;
    })

  }
}

import { ProfessorService } from './../servicos/professor.service';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';


import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Professor } from './../models/professor';
import { TurmaProfessor } from './../models/turma-professor';
import { Turma } from './../models/turma';
import { TurmaService } from './../servicos/turma.service';
import { DiasSemana } from './../models/dias-semana';


@Component({
  selector: 'app-consulta-turmas',
  templateUrl: './consulta-turmas.component.html',
  styleUrls: ['./consulta-turmas.component.scss']
})
export class ConsultaTurmasComponent implements OnInit {

  constructor(private turmaService: TurmaService, private professorService: ProfessorService ) { }

  private niveis = new Array<NivelTurma>();
  private modalidades = new Array<ModalidadeTurma>()
  private turmas: Turma[];

  private nivelSelecionado: NivelTurma;
  private modalidadeSelecionado: ModalidadeTurma;

  ngOnInit() {
    this.turmaService.getTurmas().subscribe(res => {
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

  getTurmas() {
    
    let valores = this.turmas;
    
    if ((
      this.nivelSelecionado != undefined
      && this.nivelSelecionado.id != undefined)) {
      valores = valores.filter((turma: Turma) =>
        turma.nivel.id === this.nivelSelecionado.id);
    }

    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      valores = valores.filter((turma: Turma) =>
        turma.modalidade.id === this.modalidadeSelecionado.id);
    }

    return valores;
  }


  


  getDias(diasSemana: DiasSemana[]) {
    return this.turmaService.getDias(diasSemana);
  }

  getNomeProfessor(professores: TurmaProfessor[], index: number) {
    return this.professorService.getNomeProfessor(professores, index);

  }

}

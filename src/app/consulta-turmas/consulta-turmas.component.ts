import { DatePipe } from '@angular/common';
import { ConsultaAlunosMatriculados } from './../models/consulta-alunos-matriculados';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';


import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { TurmaService } from './../servicos/turma.service';
import { ConsultaTurma } from './../models/consulta-turmas';
import { ProfessorService } from './../servicos/professor.service';

@Component({
  selector: 'app-consulta-turmas',
  templateUrl: './consulta-turmas.component.html',
  styleUrls: ['./consulta-turmas.component.scss']
})
export class ConsultaTurmasComponent implements OnInit {

  constructor(private turmaService: TurmaService) {
    this.alunos = [];
  }

  private niveis = new Array<NivelTurma>();
  private modalidades = new Array<ModalidadeTurma>()
  private turmas: ConsultaTurma[];

  private nivelSelecionado: NivelTurma;
  private modalidadeSelecionado: ModalidadeTurma;

  private alunos: ConsultaAlunosMatriculados[];
  private diasAulas: Date[];
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
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idNivel === this.nivelSelecionado.id);
    }

    if ((
      this.modalidadeSelecionado != undefined
      && this.modalidadeSelecionado.id != undefined)) {
      valores = valores.filter((turma: ConsultaTurma) =>
        turma.idModalidade === this.modalidadeSelecionado.id);
    }

    return valores;
  }

  getAlunos(id: number) {
    this.turmaService.getAlunos(id).subscribe(res => {
      this.alunos = res;
    })

    this.turmaService.getListaDiasAulas(id).subscribe(res => {
      this.diasAulas = res;
      this.diasAulas.forEach(data =>{
        console.log(new Date(data))
      })
    })
  }

  export(){
    let conteudo = "data:text/csv;charser=utf-8,";

    let cabecalho = "Nome;Data Aniversario; Email";
    this.diasAulas.forEach(valor =>{
      cabecalho = cabecalho + ";" + valor;
    })
    conteudo += cabecalho + "\n";

    this.alunos.forEach(aluno =>{
      conteudo += aluno.nome + ";" + aluno.dataNascimento + ";" + aluno.email + "\n";
    })

    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(conteudo));
    link.setAttribute("download", "lista presença.csv");
    document.body.appendChild(link);
    link.click();

  }
}

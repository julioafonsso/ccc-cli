import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { TurmaService, DiasAulas, Salas } from './../servicos/turma.service';
import { ProfessorService, Professor } from './../servicos/professor.service';
import { TipoTurmaService, TipoTurma } from './../servicos/tipo-turma.service';


@Component({
  selector: 'app-cadastro-turma',
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})



export class CadastroTurmaComponent implements OnInit {
  dias: DiasAulas[];
  professores: Professor[];
  professoras: Professor[];
  salas: Salas[];
  tipoTurmas: TipoTurma[];

  selecionado: string = "tete";


  constructor(private turmaService: TurmaService,
    private professorService: ProfessorService,
    private tipoTurmaService: TipoTurmaService) { }

  ngOnInit() {
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
    this.tipoTurmaService.getTipoTurmas().subscribe(res => {
      this.tipoTurmas = res;
    })
  }

}

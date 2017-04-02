import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { Aluno } from './../models/aluno';
import { AlunoService } from './../servicos/aluno.service';
import { Turma } from './../models/turma';
import { TurmaService } from './../servicos/turma.service';

@Component({
  selector: 'app-consulta-alunos',
  templateUrl: './consulta-alunos.component.html',
  styleUrls: ['./consulta-alunos.component.scss']
})
export class ConsultaAlunosComponent implements OnInit {
  private alunos: Aluno[]
  private turmas: Turma[];
  private filtro: string;
  constructor(private alunoService: AlunoService) { 
    this.alunos = [];
    this.filtro ="";
  }

  ngOnInit() {
    this.alunoService.getAlunos().subscribe(res => {
      this.alunos = res;
    })

  }


  getAlunos() {
    
    return this.alunos.filter((aluno) => {
      if (aluno.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (aluno.cpf.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (aluno.email.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
    });
  }

}

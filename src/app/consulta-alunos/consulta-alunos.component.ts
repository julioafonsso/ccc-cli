import { Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import { AlunoService } from './../servicos/aluno.service';
import { TurmaService } from './../servicos/turma.service';
import { ConsultaAlunos } from './../models/consulta-alunos';

@Component({
  selector: 'app-consulta-alunos',
  templateUrl: './consulta-alunos.component.html',
  styleUrls: ['./consulta-alunos.component.scss']
})
export class ConsultaAlunosComponent implements OnInit {
  private alunos: ConsultaAlunos[]
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

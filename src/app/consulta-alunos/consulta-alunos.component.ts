import { Aluno } from './../models/aluno';
import { AlunoService } from './../servicos/aluno.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-alunos',
  templateUrl: './consulta-alunos.component.html',
  styleUrls: ['./consulta-alunos.component.scss']
})
export class ConsultaAlunosComponent implements OnInit {
  private alunos: Aluno[]

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
    this.alunoService.getAll().subscribe(res => {
      this.alunos = res;
      console.log(res);
    })
  }
  getAlunos() {
    return this.alunos;
  }
}

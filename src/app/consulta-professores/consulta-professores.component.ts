import { ConsultaProfessor } from './../models/consulta-professor';
import { Component, OnInit } from '@angular/core';

import { ProfessorService } from './../servicos/professor.service';
import { TurmaService } from './../servicos/turma.service';


@Component({
  selector: 'app-consulta-professores',
  templateUrl: './consulta-professores.component.html',
  styleUrls: ['./consulta-professores.component.scss']
})
export class ConsultaProfessoresComponent implements OnInit {

  private professores: ConsultaProfessor[];
  private filtro: string;

  constructor(private professorService: ProfessorService) { 
    this.professores = [];
    this.filtro = "";
  }

  ngOnInit() {
    this.professorService.getProfessores().subscribe(res =>{
      console.log(res);
      this.professores = res;
    })
  }
  getProfessores(){
     return this.professores.filter((professor) => {
      if (professor.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (professor.cpf.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
      if (professor.email.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1)
        return true;
    });
  }

}

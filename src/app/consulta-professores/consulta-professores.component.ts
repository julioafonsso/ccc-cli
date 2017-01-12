import { Professor } from './../models/professor';
import { ProfessorService } from './../servicos/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-professores',
  templateUrl: './consulta-professores.component.html',
  styleUrls: ['./consulta-professores.component.scss']
})
export class ConsultaProfessoresComponent implements OnInit {

  private professores: Professor[];

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
    this.professorService.getProfessores().subscribe(res =>{
      this.professores = res;
    })
  }
  getProfessores(){
    return this.professores;
  }

}
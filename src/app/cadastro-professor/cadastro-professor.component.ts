import { ProfessorService } from './../servicos/professor.service';
import { Component, OnInit } from '@angular/core';

import { Professor } from './../models/professor';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.scss']
})
export class CadastroProfessorComponent implements OnInit {

  private professor = new Professor();

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
  }

   onSubmit() {
    this.professorService.cadstrarProfessor(this.professor)
    .subscribe(error => {
      console.log("erro")
      console.log(error)
    },
    res =>{
      console.log("res")
      console.log(res)
    });
    
  }

}

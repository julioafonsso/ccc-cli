import { ProfessorService } from './../servicos/professor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.scss']
})
export class CadastroProfessorComponent implements OnInit {

  constructor(private professorService: ProfessorService) { }

  ngOnInit() {
  }

}

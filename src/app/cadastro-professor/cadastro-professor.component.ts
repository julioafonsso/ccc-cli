import { Component, OnInit } from '@angular/core';

import { Professor } from './../models/professor';
import { Message } from 'primeng/primeng';
import { ProfessorService } from './../servicos/professor.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.scss']
})
export class CadastroProfessorComponent implements OnInit {

  private professor = new Professor();
  private msgs: Message[];

  constructor(private professorService: ProfessorService) {
    this.msgs = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    this.professorService.cadstrarProfessor(this.professor)
      .subscribe(res => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.professor = new Professor();
      },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
      });

  }

}

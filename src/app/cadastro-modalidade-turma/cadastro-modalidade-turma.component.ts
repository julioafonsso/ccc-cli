import { ModalidadeTurma } from './../models/modalidade-turma';
import { Component, OnInit } from '@angular/core';

import { TurmaService } from './../servicos/turma.service';

@Component({
  selector: 'app-cadastro-modalidade-turma',
  templateUrl: './cadastro-modalidade-turma.component.html',
  styleUrls: ['./cadastro-modalidade-turma.component.scss']
})
export class CadastroModalidadeTurmaComponent implements OnInit {

  private modal = new ModalidadeTurma();

  constructor(private turmaService: TurmaService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.modal)
    this.turmaService.cadastrarModalidade(this.modal)
  }

}

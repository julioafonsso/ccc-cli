import { ModalidadeTurma } from './../models/modalidade-turma';
import { Component, OnInit } from '@angular/core';

import { TurmaService } from './../servicos/turma.service';

@Component({
  selector: 'app-consulta-modalidade-turma',
  templateUrl: './consulta-modalidade-turma.component.html',
  styleUrls: ['./consulta-modalidade-turma.component.css']
})
export class ConsultaModalidadeTurmaComponent implements OnInit {

  constructor(private turmaService: TurmaService) { }
  private modalidades: ModalidadeTurma[];
  ngOnInit() {
    this.turmaService.getModalidades().subscribe(res =>{
      this.modalidades = res;
    })
  }

  getModalidades(){
    return this.modalidades;
  }
}

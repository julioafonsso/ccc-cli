import { ModalidadeTurma } from './../models/modalidade-turma';
import { Component, OnInit } from '@angular/core';

import { TurmaService } from './../servicos/turma.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-consulta-modalidade-turma',
  templateUrl: './consulta-modalidade-turma.component.html',
  styleUrls: ['./consulta-modalidade-turma.component.css']
})
export class ConsultaModalidadeTurmaComponent implements OnInit {

  private msgs: Message[];
  private submit: boolean;

  constructor(private turmaService: TurmaService) { 
    this.msgs = [];
  }
  private modalidades: ModalidadeTurma[];

  reset() {
    this.submit = false
    this.turmaService.getModalidades().subscribe(res => {
      this.modalidades = res;
    })
  }
  ngOnInit() {
    this.reset();
  }

  deletar(modalidade: ModalidadeTurma) {
    this.submit = true
    this.turmaService.deletarModalidade(modalidade).subscribe(res => {
      this.reset();
      this.msgs.push({ severity: 'success', summary: 'Modalidade Apagada !' });
    },
      error => {
        console.log(error)
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !', detail: JSON.parse(error._body)["message"] });
        this.submit = false;
      }
    )
  }

  getModalidades() {
    return this.modalidades;
  }
}

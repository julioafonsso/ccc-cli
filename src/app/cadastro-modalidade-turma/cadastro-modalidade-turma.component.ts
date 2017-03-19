import { ActivatedRoute } from '@angular/router';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { Component, OnInit } from '@angular/core';

import { TurmaService } from './../servicos/turma.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-cadastro-modalidade-turma',
  templateUrl: './cadastro-modalidade-turma.component.html',
  styleUrls: ['./cadastro-modalidade-turma.component.scss']
})
export class CadastroModalidadeTurmaComponent implements OnInit {

  private modal :ModalidadeTurma;
  private msgs: Message[];
  private submit: boolean;
  constructor(private route: ActivatedRoute,private turmaService: TurmaService) { 
    this.msgs = []
    this.modal = new ModalidadeTurma();
    this.submit =false
  }

  ngOnInit() {
    this.loadModalidade();
  }

  loadModalidade() {
    this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != undefined) {
          this.submit = true;
          this.turmaService.getModalidade(params['id']).subscribe(res => {
            this.modal = res;
            this.submit = false;
          })
        }
      })
  }

  cadastrar(){
    if(this.modal.id != null)
    return this.turmaService.alterarModalidade(this.modal)
    return this.turmaService.cadastrarModalidade(this.modal);
  }

  onSubmit() {
    this.submit = true;
    this.cadastrar()
      .subscribe(response => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.modal = new ModalidadeTurma();
        this.submit = false;
      },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !' });
        this.submit = false;
      })
  }

}

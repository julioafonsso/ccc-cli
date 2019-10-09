import { ModalidadeTurma } from './../models/modalidade-turma';
import { EmailService } from './../servicos/email-service';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'app/servicos/turma.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-obter-emails-alunos',
  templateUrl: './obter-emails-alunos.component.html',
  styleUrls: ['./obter-emails-alunos.component.css']
})
export class ObterEmailsAlunosComponent implements OnInit {

  private email: string;
  constructor(private emailService: EmailService, private turmaService: TurmaService) {
  }
  private modalidades = new Array<ModalidadeTurma>()
  private modalidade:number = 0;
  private ativo: boolean = true;
  private lista_ativo = new Array();
  ngOnInit() {
    
    this.lista_ativo.push({nome:"ativo", value: true});
    this.lista_ativo.push({nome:"inativo", value: false});

    this.pesquisar();

    this.turmaService.getModalidades().subscribe(res => {
      let modalidadeVazia = new ModalidadeTurma();
      modalidadeVazia.id = 0;
      modalidadeVazia.nome = ""
      this.modalidades.push(modalidadeVazia);
      res.forEach(element => {
        this.modalidades.push(element);
      });
    })


  }

  pesquisar() {
    console.log("Pesquisar" , this.modalidade, this.ativo)
    this.email = "";
   
      this.emailService.obterEmailsAlunos(this.modalidade, this.ativo).subscribe(res => {
        this.email = res;
      });
  }

}

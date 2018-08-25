import { EmailService } from './../servicos/email-service';
import { Message } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';


import { MensagemEmail } from './../models/mensagem-email';

@Component({
  selector: 'app-cadastro-mensagem-email',
  templateUrl: './cadastro-mensagem-email.component.html',
  styleUrls: ['./cadastro-mensagem-email.component.css']
})
export class CadastroMensagemEmailComponent implements OnInit {

  private mensagem :MensagemEmail;
  private msgs: Message[];
  private submit: boolean;
  constructor(private emailService: EmailService) { 
    this.msgs = []
    this.submit =false
    this.mensagem = new MensagemEmail();
  }

  ngOnInit() {
    this.emailService.obterMensagemCadastrada().subscribe(res =>{
      this.mensagem = res;
    })
  }

onSubmit() {
    this.submit = true;
    this.emailService.atualizaMensagem(this.mensagem)
      .subscribe(response => {
        this.msgs.push({ severity: 'success', summary: 'Cadastro Com Sucesso !' });
        this.submit = false;
      },
      error => {
        this.msgs.push({ severity: 'error', summary: 'Cadastro Com Erro !' });
        this.submit = false;
      })
  }


}

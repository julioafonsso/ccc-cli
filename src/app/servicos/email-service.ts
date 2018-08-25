import { Email } from './../models/email';
import { MensagemEmail } from './../models/mensagem-email';
import { Response } from '@angular/http';
import { HttpCustormerService } from './../servicos/http-custormer.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable()
export class EmailService {

  
  obterEmailsAlunos() {
    return this.http.get(environment.url + "email/alunos")
        .map((response: Response) => response.text())
  }
   constructor(private http: HttpCustormerService) { }

  obterMensagemCadastrada()
  {
    return this.http.get(environment.url + "email/mensagem")
        .map((response: Response) => <MensagemEmail>response.json())
  }

  atualizaMensagem(msg: MensagemEmail)
  {
    return this.http.put(environment.url + "email/mensagem", msg)
  }
  enviarEmail(email: Email) {
    return this.http.post(environment.url + "email/mkt", email)
  }

}

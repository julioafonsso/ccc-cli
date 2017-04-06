import { MensagemEmail } from './../models/mensagem-email';
import { Response } from '@angular/http';
import { HttpCustormerService } from './../servicos/http-custormer.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable()
export class MensagemEmailService {

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

}

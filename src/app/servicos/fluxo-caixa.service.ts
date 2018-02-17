import { Response } from '@angular/http';
import { CadastroFluxoCaixa } from './../models/cadastro-fluxo-caixa';
import { Injectable } from '@angular/core';

import { HttpCustormerService } from './http-custormer.service';
import { environment } from './../../environments/environment';


@Injectable()
export class FluxoCaixaService {

  constructor(private http: HttpCustormerService) { }

  cadastrar(fluxoCaixa: CadastroFluxoCaixa) {
    if(fluxoCaixa.id != undefined)
      return this.http.put(environment.url + "fluxo-caixa/" + fluxoCaixa.id, fluxoCaixa)
    else
      return this.http.post(environment.url + "fluxo-caixa", fluxoCaixa)
  }

  getFluxo(id: number){
    return this.http.get(environment.url + "fluxo-caixa/" + id)
    .map((response: Response) => <CadastroFluxoCaixa>response.json());
  }
}

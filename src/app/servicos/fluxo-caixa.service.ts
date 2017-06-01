import { CadastroFluxoCaixa } from './../models/cadastro-fluxo-caixa';
import { Injectable } from '@angular/core';

import { HttpCustormerService } from './http-custormer.service';
import { environment } from './../../environments/environment';


@Injectable()
export class FluxoCaixaService {

  constructor(private http: HttpCustormerService) { }

  cadastrar(fluxoCaixa: CadastroFluxoCaixa) {
    return this.http.post(environment.url + "fluxo-caixa", fluxoCaixa)
  }
}

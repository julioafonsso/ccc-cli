import { Injectable } from '@angular/core';

import { HttpCustormerService } from './http-custormer.service';
import { FluxoCaixa } from './../models/fluxo-caixa';
import { environment } from './../../environments/environment';


@Injectable()
export class FluxoCaixaService {

  constructor(private http: HttpCustormerService) { }

  cadastrar(fluxoCaixa: FluxoCaixa){
    return this.http.post(environment.url + "fluxo-caixa", fluxoCaixa)
  }

}

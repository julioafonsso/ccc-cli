import { Injectable } from '@angular/core';

import { HttpCustormerService } from './http-custormer.service';
import { FluxoCaixa } from './../models/fluxo-caixa';
import { environment } from './../../environments/environment';


@Injectable()
export class FluxoCaixaService {

  constructor(private http: HttpCustormerService) { }

  cadastrar(fluxoCaixa: FluxoCaixa) {
    return this.http.post(environment.url + "fluxo-caixa", this.tratarDados(fluxoCaixa))
  }

  private tratarDados(fluxo: FluxoCaixa) {
    let valor = fluxo.valor.toString();
    if (valor.indexOf(",") < 0) {
      if (valor.indexOf(".") < 0)
        valor = valor + ",00";
    }

    let fluxo2: FluxoCaixa = Object.assign({}, fluxo);
    valor = fluxo2.valor.toString().replace(/[^0-9]/gi, '');
    fluxo2.valor = Number(valor.substr(0, valor.length - 2) + "." + valor.substring(valor.length - 2))
    return fluxo2;
  }

}

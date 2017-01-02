import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { TipoFluxo } from './../models/tipo-fluxo';

@Injectable()
export class TipoFluxoCaixaService {

  constructor(private http: Http) { }

  getTipoFluxo(){
    return this.http.get(environment.url + "tipo-fluxo-caixa")
      .map((response: Response) => <TipoFluxo[]>response.json())
  }

  getTipoFluxoEntrada() {
    return this.http.get(environment.url + "tipo-fluxo-caixa/entrada")
      .map((response: Response) => <TipoFluxo[]>response.json())
  }

  getTipoFluxoSaida() {
    return this.http.get(environment.url + "tipo-fluxo-caixa/saida  ")
      .map((response: Response) => <TipoFluxo[]>response.json())
  }

  cadastrar(tipo: TipoFluxo) {
    return this.http.post(environment.url + "tipo-fluxo-caixa", tipo);
  }
}

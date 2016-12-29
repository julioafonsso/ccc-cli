import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { TipoFluxo } from './../models/tipo-fluxo';

@Injectable()
export class TipoFluxoCaixaService {

  constructor(private http: Http) { }

  getTipoFluxoEntrada() {
    return this.http.get("json/tipo-fluxo.json")
      .map((response: Response) => <TipoFluxo[]>response.json())
  }

  getTipoFluxoSaida() {
    return this.http.get("json/tipo-fluxo.json")
      .map((response: Response) => <TipoFluxo[]>response.json())
  }
}

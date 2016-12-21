import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

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

export class TipoFluxo {
  constructor(
    public id: number,
    public nome: String,
    public indEntrada: boolean
  ) { }
}

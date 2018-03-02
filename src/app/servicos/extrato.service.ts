import { ExtratoConsolidado } from './../models/extrato-consolidado';
import { Extrato } from './../models/extrato';
import { Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ExtratoService {

  constructor(private http: HttpCustormerService) { }

  getExtrato(id: number, dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/detalhado/" + id +"/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => <Extrato[]>response.json());
  }

  getExtratoConsolidadoEntradas(dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/consolidado/entradas/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => <ExtratoConsolidado[]>response.json());
  }

  getExtratoConsolidadoSaidas(dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/consolidado/saidas/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => <ExtratoConsolidado[]>response.json());
  }
 
  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}

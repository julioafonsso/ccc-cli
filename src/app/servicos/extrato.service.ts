import { Extrato } from './../models/extrato';
import { Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { HttpCustormerService } from './http-custormer.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ExtratoService {

  constructor(private http: HttpCustormerService) { }

  getExtrato(dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => <Extrato[]>response.json());
  }

  getExtratoConsolidadoEntradas(dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/consolidado/entradas/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => {
        return this.mapExtratoConsolidado(response.json());

      });
  }

  getExtratoConsolidadoSaidas(dtInicial: String, dtFinal: String) {
    return this.http.get(environment.url + "extrato/consolidado/saidas/" + dtInicial + "/" + dtFinal)
      .map((response: Response) => {
        return this.mapExtratoConsolidado(response.json());

      });
  }

  private mapExtratoConsolidado(json: any) {
    let dados = [];
    let labels = [];
    let color = []

    for (let item of json) {
      dados.push(item[0]);
      labels.push(item[1]);
      color.push(this.getRandomColor())
    }

    let obj = [];
    obj.push(dados);
    obj.push(labels);

    return obj;
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

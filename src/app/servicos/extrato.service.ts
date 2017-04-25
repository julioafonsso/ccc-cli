import { ExtratoConsolidado } from './../models/extrato-consolidado';
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
    let extratos :ExtratoConsolidado[] = [];
    
    for (let item of json) {
      let extrato = new ExtratoConsolidado();
      extrato.quantidade = item[0];
      extrato.valor = item[1];
      extrato.nome = item[2];
      extrato.id = item[3];
      extrato.lancamentos = item[4];
      extratos.push(extrato);
    }

    return extratos;
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

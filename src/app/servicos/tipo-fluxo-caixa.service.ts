import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';

import { HttpCustormerService } from './http-custormer.service';
import { TipoFluxo } from './../models/tipo-fluxo';

@Injectable()
export class TipoFluxoCaixaService {

    constructor(private http: HttpCustormerService) { }

    deletar(tipo: TipoFluxo){
        return this.http.delete(environment.url + "tipo-fluxo-caixa/" + tipo.id);
    }

    getTipoFluxos() {
        return this.http.get(environment.url + "tipo-fluxo-caixa")
            .map((response: Response) => <TipoFluxo[]>response.json())
    }

    getTipoFluxo(id: number) {
        return this.http.get(environment.url + "tipo-fluxo-caixa/" + id)
            .map((response: Response) => <TipoFluxo>response.json())
    }


    getTipoFluxoEntrada() {
        if (environment.mock) {
            return this.http.get(environment.url + "tipo-fluxo-caixa-entrada.json")
                .map((response: Response) => <TipoFluxo[]>response.json())
        }
        else {
            return this.http.get(environment.url + "tipo-fluxo-caixa/entrada")
                .map((response: Response) => <TipoFluxo[]>response.json())
        }

    }

    getTipoFluxoSaida() {
        if (environment.mock) {
            return this.http.get(environment.url + "tipo-fluxo-caixa-saida.json")
                .map((response: Response) => <TipoFluxo[]>response.json())
        }
        else {
            return this.http.get(environment.url + "tipo-fluxo-caixa/saida")
                .map((response: Response) => <TipoFluxo[]>response.json())
        }
    }

    cadastrar(tipo: TipoFluxo) {
        return this.http.post(environment.url + "tipo-fluxo-caixa", tipo);
    }

    alterar(tipo: TipoFluxo) {
        return this.http.put(environment.url + "tipo-fluxo-caixa", tipo);
    }
}

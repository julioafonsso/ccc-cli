import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { FluxoCaixa } from './../models/fluxo-caixa';
import { environment } from './../../environments/environment';


@Injectable()
export class FluxoCaixaService {

  constructor(private http: Http) { }

  cadastrar(fluxoCaixa: FluxoCaixa){
    return this.http.post(environment.url + "fluxo-caixa", fluxoCaixa)
  }

}

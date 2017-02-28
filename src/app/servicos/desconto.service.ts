import { Response } from '@angular/http';
import { HttpCustormerService } from './http-custormer.service';
import { Injectable } from '@angular/core';

import { TipoDesconto } from './../models/tipo-desconto';
import { environment } from './../../environments/environment';


@Injectable()
export class DescontoService {

  constructor(private http: HttpCustormerService) { }

  cadastrarTipoDesconto(desconto: TipoDesconto){
    return this.http.post(environment.url + "descontos",desconto)
  }

  obterDescontos(){
    console.log(environment.url + "descontos")
    return this.http.get(environment.url + "descontos").map((res:Response) => <TipoDesconto[]> res.json());
  }

}

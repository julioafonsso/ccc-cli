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

  deletar(desconto: TipoDesconto)
  {
    return this.http.delete(environment.url + "descontos/" + desconto.id)
  }

  alterarTipoDesconto(desconto: TipoDesconto){
    return this.http.put(environment.url + "descontos",desconto)
  }
  obterDescontos(){
    return this.http.get(environment.url + "descontos").map((res:Response) => <TipoDesconto[]> res.json());
  }

  obterDesconto(id: number){
    return this.http.get(environment.url + "descontos/" + id).map((res:Response) => <TipoDesconto> res.json());
  }

}

import { ConsultaWorkShop } from './../models/consulta-workshop';
import { CadastroWorkShop } from './../models/cadastro-workshop';

import { Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpCustormerService } from './http-custormer.service';
import { ModalidadeTurma } from './../models/modalidade-turma';

@Injectable()
export class WorkshopService {

  constructor(private http: HttpCustormerService) { }

  getModalidades() {
    return this.http.get(environment.url + 'modalidades/')
      .map((response: Response) => <ModalidadeTurma[]>response.json());
  }

  cadastrarWorkShop(cadastro: CadastroWorkShop) {
    return this.http.post(environment.url + "workshop", cadastro);
  }

  alterarWorkShop(cadastro: CadastroWorkShop) {
    return this.http.put(environment.url + "workshop/" + cadastro.id, cadastro);
  }

  getWorkShops() {
    return this.http.get(environment.url + 'workshop/')
      .map((response: Response) => <ConsultaWorkShop[]>response.json());
  }

  getWokrShop(id: number)
  {
    return this.http.get(environment.url + 'workshop/'+ id)
      .map((response: Response) => <ConsultaWorkShop>response.json());
  }

}

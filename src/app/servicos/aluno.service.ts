import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Sexo } from './../models/sexo';
import { ConheceEscola } from './../models/conhece-escola';


@Injectable()
export class AlunoService {

  constructor(private http : Http) { }

  getListaComoConheceu()
  {
    return this.http.get("json/como-conheceu.json")
    .map((response : Response) => <ConheceEscola[]> response.json())
  }

  getSexo(){
    return this.http.get("json/sexo.json")
    .map((response : Response) => <Sexo[]> response.json())
  }

}



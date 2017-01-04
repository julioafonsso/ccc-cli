import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';
import { environment } from './../../environments/environment';

@Injectable()
export class AlunoService {

  constructor(private http : Http) { }

  getListaComoConheceu()
  {
    if(environment.mock){
      return this.http.get(environment.url + "conhece-escola.json")
      .map((response : Response) => <ConheceEscola[]> response.json())
    }
    else{
      return this.http.get(environment.url + "conhece-escola")
      .map((response : Response) => <ConheceEscola[]> response.json())
    }

      
  }

  cadastrar(aluno: Aluno)
  {
    console.log(aluno)
    return this.http.post(environment.url + "alunos", aluno);
  }
}



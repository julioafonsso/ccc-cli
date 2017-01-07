import { EstadoCivil } from './../models/estado-civil';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { ConheceEscola } from './../models/conhece-escola';
import { Aluno } from './../models/aluno';
import { environment } from './../../environments/environment';

@Injectable()
export class AlunoService {

  constructor(private http: Http) { }

  getListaEstadoCivil() {
    if (environment.mock) {
      
      this.http.get(environment.url + "estado-civil.json")
        .map((response: Response) =>(console.log(response))).subscribe();
      

      return this.http.get(environment.url + "estado-civil.json")
        .map((response: Response) => <EstadoCivil[]>response.json())
    }
    else {
      return this.http.get(environment.url + "estado-civil")
        .map((response: Response) => <EstadoCivil[]>response.json())
    }
  }
  getListaComoConheceu() {
    if (environment.mock) {
      console.log(environment.url + "conhece-escola.json")
      
      this.http.get(environment.url + "conhece-escola.json")
        .map((response: Response) => console.log(response.json()))

      return this.http.get(environment.url + "conhece-escola.json")
        .map((response: Response) => <ConheceEscola[]>response.json())
    }
    else {
      return this.http.get(environment.url + "conhece-escola")
        .map((response: Response) => <ConheceEscola[]>response.json())
    }


  }

  cadastrar(aluno: Aluno) {
    console.log(aluno)
    return this.http.post(environment.url + "alunos", aluno);
  }

  getAll() {
    if (environment.mock) {
      return this.http.get(environment.url + "alunos.json").map((response: Response) => <Aluno[]>response.json());
    }
    {
      return this.http.get(environment.url + "alunos").map((response: Response) => <Aluno[]>response.json());
    }
  }

  getAluno(idAluno: number) {
    if (environment.mock) {
      return this.http.get(environment.url + "aluno.json").map((response: Response) => <Aluno>response.json());
    }
    {
      return this.http.get(environment.url + "alunos/" + idAluno).map((response: Response) => <Aluno>response.json());
    }
  }

  pesquisarAlunos(nome: string, email: string, cpf: string) {

    let params: URLSearchParams = new URLSearchParams();
    params.set('nome', nome);
    params.set('email', email);
    params.set('cpf', cpf);

    if (environment.mock) {
      return this.http.get(environment.url + "alunos.json").map((response: Response) => <Aluno[]>response.json());
    }
    {
      return this.http.get(environment.url + "alunos", {
        search: params
      }).map((response: Response) => <Aluno[]>response.json());
    }
  }

}



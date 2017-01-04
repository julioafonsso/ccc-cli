import { Turma } from './../models/turma';
import { ModalidadeTurma } from './../models/modalidade-turma';
import { NivelTurma } from './../models/nivel-turma';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';


import { environment } from './../../environments/environment';

import { DiasSemana } from './../models/dias-semana';
import { Salas } from './../models/salas';

@Injectable()
export class TurmaService {

  constructor(private http: Http) { }


  getTurmas() {
    console.log(environment)
    if (environment.mock) {
      let url = environment.url + 'turmas.json';
      console.log('URL = '+ url)
      return this.http.get(url)
        .map((response: Response) =>  <Turma[]>response.json());
    }
    else {
      return this.http.get(environment.url + 'turmas')
        .map((response: Response) => <Turma[]>response.json());
    }

  }

  getDiasAulas() {
    if (environment.mock) {
      return this.http.get(environment.url + 'dias.json')
        .map((response: Response) => <DiasSemana[]>response.json());
    }
    else {
      return this.http.get(environment.url + 'dias')
        .map((response: Response) => <DiasSemana[]>response.json());
    }

  }

  getSalas() {
    if (environment.mock) {
      return this.http.get(environment.url + 'salas.json')
        .map((response: Response) => <Salas[]>response.json());
    } else {
      return this.http.get(environment.url + 'salas.json')
        .map((response: Response) => <Salas[]>response.json());
    }
  }

  getNiveis() {
    if (environment.mock) {
      return this.http.get(environment.url + 'niveis-turma.json')
        .map((response: Response) => <NivelTurma[]>response.json());
    }
    else {
      return this.http.get(environment.url + 'niveis/turmas')
        .map((response: Response) => <NivelTurma[]>response.json());
    }
  }

  getModalidades() {
    if (environment.mock) {
      return this.http.get(environment.url + 'modalidade-turma.json')
        .map((response: Response) => <ModalidadeTurma[]>response.json());
    }
    else {
      return this.http.get(environment.url + 'modalidades/turmas')
        .map((response: Response) => <ModalidadeTurma[]>response.json());
    }

  }

  cadastrarModalidade(modalidade: ModalidadeTurma) {
    return this.http.post(environment.url + 'modalidades/turmas', modalidade);
  }

  cadastrarTurma(turma) {
    console.log(turma)
    return this.http.post(environment.url + 'turmas', turma);
  }

}

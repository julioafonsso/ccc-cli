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

  getDiasAulas() {
      
    return this.http.get(environment.url + 'dias')
      .map((response: Response) => <DiasSemana[]>response.json());
  }

  getSalas() {
    console.log("GET SALAS")
    return this.http.get(environment.url + 'salas')
      .map((response: Response) => <Salas[]>response.json());
  }

  getNiveis() {
    return this.http.get(environment.url + 'niveis/turmas')
      .map((response: Response) => <NivelTurma[]>response.json());
  }

  getModalidades() {
    return this.http.get(environment.url + 'modalidades/turmas')
      .map((response: Response) => <ModalidadeTurma[]>response.json());
  }

  cadastrarModalidade(modalidade: ModalidadeTurma) {
    return this.http.post(environment.url + 'modalidades/turmas', modalidade);
  }

  cadastrarTurma(turma){
        return this.http.post(environment.url + 'turmas', turma);
  }

}

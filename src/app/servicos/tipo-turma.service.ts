import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { NivelTurma } from './../models/nivel-turma';

@Injectable()
export class TipoTurmaService {

  constructor(private http: Http) { }

  getTipoTurmas() {
    return this.http.get("json/tipo-turma.json")
      .map((response: Response) => <TipoTurmaService[]>response.json());
  }

  getNiveis() {
    return this.http.get("json/niveis-turma.json")
      .map((response: Response) => <NivelTurma[]>response.json());
  }


}
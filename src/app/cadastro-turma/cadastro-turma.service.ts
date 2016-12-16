import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { DiasAulas } from './../modulos/turma.module';


@Injectable()
export class CadastroTurmaService {

  constructor(private http: Http) { }

  getDiasAulas() {
    return this.http.get('dias.json')
      .map((response: Response) => <DiasAulas[]>response.json());
  }

}

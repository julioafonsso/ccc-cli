import { Http, Response } from '@angular/http';
import { DiasAulas } from './cadastro-turma.module';
import { Injectable } from '@angular/core';

@Injectable()
export class CadastroTurmaService {

  constructor(private http: Http) { }

  getDiasAulas() {
    return this.http.get('dias.json')
      .map((response: Response) => <DiasAulas[]>response.json());
  }

}

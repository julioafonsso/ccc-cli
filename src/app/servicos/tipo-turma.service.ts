import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoTurmaService {

  constructor(private http: Http) { }

  getTipoTurmas() {
    return this.http.get("json/tipo-turma.json")
      .map((response: Response) => <TipoTurma[]>response.json());
  }

  getNiveis() {
    return this.http.get("json/niveis-turma.json")
      .map((response: Response) => <NivelTurma[]>response.json());
  }


}

export class TipoTurma {
  constructor(
    public id: number,
    public nivel: NivelTurma,
    public modalidade
  ) { }
}

export class NivelTurma {
  constructor(
    public id: number,
    public nome: String, ) { }
}
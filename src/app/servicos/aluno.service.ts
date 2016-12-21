import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AlunoService {

  constructor(private http : Http) { }

  getListaComoConheceu()
  {
    return this.http.get("json/como-conheceu.json")
    .map((response : Response) => <ComoConheceu[]> response.json())
  }

}

export class ComoConheceu {
  constructor(
    public id: number,
    public nome: String
  ) { }
}

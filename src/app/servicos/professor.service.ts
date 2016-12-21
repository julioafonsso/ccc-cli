import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfessorService {

  constructor(private http: Http) { }

  getProfessores(){
    return this.http.get('json/professores.json')
    .map((response: Response) => <Professor[]>response.json())
  }

  getProfessoras(){
    return this.http.get('json/professores.json')
    .map((response: Response) => <Professor[]>response.json())
  }

}

export class Professor{
  constructor(
    public id: number,
    public nome: String
  ){}
}

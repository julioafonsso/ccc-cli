import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Professor } from './../models/professor';



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

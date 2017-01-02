import { environment } from './../../environments/environment';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Professor } from './../models/professor';



@Injectable()
export class ProfessorService {

  constructor(private http: Http) { }

  getProfessores(){
    return this.http.get(environment.url + "professores")
    .map((response: Response) => <Professor[]>response.json())
  }

  cadstrarProfessor(professor: Professor){
    return this.http.post(environment.url + "/professores", professor);
  }

}
